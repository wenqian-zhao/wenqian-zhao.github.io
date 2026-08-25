import { spawn } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const localOrigin = "http://127.0.0.1:3010";
const publicUrl = "https://wenqian-zhao.github.io";
const writings = JSON.parse(await readFile("app/generated-writings.json", "utf8"));
const routes = [
  ["/", "index.html"],
  ["/about/", "about/index.html"],
  ["/experience/", "experience/index.html"],
  ["/work/", "work/index.html"],
  ["/writing/", "writing/index.html"],
  ...writings.map(({ slug }) => [`/writing/${slug}/`, `writing/${slug}/index.html`]),
];

await Promise.all([
  rm("index.html", { force: true }),
  rm("404.html", { force: true }),
  rm("_next", { recursive: true, force: true }),
  rm("writing-assets", { recursive: true, force: true }),
  ...[...new Set(routes.slice(1).map(([, output]) => dirname(output)))].map((outputDir) => rm(outputDir, { recursive: true, force: true })),
]);

const server = spawn("npm", ["run", "start", "--", "--port", "3010"], {
  env: { ...process.env, NO_PROXY: "127.0.0.1,localhost" },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverOutput = "";
server.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
server.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });

async function waitForPage() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetch(`${localOrigin}/`);
      if (response.ok) return;
    } catch {
      // The local production server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Production preview did not start.\n${serverOutput}`);
}

function makeStatic(html) {
  return html
    .replaceAll("http://localhost:3000", publicUrl)
    .replaceAll("http://127.0.0.1:3000", publicUrl)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b(?=[^>]*rel=["']modulepreload["'])[^>]*>/gi, "")
    .replace(/\sdata-rsc-css-href=["'][^"']*["']/gi, "");
}

try {
  await waitForPage();
  const rendered = await Promise.all(routes.map(async ([route, output]) => {
    const response = await fetch(`${localOrigin}${route}`);
    if (!response.ok) throw new Error(`Could not render ${route}: ${response.status}`);
    return [output, makeStatic(await response.text())];
  }));

  for (const [output, html] of rendered) {
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, html);
  }

  await cp("dist/client/_next", "_next", { recursive: true });
  await Promise.all([
    writeFile("404.html", rendered[0][1]),
    writeFile(".nojekyll", ""),
    cp("public/og.png", "og.png"),
    cp("public/favicon.svg", "favicon.svg"),
    cp("public/writing-assets", "writing-assets", { recursive: true }),
  ]);
} finally {
  server.kill("SIGTERM");
}
