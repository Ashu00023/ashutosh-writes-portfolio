# Project memory

## Product intent & audience

- Article check form (`ArticleCheckForm`) collects SEO/article-related inquiries from site owners/operators; feeds a Supabase edge function.
- Audience may include site owners supported by external SEO agencies or in-house teams; form now explicitly asks whether an SEO agency/team looks after their site.

## Brand personality & voice

- Tone: professional, reassuring, concise. Example copy: "If yes, we work with them. We never need publishing access."
- Uses UK-friendly spelling (`agencyLabels`) but UI labels are generic English.

## Visual design & UX direction

- Form components live in `src/components/forms/`; reusable field primitives (`TextField`, `TextArea`) in `InquiryField`.
- UI primitives available at `@/components/ui/label` (shadcn-style `Label`).
- Select styling pattern: `flex h-10 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` — matches existing input treatment.
- Field block pattern: `space-y-1.5` wrapper, `text-sm font-medium text-foreground` label, `text-xs text-muted-foreground` helper text.
- New agency question is optional, with placeholder "Choose one (optional)".
- Responsive and accessible: uses `htmlFor`/`id` pairing; controlled `select`.

## Decisions, constraints & rationale

- User insists on minimal, surgical find/replace edits; no refactor, no restyle, no other files touched.
- `hasAgency` values: `""` | `"agency"` | `"inhouse"` | `"none"` | `"unsure"`. Only non-empty known values are mapped to human-readable labels in the notes payload.
- `consent` is sent to the edge function as the literal string `"yes"` when accepted.
- Change handler type widened to include `HTMLSelectElement` to support the new select.

## Open questions & assumptions

- Assumes 1900-char limit comfortably accommodates the `SEO support: ...` line plus user notes; exact combined cap not enforced beyond Zod's 1900 on `notes`.