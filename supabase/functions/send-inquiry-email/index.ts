// Edge function: receives contact form submissions, stores them in the
// `inquiries` table as a backup, and emails the site owner via the
// project's transactional email function (once the sending domain is set up).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const OWNER_EMAIL = "ashutosh@email.ashutoshwrites.online";

type Body = {
  type: "seo_blog" | "youtube_script";
  data: Record<string, string>;
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const prettyLabel = (k: string) =>
  k
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .replace(/Url/g, "URL");

const renderHtml = (title: string, data: Record<string, string>) => {
  const rows = Object.entries(data)
    .filter(([k, v]) => k !== "website_url" && v && v.trim().length > 0)
    .map(
      ([k, v]) =>
        `<tr>
           <td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;vertical-align:top;width:180px;">${escapeHtml(prettyLabel(k))}</td>
           <td style="padding:8px 12px;border:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(v)}</td>
         </tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="font-family:Inter,system-ui,sans-serif;color:#111827;line-height:1.5;">
    <h2 style="margin:0 0 12px;">New ${escapeHtml(title)}</h2>
    <p style="margin:0 0 16px;color:#4b5563;">A visitor just submitted the contact form on ashutoshwrites.online.</p>
    <table style="border-collapse:collapse;width:100%;max-width:640px;">${rows}</table>
  </body></html>`;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as Body;
    if (!body?.type || !body?.data) {
      return new Response(JSON.stringify({ error: "Invalid body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Reject bots caught by the honeypot silently (return success so bot moves on).
    if (typeof body.data.website_url === "string" && body.data.website_url.length > 0) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error: insertErr } = await supabase.from("inquiries").insert({
      type: body.type,
      payload: body.data,
      name: body.data.name ?? null,
      email: body.data.email ?? null,
    });
    if (insertErr) {
      console.error("insert failed", insertErr);
      return new Response(JSON.stringify({ error: "Could not save inquiry" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const title =
      body.type === "seo_blog" ? "SEO Blog Inquiry" : "YouTube Script Inquiry";
    const subject = `New ${title} — ${body.data.name || "Unnamed visitor"}`;
    const html = renderHtml(title, body.data);

    // Try to send the email through the project's transactional email
    // function. This function is created when the sending domain is set up.
    // If it doesn't exist yet, we still return success — the submission is
    // saved in the `inquiries` table so no lead is lost.
    try {
      const { error: emailErr } = await supabase.functions.invoke(
        "send-transactional-email",
        {
          body: {
            to: OWNER_EMAIL,
            subject,
            html,
            reply_to: body.data.email || undefined,
          },
        },
      );
      if (emailErr) console.warn("email dispatch failed", emailErr);
    } catch (err) {
      console.warn("send-transactional-email not available yet", err);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});