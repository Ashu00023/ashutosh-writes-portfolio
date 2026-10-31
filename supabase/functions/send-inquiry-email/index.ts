// Receives the Article Check form, saves it to public.inquiries, then emails the owner through Resend.
import { createClient } from "npm:@supabase/supabase-js@2";

const OWNER_EMAIL = Deno.env.get("OWNER_EMAIL") ?? "ashutosh@ashutoshwrites.in";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "Ashutosh Writes <inquiries@ashutoshwrites.online>";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ALLOWED_ORIGINS = (
  Deno.env.get("ALLOWED_ORIGINS") ??
  "https://ashutoshwrites.online,https://www.ashutoshwrites.online,http://localhost:8080"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const AGENCY_LABELS: Record<string, string> = {
  agency: "Yes, an outside SEO agency",
  inhouse: "Yes, an in-house SEO team",
  none: "No",
  unsure: "Not sure",
};

// Supabase injects the new secret keys as a JSON object; fall back to the legacy service_role key.
const secretKey =
  (() => {
    try {
      return JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}")["default"] as string | undefined;
    } catch {
      return undefined;
    }
  })() ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, secretKey!, { auth: { persistSession: false } });

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const oneLine = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";
const multiLine = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const isHttpUrl = (u: string) => {
  try {
    const p = new URL(u);
    return p.protocol === "https:" || p.protocol === "http:";
  } catch {
    return false;
  }
};

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") ?? "";
  const cors = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "content-type, apikey, authorization, x-client-info",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    Vary: "Origin",
  };
  const reply = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

  // Health check. It touches the database, so an uptime monitor can keep a free project from pausing.
  if (req.method === "GET") {
    const { error } = await supabase.from("inquiries").select("id", { head: true, count: "exact" }).limit(1);
    return reply({ ok: !error }, error ? 500 : 200);
  }
  if (req.method !== "POST") return reply({ error: "Method not allowed" }, 405);
  if (origin && !ALLOWED_ORIGINS.includes(origin)) return reply({ error: "Origin not allowed" }, 403);

  let b: Record<string, unknown> | null;
  try {
    b = await req.json();
  } catch {
    return reply({ error: "Invalid request" }, 400);
  }
  if (!b || typeof b !== "object") return reply({ error: "Invalid request" }, 400);

  // Honeypot: bots fill the hidden field. Answer "ok" so they move on, and store nothing.
  if (typeof b.website_url === "string" && b.website_url.length > 0) return reply({ ok: true });

  const name = oneLine(b.name, 100);
  const email = oneLine(b.email, 255).toLowerCase();
  const articleUrl = oneLine(b.articleUrl, 500);
  const company = oneLine(b.company, 200);
  const source = oneLine(b.source, 40).replace(/[^a-z0-9_-]/gi, "");
  const notes = multiLine(b.notes, 2000);
  const hasAgency = typeof b.hasAgency === "string" && Object.hasOwn(AGENCY_LABELS, b.hasAgency) ? b.hasAgency : "";

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !isHttpUrl(articleUrl) || b.consent !== true) {
    return reply({ error: "Please check your details and try again." }, 400);
  }

  // Basic flood protection: at most 20 requests an hour overall and 3 an hour per email address.
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const [all, mine] = await Promise.all([
    supabase.from("inquiries").select("id", { head: true, count: "exact" }).gte("created_at", since),
    supabase.from("inquiries").select("id", { head: true, count: "exact" }).gte("created_at", since).eq("email", email),
  ]);
  if ((all.count ?? 0) >= 20 || (mine.count ?? 0) >= 3) {
    return reply({ error: "Too many requests right now. Please email us directly." }, 429);
  }

  const { data: row, error: insertErr } = await supabase
    .from("inquiries")
    .insert({
      name,
      email,
      article_url: articleUrl,
      company: company || null,
      has_agency: hasAgency || null,
      source: source || null,
      notes: notes || null,
      consent: true,
    })
    .select("id")
    .single();
  if (insertErr || !row) {
    console.error("insert failed", insertErr);
    return reply({ error: "Could not save your request. Please email us directly." }, 500);
  }

  const fields = (
    [
      ["Name", name],
      ["Email", email],
      ["Article link", articleUrl],
      ["Company", company],
      ["SEO support", hasAgency ? AGENCY_LABELS[hasAgency] : ""],
      ["Came from", source],
      ["Notes", notes],
    ] as [string, string][]
  ).filter(([, v]) => v);
  const cell = "padding:8px 12px;border:1px solid #e5e7eb;vertical-align:top";
  const html = `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#111827;line-height:1.5">
<h2 style="margin:0 0 12px">New Article Check request</h2>
<table style="border-collapse:collapse;width:100%;max-width:640px">${fields
    .map(
      ([k, v]) =>
        `<tr><td style="${cell};background:#f9fafb;font-weight:600;width:140px">${esc(k)}</td><td style="${cell};white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("")}</table></body></html>`;
  const text = fields.map(([k, v]) => `${k}: ${v}`).join("\n");

  // The request is already saved. If the email fails, emailed_at stays empty so you can spot it in the table.
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set; request saved but not emailed");
  } else {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [OWNER_EMAIL],
          reply_to: email,
          subject: `New Article Check request: ${name}`,
          html,
          text,
        }),
      });
      if (res.ok) {
        await supabase.from("inquiries").update({ emailed_at: new Date().toISOString() }).eq("id", row.id);
      } else {
        console.warn("resend failed", res.status, await res.text());
      }
    } catch (err) {
      console.warn("resend error", err);
    }
  }

  return reply({ ok: true });
});  