import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";

const writings = JSON.parse(await readFile(new URL("../app/generated-writings.json", import.meta.url), "utf8"));
const routes = [
  ["/", /CHOOSE A DOOR/],
  ["/about", /Data, models/],
  ["/experience", /Saint George/],
  ["/work", /PROFESSIONAL CASES/],
  ["/writing", /ORIGINAL WORDPRESS SITE/],
  ...writings.map((writing) => [`/writing/${writing.slug}`, new RegExp(writing.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))]),
];

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

test("server-renders every public route", async () => {
  const worker = await loadWorker();
  for (const [path, marker] of routes) {
    const response = await worker.fetch(
      new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, path);
    assert.match(await response.text(), marker, path);
  }
});

test("detail pages provide distinct document titles", async () => {
  const worker = await loadWorker();
  for (const [path] of routes.slice(1)) {
    const response = await worker.fetch(
      new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    const html = await response.text();
    assert.doesNotMatch(html, /<title>Wenqian Zhao — Data Scientist &amp; Writer<\/title>/, path);
  }
});

test("writing detail metadata is derived from every Markdown file", async () => {
  const worker = await loadWorker();
  for (const writing of writings) {
    const response = await worker.fetch(
      new Request(`http://localhost/writing/${writing.slug}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${writing.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} — Wenqian Zhao<\\/title>`), writing.slug);
    assert.match(html, /class="markdownBody"/, writing.slug);
    assert.doesNotMatch(html, /og:image|twitter:image/, writing.slug);
  }
});

test("the complete WordPress inventory and its images are local", async () => {
  assert.equal(writings.length, 6);
  const imagePaths = writings.flatMap((writing) => [...writing.html.matchAll(/<img src="([^"]+)"/g)].map((match) => match[1]));
  assert.equal(imagePaths.length, 13);
  for (const imagePath of imagePaths) await access(join(process.cwd(), "public", imagePath.replace(/^\//, "")));
});
