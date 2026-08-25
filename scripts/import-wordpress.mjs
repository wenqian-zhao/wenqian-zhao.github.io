import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const input = process.argv[2];
const shouldDownloadImages = process.argv.includes("--download-images");

if (!input) throw new Error("Usage: node scripts/import-wordpress.mjs <posts.json> [--download-images]");

const postMeta = {
  "thoughts-after-%e5%af%b9%e8%af%9d%e6%ae%b5%e6%b0%b8%e5%b9%b3%ef%bc%9a%e5%81%9a%e8%87%aa%e5%b7%b1%e8%83%bd%e5%a4%9f%e5%96%9c%e6%ac%a2%e7%9a%84%e4%ba%8b%e6%83%85%e5%be%88%e9%87%8d%e8%a6%81": {
    slug: "thoughts-after-doing-what-you-love",
    title: "Thoughts after “对话段永平：做自己能够喜欢的事情很重要”",
    category: "随手记",
    description: "On freedom, conviction, and learning to feel a market before trying to explain it.",
  },
  "a-thinking-on-different-lms": {
    slug: "a-thinking-on-different-lms",
    title: "A Thinking on Different LMs",
    category: "AI",
    description: "Autoregressive models write forward. Diffusion models begin with a shape, then refine.",
  },
  "why-taste-is-a-thing": {
    slug: "why-taste-is-a-thing",
    title: "Why Taste Is a Thing",
    category: "Taste",
    description: "In an era of capable AI, taste may be the human quality that matters more, not less.",
  },
  "are-llms-intelligences": {
    slug: "are-llms-intelligences",
    title: "Are LLMs “Intelligences”?",
    category: "AI",
    description: "A wandering inquiry into intelligence, agency, prompts, tools, and where human thinking ends.",
  },
  "hello-world": {
    slug: "unemployed-day-2",
    title: "失业 day 2 有感",
    category: "Life",
    description: "A candid note on leaving MiniMax, newfound freedom, coffee, tennis, and time.",
  },
  "%e9%98%bf%e4%b8%b9%e9%9a%8f%e6%89%8b%e8%ae%b0-archive": {
    slug: "adan-notes-archive",
    title: "阿丹随手记 — Archive",
    category: "Archive",
    description: "Two years of thinking, learning, frustration, gratitude, and small observations from MiniMax.",
  },
};

const namedEntities = {
  amp: "&", apos: "'", gt: ">", hellip: "…", laquo: "«", ldquo: "“", lsquo: "‘",
  lt: "<", nbsp: " ", ndash: "–", mdash: "—", quot: '"', raquo: "»", rdquo: "”", rsquo: "’",
};

function decodeEntities(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    if (code.startsWith("#x")) return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    if (code.startsWith("#")) return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    return namedEntities[code.toLowerCase()] ?? entity;
  });
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1] ?? "";
}

function cleanInline(value) {
  return decodeEntities(value
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => `[${cleanInline(label)}](${decodeEntities(href)})`)
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**")
    .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, "*$2*")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, ""))
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function quoteBlock(value) {
  const text = cleanInline(value.replace(/<\/p>\s*<p\b[^>]*>/gi, "\n\n"));
  return `\n\n${text.split("\n").map((line) => line ? `> ${line}` : ">").join("\n")}\n\n`;
}

function tableBlock(value) {
  const rows = [...value.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((match) =>
    [...match[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) => cleanInline(cell[1])),
  );
  if (!rows.length) return "";
  const [header, ...body] = rows;
  const heading = header.filter(Boolean).join(" — ");
  return `\n\n${heading ? `${heading}\n\n` : ""}${body.map((row) => `- ${row.filter(Boolean).join(" — ")}`).join("\n")}\n\n`;
}

function listBlock(type, value) {
  const items = [...value.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)];
  return `\n\n${items.map((item, index) => `${type === "ol" ? `${index + 1}.` : "-"} ${cleanInline(item[1]).replace(/\n+/g, " ")}`).join("\n")}\n\n`;
}

function htmlToMarkdown(html, localImages) {
  let imageIndex = 0;
  let markdown = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<table\b[\s\S]*?<\/table>/gi, (table) => tableBlock(table))
    .replace(/<(ol|ul)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, type, body) => listBlock(type.toLowerCase(), body))
    .replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, body) => quoteBlock(body))
    .replace(/<img\b[^>]*>/gi, (tag) => {
      const source = decodeEntities(attribute(tag, "data-orig-file") || attribute(tag, "src"));
      const alt = decodeEntities(attribute(tag, "alt")) || `Original image ${imageIndex + 1}`;
      const localPath = localImages[imageIndex]?.path || source;
      imageIndex += 1;
      return `\n\n![${alt}](${localPath})\n\n`;
    })
    .replace(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/gi, (_, body) => `\n\n## ${cleanInline(body)}\n\n`)
    .replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_, body) => `\n\n${cleanInline(body)}\n\n`)
    .replace(/<hr\b[^>]*>/gi, "\n\n---\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "\n");

  markdown = decodeEntities(markdown)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return `${markdown}\n`;
}

function imageEntries(html, slug) {
  return [...html.matchAll(/<img\b[^>]*>/gi)].map((match, index) => {
    const source = decodeEntities(attribute(match[0], "data-orig-file") || attribute(match[0], "src"));
    const sourcePath = new URL(source).pathname;
    const extension = extname(sourcePath).toLowerCase() || ".jpg";
    const file = `${String(index + 1).padStart(2, "0")}${extension}`;
    return { source, file, path: `/writing-assets/${slug}/${file}` };
  });
}

async function downloadImages(images, slug) {
  if (!images.length) return;
  const outputDir = join("public", "writing-assets", slug);
  await mkdir(outputDir, { recursive: true });
  for (const image of images) {
    const output = join(outputDir, image.file);
    try {
      await access(output);
      continue;
    } catch {
      // Download only assets that are not already present.
    }
    const response = await fetch(image.source);
    if (!response.ok) throw new Error(`Could not download ${image.source}: ${response.status}`);
    await writeFile(output, Buffer.from(await response.arrayBuffer()));
  }
}

const posts = JSON.parse(await readFile(input, "utf8"));
const publishedPosts = posts.filter((post) => post.status === "publish");
const unknownPosts = publishedPosts.filter((post) => !postMeta[post.slug]);
if (unknownPosts.length) throw new Error(`Add metadata for: ${unknownPosts.map((post) => post.slug).join(", ")}`);

await mkdir("content/writings", { recursive: true });
for (const post of publishedPosts) {
  const meta = postMeta[post.slug];
  const images = imageEntries(post.content.rendered, meta.slug);
  if (shouldDownloadImages) await downloadImages(images, meta.slug);
  const source = `---\ntitle: ${meta.title}\nslug: ${meta.slug}\ndate: ${post.date.slice(0, 10)}\ncategory: ${meta.category}\ndescription: ${meta.description}\n---\n\n${htmlToMarkdown(post.content.rendered, images)}`;
  await writeFile(join("content/writings", `${meta.slug}.md`), source);
  console.log(`Imported ${meta.slug} (${images.length} image${images.length === 1 ? "" : "s"})`);
}
