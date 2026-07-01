## Goal

Replace the two Google Form iframes in the Contact section with fast, on-brand native React forms. Every submission gets emailed to `ashutosh@email.ashutoshwrites.online` and stored in your backend as a backup.

## Why native > Google Form (short version)

- Faster load, no iframe, no Google branding — matches the premium look you've been building.
- You get a formatted email in your inbox on every submission (subject line includes the person's name + inquiry type).
- Every submission is also saved in your backend as a backup, so leads can never be lost.
- Full control of validation, success message, and design.
- Only "cost": one-time DNS setup for the sending subdomain (below).

## What gets built

### 1. Two native forms (replacing the current Google Form iframes)
- `SeoBlogInquiryForm.tsx` — same questions as the current SEO blog Google Form, rebuilt with react-hook-form + zod validation.
- `YouTubeScriptInquiryForm.tsx` — same questions as the current YouTube script Google Form, rebuilt the same way.
- Inline field validation, honeypot field for bots, disabled button while sending, success and error states.

### 2. Updated Contact section copy
- **SEO Blog Inquiry** card: heading + short psychological description ("Tell me about your brand, target keywords, and goals — I'll reply within 24 hours with a scope and quote.")
- **YouTube Script Inquiry** card: heading + short description ("Share your channel, niche, and video vision — you'll get a tailored script proposal in your inbox.")
- Old Google Form iframes and the `loadCount`/`submitted` iframe hack removed.

### 3. Sending setup — `notify.ashutoshwrites.online`
- Lovable provisions this subdomain automatically. You add 2 NS records at your registrar (one-click copy in the setup dialog). Takes ~5 min of your time, then DNS propagates in the background.
- This does NOT affect or replace your existing `ashutosh@email.ashutoshwrites.online` inbox — that keeps working exactly as it does now. The two subdomains are independent.

### 4. Email delivery
- Emails send from `inquiries@notify.ashutoshwrites.online` → land in `ashutosh@email.ashutoshwrites.online`.
- Reply-To is set to the person who submitted the form, so hitting "Reply" writes back to the client directly.
- Subject: e.g. `New SEO Blog Inquiry — Priya Sharma` or `New YouTube Script Inquiry — Rahul Kapoor`.
- Body: clean HTML email with all form fields laid out, brand-styled to match the site.

### 5. Backup storage
- New `inquiries` table (id, type, payload, created_at) with RLS locked to service-role only.
- Every submission is inserted here before the email fires — so even if email delivery hiccups, no lead is lost.

## Technical details (for reference)

- **Frontend**: react-hook-form + zod, matching existing shadcn form components. Client-side + server-side validation.
- **Backend**: one edge function `send-inquiry-email` that (a) validates payload with zod, (b) inserts into `inquiries` table, (c) enqueues the transactional email through Lovable Emails.
- **Email template**: React Email component in `supabase/functions/_shared/transactional-email-templates/inquiry-notification.tsx`, styled with your Instrument Serif + Inter palette.
- **No new client secrets** — LOVABLE_API_KEY is auto-provisioned.
- **Spam protection**: honeypot field + basic rate-limit-friendly validation (min message length, valid email, etc.).

## What you need to do (once, after I build it)

1. When I finish setup, a small "Set up sending domain" dialog appears — click it and it walks you through adding 2 NS records at your registrar for `notify.ashutoshwrites.online`. That's it.
2. DNS propagates in the background (usually minutes, up to 72h max). Forms work immediately for storage; emails start flowing the moment DNS verifies.

## Files touched

- New: `src/components/forms/SeoBlogInquiryForm.tsx`, `src/components/forms/YouTubeScriptInquiryForm.tsx`
- Edited: `src/components/ContactSection.tsx` (remove iframes, add form cards + copy)
- New: `supabase/functions/send-inquiry-email/index.ts`
- New: `supabase/functions/_shared/transactional-email-templates/inquiry-notification.tsx` (+ registry update)
- New migration: `inquiries` table + RLS
