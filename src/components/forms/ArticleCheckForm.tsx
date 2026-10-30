import { useState } from "react";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import { TextField, TextArea } from "./InquiryField";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  articleUrl: z
    .string()
    .trim()
    .max(500)
    .url("Please enter the full article link, starting with https://")
    .refine((u) => /^https?:\/\//i.test(u), "Please enter the full article link, starting with https://"),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  hasAgency: z.enum(["", "agency", "inhouse", "none", "unsure"]).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please tick the box so we can reply to you" }) }),
  // honeypot
  website_url: z.string().max(0).optional().or(z.literal("")),
});

type Values = {
  name: string; email: string; articleUrl: string; company: string; notes: string; hasAgency: string; consent: boolean; website_url: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = { name: "", email: "", articleUrl: "", company: "", notes: "", hasAgency: "", consent: false, website_url: "" };

const agencyLabels: Record<string, string> = {
  agency: "Yes, an outside SEO agency",
  inhouse: "Yes, an in-house SEO team",
  none: "No",
  unsure: "Not sure",
};

const ArticleCheckForm = () => {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Errors = {};
      parsed.error.issues.forEach((i) => {
        const key = i.path[0] as keyof Values;
        if (!errs[key]) errs[key] = i.message;
      });
      setErrors(errs);
      const first = ["name", "email", "articleUrl", "consent"].find((k) => errs[k as keyof Values]);
      if (first) setTimeout(() => document.getElementById(first)?.focus(), 0);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { consent: _consent, hasAgency, notes, ...rest } = parsed.data;
      const agencyLabels: Record<string, string> = {
        agency: "Yes, an outside SEO agency",
        inhouse: "Yes, an in-house SEO team",
        none: "No",
        unsure: "Not sure",
      };
      // The edge function only accepts known fields, so this answer travels at the top of "notes".
      const agencyLine = hasAgency && agencyLabels[hasAgency] ? `SEO support: ${agencyLabels[hasAgency]}` : "";
      const src = (new URLSearchParams(window.location.search).get("src") || "").replace(/[^a-z0-9_-]/gi, "").slice(0, 40);
      const srcLine = src ? `Came from: ${src}` : "";
      const combinedNotes = [agencyLine, srcLine, notes].filter(Boolean).join("\n\n");
      // type stays "seo_blog" so the existing inquiries table constraint accepts it. The intent field tells the two kinds apart.
      const { error } = await supabase.functions.invoke("send-inquiry-email", {
        body: { type: "seo_blog", data: { ...rest, ...(combinedNotes ? { notes: combinedNotes } : {}), intent: "article_check", consent: "yes" } },
      });
      if (error) throw error;
      (window as any).awAnalytics?.track?.("generate_lead", { form: "article_check", source: src || "direct", has_agency: hasAgency || "unanswered" });
      setDone(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };
  
  if (done) {
    return (
      <div role="status" className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <CheckCircle size={40} strokeWidth={1.5} className="text-ledger" />
        <h3 className="font-heading text-2xl font-normal text-foreground">Your email is ready to send.</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Your email app should have opened with your request filled in. Press send there to finish. If nothing opened, email{" "}
          <a href={`mailto:${EMAIL}`} className="underline underline-offset-2 hover:text-accent">{EMAIL}</a> directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <p className="text-xs text-muted-foreground">Fields marked * are required.</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField id="name" label="Your name" required value={values.name} onChange={set("name")} error={errors.name} autoComplete="name" />
        <TextField id="email" label="Work email" required type="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" />
      </div>
      <TextField
        id="articleUrl" label="Article link" required type="url" inputMode="url" placeholder="https://"
        value={values.articleUrl} onChange={set("articleUrl")} error={errors.articleUrl}
        hint="A published article, or a link to a Google Doc anyone with the link can view."
      />
      <TextField id="company" label="Company" value={values.company} onChange={set("company")} error={errors.company} autoComplete="organization" />
      <div className="space-y-1.5">
        <Label htmlFor="hasAgency" className="text-sm font-medium text-foreground">Does an SEO agency or team look after your site?</Label>
        <select
          id="hasAgency"
          value={values.hasAgency}
          onChange={set("hasAgency")}
          className="flex h-10 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">Choose one (optional)</option>
          <option value="agency">Yes, an outside agency</option>
          <option value="inhouse">Yes, an in-house SEO team</option>
          <option value="none">No</option>
          <option value="unsure">Not sure</option>
        </select>
        <p className="text-xs text-muted-foreground">If yes, we work with them. We never need publishing access.</p>
      </div>
      <TextArea id="notes" label="Anything we should know?" value={values.notes} onChange={set("notes")} error={errors.notes}
        placeholder="Who the article is for, the keyword it targets, or what worries you about it." />

      <input
        type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
        value={values.website_url} onChange={set("website_url")}
        style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
      />

      <div className="space-y-1.5">
        <label htmlFor="consent" className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
          <input
            id="consent" type="checkbox" checked={values.consent}
            onChange={(e) => setValues((v) => ({ ...v, consent: e.target.checked }))}
            aria-required="true" aria-invalid={Boolean(errors.consent)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--accent))]"
          />
          <span>
            I agree that Ashutosh Writes may use these details to reply to me and run the check. They are stored for up to 12 months. See the{" "}
            <a href="/privacy-policy" className="underline underline-offset-2 hover:text-accent">Privacy Policy</a>. *
          </span>
        </label>
        {errors.consent && <p className="text-xs text-accent">{errors.consent}</p>}
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent py-3.5 text-sm font-medium text-accent-foreground transition-colors duration-120 ease-cross hover:bg-foreground"
      >
        Request my free Article Check
      </button>
      <p className="text-center text-xs text-muted-foreground">We reply within 1 to 2 working days. No obligation.</p>
    </form>
  );
};

export default ArticleCheckForm;
