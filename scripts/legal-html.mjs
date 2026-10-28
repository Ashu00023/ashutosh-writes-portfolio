// Turns src/pages/legal/*.tsx into HTML for the prerendered pages, so the legal text exists once (in the .tsx files)
// and the raw HTML crawlers see can never drift from what visitors see.
// It understands only the JSX these pages use today. If someone adds anything else (a variable, a component, a
// loop), it throws and the build fails, so the raw HTML is never silently wrong.

import { readFile } from "node:fs/promises";
import { join } from "node:path";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function prop(src, name) {
  const m = src.match(new RegExp(`\\b${name}="([^"]*)"`));
  if (!m) throw new Error(`legal page: prop "${name}" not found`);
  return m[1];
}

export async function readLegalPage(root, file) {
  const src = await readFile(join(root, "src/pages/legal", file), "utf8");
  const site = await readFile(join(root, "src/data/site.ts"), "utf8");
  const email = site.match(/export const EMAIL = "([^"]+)"/)?.[1];
  if (!email) throw new Error("legal page: EMAIL not found in src/data/site.ts");

  const open = src.match(/<LegalLayout[\s\S]*?\n\s*>\n/);
  const end = src.indexOf("</LegalLayout>");
  if (!open || end < 0) throw new Error(`legal page: <LegalLayout> block not found in ${file}`);

  const body = src
    .slice(open.index + open[0].length, end)
    .replace(/\{" "\}/g, " ")
    .replace(/\{"([^"]*)"\}/g, (_m, text) => esc(text))
    .replace(/href=\{`mailto:\$\{EMAIL\}`\}/g, `href="mailto:${email}"`)
    .replace(/\{EMAIL\}/g, email)
    .replace(/className=/g, "class=");

  const leftover = body.match(/[{}]/);
  if (leftover) {
    const at = body.indexOf(leftover[0]);
    throw new Error(`legal page ${file}: JSX this converter does not handle, near: ${body.slice(Math.max(0, at - 40), at + 60)}`);
  }

  return {
    title: prop(src, "title"),
    intro: prop(src, "intro"),
    updated: prop(src, "updated"),
    bodyHtml: body.trim(),
  };
}
