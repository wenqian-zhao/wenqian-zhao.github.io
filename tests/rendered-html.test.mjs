import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const writings = JSON.parse(await readFile(new URL("../app/generated-writings.json", import.meta.url), "utf8"));
const routes = [
  ["/", /CHOOSE A DOOR/],
  ["/about", /Data, models/],
  ["/experience", /Saint George/],
  ["/work", /PROFESSIONAL CASES/],
  ["/writing", /ORIGINAL WORDPRESS SITE/],
  ...writings.map((writing) => [`/writing/${writing.slug}`, new RegExp(writing.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))]),
  ["/zh", /把模型的问题/],
  ["/zh/about", /我给大模型做数据/],
  ["/zh/experience", /一路/],
  ["/zh/work", /职业项目/],
  ["/zh/writing", /还没想完的事/],
  ...writings.map((writing) => [`/zh/writing/${writing.slug}`, new RegExp(writing.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))]),
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

test("every public route includes the headless meteor trail", async () => {
  const worker = await loadWorker();
  for (const [path] of routes) {
    const response = await worker.fetch(
      new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    const html = await response.text();
    assert.match(html, /class="pointerField"/, path);
    assert.doesNotMatch(html, /class="meteorHead"/, path);
    assert.equal((html.match(/class="meteorTail"/g) ?? []).length, 5, path);
    assert.match(html, /src="\/pointer-field\.js\?v=path-1"/, path);
  }
});

test("the meteor trail samples the exact historic path, fades after idle, and clears on leave", async () => {
  const listeners = {};
  const rootListeners = {};
  const field = { dataset: {} };
  const tail = Array.from({ length: 5 }, () => ({ style: {}, dataset: {} }));
  let idleCallback;
  const window = {
    matchMedia: () => ({ matches: false }),
    addEventListener: (type, handler) => { listeners[type] = handler; },
  };
  const document = {
    querySelector: (selector) => selector === ".pointerField" ? field : null,
    querySelectorAll: () => tail,
    documentElement: { addEventListener: (type, handler) => { rootListeners[type] = handler; } },
  };
  const source = await readFile(new URL("../public/pointer-field.js", import.meta.url), "utf8");
  runInNewContext(source, {
    window,
    document,
    setTimeout: (callback) => { idleCallback = callback; return 1; },
    clearTimeout: () => {},
    Math,
  });

  listeners.pointermove({ clientX: 0, clientY: 0 });
  assert.equal(field.dataset.visible, "true");
  listeners.pointermove({ clientX: 100, clientY: 0 });
  listeners.pointermove({ clientX: 100, clientY: 100 });
  assert.deepEqual(tail.map((square) => square.style.transform), [
    "translate3d(100px, 82px, 0)",
    "translate3d(100px, 60px, 0)",
    "translate3d(100px, 34px, 0)",
    "translate3d(100px, 4px, 0)",
    "translate3d(70px, 0px, 0)",
  ]);
  assert.deepEqual(tail.map((square) => square.dataset.ready), ["true", "true", "true", "true", "true"]);
  idleCallback();
  assert.equal(field.dataset.visible, "false");
  rootListeners.mouseleave();
  assert.equal(field.dataset.visible, "false");
  assert.deepEqual(tail.map((square) => square.dataset.ready), ["false", "false", "false", "false", "false"]);
});

test("every Chinese route uses the correct name", async () => {
  const worker = await loadWorker();
  for (const [path] of routes.filter(([path]) => path === "/zh" || path.startsWith("/zh/"))) {
    const response = await worker.fetch(
      new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    const html = await response.text();
    assert.match(html, /赵文千/, path);
    assert.doesNotMatch(html, /赵文茜/, path);
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

test("Chinese writing routes provide localized metadata and the same complete articles", async () => {
  const worker = await loadWorker();
  for (const writing of writings) {
    const response = await worker.fetch(
      new Request(`http://localhost/zh/writing/${writing.slug}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${writing.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} — 赵文千<\\/title>`), writing.slug);
    assert.match(html, /阅读约[\s\S]{0,100}分钟/, writing.slug);
    assert.match(html, /class="markdownBody"/, writing.slug);
  }
});

test("the complete WordPress inventory and its images are local", async () => {
  assert.equal(writings.length, 6);
  const imagePaths = writings.flatMap((writing) => [...writing.html.matchAll(/<img src="([^"]+)"/g)].map((match) => match[1]));
  assert.equal(imagePaths.length, 13);
  for (const imagePath of imagePaths) await access(join(process.cwd(), "public", imagePath.replace(/^\//, "")));
});
