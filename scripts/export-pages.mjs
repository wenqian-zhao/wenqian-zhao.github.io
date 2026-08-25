import { spawn } from "node:child_process";
import { cp, rm, writeFile } from "node:fs/promises";

const localUrl = "http://127.0.0.1:3000/";
const publicUrl = "https://wenqian-zhao.github.io";

const server = spawn("npm", ["run", "start"], {
  env: { ...process.env, NO_PROXY: "127.0.0.1,localhost" },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverOutput = "";
server.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
server.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });

async function waitForPage() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetch(localUrl);
      if (response.ok) return response;
    } catch {
      // The local production server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Production preview did not start.\n${serverOutput}`);
}

try {
  const response = await waitForPage();
  let html = await response.text();

  html = html
    .replaceAll("http://localhost:3000", publicUrl)
    .replaceAll("http://127.0.0.1:3000", publicUrl)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b(?=[^>]*rel=["']modulepreload["'])[^>]*>/gi, "")
    .replace(/\sdata-rsc-css-href=["'][^"']*["']/gi, "");

  await Promise.all([
    writeFile("dist/client/index.html", html),
    writeFile("dist/client/404.html", html),
    writeFile("dist/client/.nojekyll", ""),
  ]);

  await rm("_next", { recursive: true, force: true });
  await cp("dist/client/_next", "_next", { recursive: true });

  await Promise.all([
    writeFile("index.html", html),
    writeFile("404.html", html),
    writeFile(".nojekyll", ""),
    cp("public/og.png", "og.png"),
    cp("public/favicon.svg", "favicon.svg"),
  ]);
} finally {
  server.kill("SIGTERM");
}
