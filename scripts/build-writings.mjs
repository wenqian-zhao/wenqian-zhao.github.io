import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

const sourceDir = "content/writings";
const tsOutput = "app/generated-writings.ts";
const jsonOutput = "app/generated-writings.json";

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function inlineMarkdown(value) {
  const code = [];
  const images = [];
  let html = escapeHtml(value).replace(/`([^`]+)`/g, (_, text) => {
    code.push(`<code>${text}</code>`);
    return `%%CODE${code.length - 1}%%`;
  });
  html = html
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
      const decodedSrc = src.replaceAll("&amp;", "&");
      if (!/^(https?:\/\/|\/)/.test(decodedSrc)) return alt;
      images.push(`<img src="${src}" alt="${alt}" loading="lazy">`);
      return `%%IMAGE${images.length - 1}%%`;
    })
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
      const decodedHref = href.replaceAll("&amp;", "&");
      const safeHref = /^(https?:\/\/|mailto:|\/)/.test(decodedHref) ? href : "#";
      return `<a href="${safeHref}">${label}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/%%IMAGE(\d+)%%/g, (_, index) => images[Number(index)])
    .replace(/%%CODE(\d+)%%/g, (_, index) => code[Number(index)]);
  return html;
}

function markdownToHtml(markdown) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const output = [];
  let paragraph = [];
  let listType = null;
  let codeLanguage = "";
  let codeLines = null;

  const flushParagraph = () => {
    if (paragraph.length) output.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const closeList = () => {
    if (listType) output.push(`</${listType}>`);
    listType = null;
  };

  for (const line of lines) {
    const fence = line.match(/^```\s*([\w-]*)\s*$/);
    if (fence) {
      flushParagraph();
      closeList();
      if (codeLines) {
        output.push(`<pre><code${codeLanguage ? ` class="language-${escapeHtml(codeLanguage)}"` : ""}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = null;
        codeLanguage = "";
      } else {
        codeLines = [];
        codeLanguage = fence[1] || "";
      }
      continue;
    }
    if (codeLines) {
      codeLines.push(line);
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      closeList();
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length + 1;
      output.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }
    if (/^---+$/.test(line.trim())) {
      flushParagraph();
      closeList();
      output.push("<hr>");
      continue;
    }
    const listItem = line.match(/^\s*([-*]|\d+\.)\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      const nextType = /\d/.test(listItem[1]) ? "ol" : "ul";
      if (listType !== nextType) {
        closeList();
        listType = nextType;
        output.push(`<${listType}>`);
      }
      output.push(`<li>${inlineMarkdown(listItem[2])}</li>`);
      continue;
    }
    const quote = line.match(/^>\s?(.+)$/);
    if (quote) {
      flushParagraph();
      closeList();
      output.push(`<blockquote>${inlineMarkdown(quote[1])}</blockquote>`);
      continue;
    }
    paragraph.push(line.trim());
  }
  flushParagraph();
  closeList();
  if (codeLines) output.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
  return output.join("\n");
}

function parseMarkdown(source, fileName) {
  const normalized = source.replaceAll("\r\n", "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`${fileName}: missing YAML-style front matter`);
  const meta = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    meta[key] = value;
  }
  if (meta.draft === "true") return null;
  for (const key of ["title", "date", "category", "description"]) {
    if (!meta[key]) throw new Error(`${fileName}: front matter requires ${key}`);
  }
  const slug = meta.slug || basename(fileName, extname(fileName));
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${fileName}: slug must be lowercase kebab-case`);
  const plainText = match[2].replace(/[#>*_`()]/g, " ").replaceAll("[", " ").replaceAll("]", " ").replaceAll("-", " ").replace(/\s+/g, " ").trim();
  return {
    slug,
    title: meta.title,
    date: meta.date,
    category: meta.category,
    description: meta.description,
    readingTime: Math.max(1, Math.ceil(plainText.length / 650)),
    html: markdownToHtml(match[2]),
  };
}

await mkdir(sourceDir, { recursive: true });
const files = (await readdir(sourceDir)).filter((file) => file.endsWith(".md")).sort();
const writings = (await Promise.all(files.map(async (file) => parseMarkdown(await readFile(join(sourceDir, file), "utf8"), file))))
  .filter(Boolean)
  .sort((a, b) => b.date.localeCompare(a.date));

const typeScript = `// Generated by scripts/build-writings.mjs. Edit content/writings/*.md instead.\n\nexport type Writing = {\n  slug: string;\n  title: string;\n  date: string;\n  category: string;\n  description: string;\n  readingTime: number;\n  html: string;\n};\n\nexport const writings: Writing[] = ${JSON.stringify(writings, null, 2)};\n\nexport function findWriting(slug: string) {\n  return writings.find((writing) => writing.slug === slug);\n}\n`;

await Promise.all([
  writeFile(tsOutput, typeScript),
  writeFile(jsonOutput, `${JSON.stringify(writings, null, 2)}\n`),
]);
console.log(`Generated ${writings.length} writing${writings.length === 1 ? "" : "s"}.`);
