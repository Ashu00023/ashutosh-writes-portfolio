import { useState } from "react";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { TextField, TextArea } from "./InquiryField";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  website: z.string().trim().max(300).optional().or(z.literal("")),
  niche: z.string().trim().min(2, "Tell me your niche or industry").max(200),
  topic: z.string().trim().min(5, "Give me a topic or target keyword").max(500),
  wordCount: z.string().trim().max(50).optional().or(z.literal("")),
  goal: z.string().trim().max(500).optional().or(z.literal("")),
  timeline: z.string().trim().max(200).optional().or(z.literal("")),
  budget: z.string().trim().max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  // honeypot
  website_url: z.string().max(0).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const initial: FormValues = {
  name: "", email: "", company: "", website: "", niche: "", topic: "",
  wordCount: "", goal: "", timeline: "", budget: "", notes: "", website_url: "",
};

const SeoBlogInquiryForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const set = <K extends keyof FormValues>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrs: Partial<Record<keyof FormValues, string>> = {};
      parsed.error.issues.forEach((i) => {
        const key = i.path[0] as keyof FormValues;
        if (!fieldErrs[key]) fieldErrs[key] = i.message;
      });
      setErrors(fieldErrs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.functions.invoke("send-inquiry-email", {
        body: { type: "seo_blog", data: parsed.data },
      });
      if (error) throw error;
      setDone(true);
      onSuccess?.();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again or email me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle size={56} className="text-green-500" />
        <h3 className="text-xl font-bold text-foreground">Thanks — your inquiry is in.</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          I read every message myself and reply within 24 hours with a scope and quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField id="name" label="Your name" required value={values.name} onChange={set("name")} error={errors.name} autoComplete="name" />
        <TextField id="email" label="Email" required type="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField id="company" label="Brand or company" value={values.company} onChange={set("company")} error={errors.company} />
        <TextField id="website" label="Website" placeholder="https://" value={values.website} onChange={set("website")} error={errors.website} />
      </div>
      <TextField id="niche" label="Niche or industry" required value={values.niche} onChange={set("niche")} error={errors.niche}
        placeholder="e.g. personal finance, SaaS, wellness" />
      <TextArea id="topic" label="Topic or target keyword" required value={values.topic} onChange={set("topic")} error={errors.topic}
        placeholder="What should the blog be about? Any specific keyword you want to rank for?" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField id="wordCount" label="Approx. word count" placeholder="e.g. 1500–2000" value={values.wordCount} onChange={set("wordCount")} error={errors.wordCount} />
        <TextField id="timeline" label="Timeline" placeholder="e.g. within 7 days" value={values.timeline} onChange={set("timeline")} error={errors.timeline} />
      </div>
      <TextArea id="goal" label="Goal for this blog" value={values.goal} onChange={set("goal")} error={errors.goal}
        placeholder="Rank on Google? Educate readers? Drive sign-ups? Something else?" />
      <TextField id="budget" label="Budget range (optional)" value={values.budget} onChange={set("budget")} error={errors.budget}
        placeholder="Helps me suggest the right scope" />
      <TextArea id="notes" label="Anything else I should know?" value={values.notes} onChange={set("notes")} error={errors.notes} />

      {/* honeypot — hidden from humans */}
      <input
        type="text" tabIndex={-1} autoComplete="off"
        aria-hidden="true"
        value={values.website_url} onChange={set("website_url")}
        style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
      />

      {serverError && (
        <div className="text-sm text-red-500 border border-red-500/40 bg-red-500/5 rounded-lg px-4 py-3">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-accent-foreground font-semibold py-3.5 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting && <Loader2 size={18} className="animate-spin" />}
        {submitting ? "Sending…" : "Send inquiry"}
      </button>
      <p className="text-xs text-muted-foreground text-center">
        I reply within 24 hours. Your details stay private.
      </p>
    </form>
  );
};

export default SeoBlogInquiryForm;