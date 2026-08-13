// Postbuild prerender: renders each route with Puppeteer against the built dist/
// output and writes static HTML (including react-helmet-async meta tags) to disk.
import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";
// Prerender is a best-effort SEO enhancement. If Chromium is unavailable in the
// build environment (common on CI/Vercel), we skip it instead of failing the build.
let puppeteer;
try {
  puppeteer = (await import("puppeteer")).default;
} catch (err) {
  console.warn(`[prerender] skipped: puppeteer unavailable (${err?.message ?? err})`);
  process.exit(0);
}

const DIST = resolve("dist");
const ROUTES = [
  "/",
  "/blog",
  "/blog/human-creativity-vs-ai-authenticity-premium-2026",
  "/blog/ai-personal-finance-2026",
  "/scripts/salary-trap",
  "/scripts/prediction-is-the-drug",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let filePath = join(DIST, urlPath);
    if (!filePath.startsWith(DIST)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    if (!existsSync(filePath) || extname(filePath) === "") {
      filePath = join(DIST, "index.html"); // SPA fallback
    }
    const body = await readFile(filePath);
    res.writeHead(200, { "Content-Type": MIME[extname(filePath)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end("Not found");
  }
});

if (!existsSync(join(DIST, "index.html"))) {
  console.warn("[prerender] skipped: dist/index.html not found");
  process.exit(0);
}

await new Promise((r) => server.listen(0, "127.0.0.1", r));
const { port } = server.address();
const base = `http://127.0.0.1:${port}`;

let browser;
try {
  browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
} catch (err) {
  console.warn(`[prerender] skipped: could not launch Chromium (${err?.message ?? err})`);
  server.close();
  process.exit(0);
}

try {
  for (const route of ROUTES) {
    let page;
    try {
      page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(`${base}${route}`, { waitUntil: "networkidle0", timeout: 60_000 });
      // Wait until React has mounted and Helmet has written the document title.
      await page.waitForFunction(
        () => {
          const root = document.getElementById("root");
          return !!root && root.childElementCount > 0 && !!document.title;
        },
        { timeout: 30_000 },
      );
      const html = await page.content();
      const outDir = route === "/" ? DIST : join(DIST, route);
      await mkdir(outDir, { recursive: true });
      await writeFile(join(outDir, "index.html"), html, "utf8");
      console.log(`prerendered ${route} -> ${join(outDir, "index.html").replace(`${DIST}/`, "dist/")}`);
    } catch (err) {
      console.warn(`[prerender] skipped ${route}: ${err?.message ?? err}`);
    } finally {
      await page?.close().catch(() => {});
    }
  }
} finally {
  await browser.close().catch(() => {});
  server.close();
}
