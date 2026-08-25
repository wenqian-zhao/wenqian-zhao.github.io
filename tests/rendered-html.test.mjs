import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  ["/", /CHOOSE A DOOR/],
  ["/about", /Technical rigor/],
  ["/experience", /Saint George/],
  ["/work", /PROFESSIONAL CASES/],
  ["/writing", /COMPLETE WORDPRESS ARCHIVE/],
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
