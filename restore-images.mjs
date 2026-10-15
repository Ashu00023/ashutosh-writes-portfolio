// Run from your repo root:  node restore-images.mjs
// It never commits or pushes. It only writes image files into your working folder
// and stages the removal of one stray file.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const git = (args, opts = {}) =>
  execFileSync("git", args, { maxBuffer: 512 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"], ...opts });
const text = (args) => git(args).toString("utf8").trim();

process.chdir(text(["rev-parse", "--show-toplevel"]));

if (text(["rev-parse", "--is-shallow-repository"]) === "true") {
  console.log("This clone is shallow, so older history is missing. Run:  git fetch --unshallow   then run this script again.");
  process.exit(1);
}

const FILES = [
  "src/assets/logo-new.webp",
  "public/profile.webp",
  "public/byoa-shadow-ai-blog-thumbnail.webp",
  "public/visa-agentic-commerce-dispute-seo-thumbnail.webp",
  "public/ai-finance-blog-thumbnail.webp",
  "public/ai-content-blog-thumbnail.webp",
  "public/favicon.ico",
  "public/og-cover.jpg",
  "public/static-blogs/og-ai-personal-finance-2026.jpg",
  "public/static-blogs/og-ai-authenticity-premium-2026.jpg",
  "public/static-blogs/og-byoa-shadow-ai-blog.jpg",
  "public/static-blogs/charts/market-growth.png",
  "public/static-blogs/charts/engagement.png",
  "public/static-blogs/charts/authenticity-premium.png",
  "public/static-blogs/charts/jobs-risk.png",
  "public/visa-agentic-commerce-dispute-seo-thumbnail.png",
  "public/byoa-shadow-ai-blog-thumbnail.png",
  "public/hero-authorization-confirmed.png",
  "public/signature-verification-comparison.png",
  "public/cnp-vs-x402-flow.png",
];

// A file counts as a real image if it is not text/markup (the Lovable placeholder is an SVG),
// and a .webp must start with RIFF....WEBP.
const isRealImage = (path, buf) => {
  if (buf.length < 12) return false;
  const head = buf.subarray(0, 16).toString("latin1").trimStart().toLowerCase();
  if (head.startsWith("<svg") || head.startsWith("<?xml") || head.startsWith("<!doc") || head.startsWith("<html")) return false;
  if (path.endsWith(".webp")) {
    return buf.subarray(0, 4).toString("latin1") === "RIFF" && buf.subarray(8, 12).toString("latin1") === "WEBP";
  }
  return true;
};

console.log("Restoring from git history (all branches)...\n");
let restored = 0;
let present = 0;
const missing = [];

for (const path of FILES) {
  if (existsSync(path) && isRealImage(path, readFileSync(path))) {
    console.log(`ALREADY OK   ${path}`);
    present++;
    continue;
  }
  // Every commit that touched this path on any branch, newest first.
  const commits = text(["log", "--all", "--format=%H", "--", path]).split("\n").filter(Boolean);
  let hit = null;
  for (const c of commits) {
    let blob;
    try {
      blob = git(["show", `${c}:${path}`]); // throws if the file is absent in that commit (e.g. the deleting commit)
    } catch {
      continue;
    }
    if (isRealImage(path, blob)) {
      hit = { c, blob };
      break;
    }
  }
  if (!hit) {
    console.log(`NOT IN GIT   ${path}`);
    missing.push(path);
    continue;
  }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, hit.blob);
  const info = text(["show", "-s", "--format=%h %ad %s", "--date=short", hit.c]);
  console.log(`RESTORED     ${path}  (${hit.blob.length} bytes)  from ${info}`);
  restored++;
}

// Stray file at the repo root whose name starts with ")" and contains "git checkout"
// (created by pasting commands into git's pager).
const isStray = (n) => !n.includes("/") && n.startsWith(")") && n.includes("git checkout");
const tracked = git(["ls-files", "-z"]).toString("utf8").split("\0").filter(Boolean);
let stray = 0;
for (const n of tracked.filter(isStray)) {
  git(["rm", "-f", "--quiet", "--", n]);
  console.log(`\nREMOVED stray tracked file (deletion is staged): ${n.slice(0, 40)}...`);
  stray++;
}
for (const n of readdirSync(".").filter(isStray)) {
  rmSync(n, { force: true });
  console.log(`\nREMOVED stray untracked file: ${n.slice(0, 40)}...`);
  stray++;
}

console.log(`\nSummary: ${restored} restored, ${present} already fine, ${missing.length} never found in git history, ${stray} stray file(s) removed.`);
if (missing.length) console.log("Never in git history (you need the original files for these):\n  " + missing.join("\n  "));
