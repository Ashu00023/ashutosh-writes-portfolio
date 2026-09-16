import { useState } from "react";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { TextField, TextArea } from "./InquiryField";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const serviceTypeOptions = ["Authority article", "Thought leadership", "Content strategy", "Other"];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  website: z.string().trim().max(300).optional().or(z.literal("")),
  industry: z.string().trim().min(2, "Tell me your industry").max(200),
  serviceType: z.string().trim().min(1, "Please select what you need").max(100),
  topic: z.string().trim().min(5, "Tell me about the project").max(500),
  scope: z.string().trim().max(50).optional().or(z.literal("")),
  goal: z.string().trim().max(500).optional().or(z.literal("")),
  timeline: z.string().trim().max(200).optional().or(z.literal("")),
  budget: z.string().trim().max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  // honeypot
  website_url: z.string().max(0).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const initial: FormValues = {
  name: "", email: "", company: "", website: "", industry: "", serviceType: "", topic: "",
  scope: "", goal: "", timeline: "", budget: "", notes: "", website_url: "",
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

  const setServiceType = (value: string) => {
    setValues((v) => ({ ...v, serviceType: value }));
    setErrors((e) => ({ ...e, serviceType: undefined }));
  };

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
        <h3 className="text-xl font-bold text-foreground">Thanks — your project brief is in.</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          I'll review it personally and reply within 24 hours with scope, questions and next steps.
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
      <TextField id="industry" label="Industry" required value={values.industry} onChange={set("industry")} error={errors.industry}
        placeholder="e.g. AI, fintech, SaaS, cybersecurity" />
      <TextArea id="topic" label="Topic or project" required value={values.topic} onChange={set("topic")} error={errors.topic}
        placeholder="What do you need written? Share the topic, context or content problem." />

      <div className="space-y-2">
        <Label htmlFor="serviceType">What do you need? *</Label>
        <Select value={values.serviceType} onValueChange={setServiceType}>
          <SelectTrigger id="serviceType" aria-invalid={Boolean(errors.serviceType)}>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceTypeOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.serviceType && <p className="text-xs text-destructive">{errors.serviceType}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField id="scope" label="Approximate scope" placeholder="e.g. 1 article, ~2,000 words" value={values.scope} onChange={set("scope")} error={errors.scope} />
        <TextField id="timeline" label="Timeline" placeholder="e.g. within 7 days" value={values.timeline} onChange={set("timeline")} error={errors.timeline} />
      </div>
      <TextArea id="goal" label="Goal for this project" value={values.goal} onChange={set("goal")} error={errors.goal}
        placeholder="Rank on Google? Educate readers? Support a launch? Something else?" />
      <TextField id="budget" label="Budget range (optional)" value={values.budget} onChange={set("budget")} error={errors.budget}
        placeholder="Helps me suggest the right scope" />
      <TextArea id="notes" label="Additional context" value={values.notes} onChange={set("notes")} error={errors.notes} />

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