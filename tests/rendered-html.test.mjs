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
    assert.equal((html.match(/class="meteorTail"/g) ?? []).length, 9, path);
    assert.match(html, /src="\/pointer-field\.js\?v=flow-1"/, path);
    const section = path === "/" || path === "/zh" ? "HOME" : path.includes("about") ? "ABOUT" : path.includes("experience") ? "EXPERIENCE" : path.includes("work") ? "WORK" : "WRITING";
    assert.match(html, new RegExp(`data-section="${section}"`), path);
  }
});

test("the trail and page palette keep their deliberate visual rhythm", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const expectedSizes = [6, 8, 10, 12, 13, 12, 10, 8, 6];
  const actualSizes = [
    Number(css.match(/\.meteorTail \{[^}]*width: (\d+)px/)[1]),
    ...Array.from({ length: 8 }, (_, index) => Number(css.match(new RegExp(`\\.meteorTail:nth-of-type\\(${index + 2}\\) \\{[^}]*width: (\\d+)px`))[1])),
  ];
  assert.deepEqual(actualSizes, expectedSizes);
  assert.match(css, /--gold: #d8c79e; --rose: #d8b8bb;/);
  assert.match(css, /\.site\[data-section="ABOUT"\]/);
  assert.match(css, /\.pageIntro \{ background: color-mix/);
  assert.match(css, /\.verticalTimeline article \{ --timeline-tone:/);
  assert.match(css, /\.articleRow \{ --row-tone:/);
  assert.match(css, /\.readerHeader \{ background: color-mix/);
  assert.match(css, /\.siteFooter \{ background: color-mix/);
});

test("the meteor trail elastically catches up along the exact historic path", async () => {
  const listeners = {};
  const rootListeners = {};
  const field = { dataset: {} };
  const tail = Array.from({ length: 9 }, () => ({ style: {}, dataset: {} }));
  let frameCallback;
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
    requestAnimationFrame: (callback) => { frameCallback = callback; return 1; },
    setTimeout: (callback) => { idleCallback = callback; return 1; },
    clearTimeout: () => {},
    Math,
  });

  listeners.pointermove({ clientX: 0, clientY: 0 });
  assert.equal(field.dataset.visible, "true");
  listeners.pointermove({ clientX: 100, clientY: 0 });
  listeners.pointermove({ clientX: 100, clientY: 100 });
  frameCallback(16);

  const pathProgress = (transform) => {
    const [, x, y] = transform.match(/translate3d\(([\d.]+)px, ([\d.]+)px, 0\)/).map(Number);
    assert.ok((y === 0 && x >= 0 && x <= 100) || (x === 100 && y >= 0 && y <= 100), transform);
    return y === 0 ? x : 100 + y;
  };
  const earlyProgress = tail.map((square) => pathProgress(square.style.transform));
  assert.equal(new Set(earlyProgress).size, 9, "squares should follow at different elastic rates");

  for (let frame = 2; frame <= 32; frame += 1) frameCallback(frame * 16);
  const laterProgress = tail.map((square) => pathProgress(square.style.transform));
  laterProgress.forEach((progress, index) => assert.ok(progress > earlyProgress[index], `square ${index} should catch up`));
  assert.ok(laterProgress.every((progress) => progress > 100), "all squares should flow through the corner instead of cutting across it");
  assert.deepEqual(tail.map((square) => square.dataset.ready), Array(9).fill("true"));

  idleCallback();
  assert.equal(field.dataset.visible, "false");
  rootListeners.mouseleave();
  assert.equal(field.dataset.visible, "false");
  assert.deepEqual(tail.map((square) => square.dataset.ready), Array(9).fill("false"));
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
