## Goal

Stop relying on Lovable's premium transactional-email setup. Instead, send contact-form notifications using **Resend's free tier** (3,000 emails/month) called directly from the existing `send-inquiry-email` Edge Function. Submissions still get saved to the backend `inquiries` table as a backup.

## Why Resend instead of Cloudflare alone

Cloudflare Email Routing only forwards **incoming** emails — it cannot send outbound mail. To actually send email you still need a transactional provider. Resend has the cleanest free tier and does not require a paid Lovable plan.

## What gets changed

### 1. Edge Function (`supabase/functions/send-inquiry-email/index.ts`)
- Remove the call to the non-existent `send-transactional-email` function.
- Add a direct HTTPS call to `https://api.resend.com/emails` with the rendered HTML email.
- Keep all existing behavior: validation, honeypot bot check, database backup insert, CORS, and error handling.
- Set `from` to a verified domain address (e.g., `inquiries@ashutoshwrites.online`) and `reply_to` to the submitter's email so you can hit Reply and write back directly.

### 2. Secrets
- Add `RESEND_API_KEY` as a runtime secret (you will create this in Resend and paste it in).

### 3. No frontend changes
- `SeoBlogInquiryForm.tsx` and `YouTubeScriptInquiryForm.tsx` already call `send-inquiry-email`; they stay exactly as-is.

## What you need to do once

1. **Sign up at resend.com** (free, no credit card).
2. **Add and verify your domain** in Resend:
   - Recommended sender: `ashutoshwrites.online` (so you can send from `inquiries@ashutoshwrites.online`).
   - Resend will give you DNS records (SPF, DKIM, DMARC) to add at your domain registrar/Cloudflare DNS.
3. **Create an API key** in Resend and copy it.
4. **Paste the API key** when I request it as a secret.

After that, form submissions will email you instantly and still be stored in the backend.

## Files touched

- `supabase/functions/send-inquiry-email/index.ts` (edit)
- Project secrets: add `RESEND_API_KEY`

## Cost

Free while under 3,000 emails/month. This is well above the volume a portfolio contact form will generate.