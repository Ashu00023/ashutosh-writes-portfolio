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
  serviceType: z.string().trim().min(1, "Please select what you need").max(100),
  topic: z.string().trim().min(5, "Tell me about the project").max(500),
  timeline: z.string().trim().max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  // honeypot
  website_url: z.string().max(0).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const initial: FormValues = {
  name: "", email: "", company: "", website: "", serviceType: "", topic: "", timeline: "", notes: "", website_url: "",
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
      const order = ["name", "email", "company", "website", "topic", "serviceType", "timeline", "notes"];
      const first = order.find((k) => fieldErrs[k as keyof FormValues]);
      if (first) setTimeout(() => document.getElementById(first)?.focus(), 0);
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
      <div role="status" className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle size={40} strokeWidth={1.5} className="text-ledger" />   
        <h3 className="font-heading text-2xl font-normal text-foreground">Thanks, your project brief is in.</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          I will review it personally and aim to reply within 1 to 2 working days with scope, questions and next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <p className="text-xs text-muted-foreground">Fields marked * are required.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField id="name" label="Your name" required value={values.name} onChange={set("name")} error={errors.name} autoComplete="name" />
        <TextField id="email" label="Email" required type="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField id="company" label="Brand or company" value={values.company} onChange={set("company")} error={errors.company} autoComplete="organization" />
        <TextField id="website" label="Website" placeholder="https://" value={values.website} onChange={set("website")} error={errors.website} type="url" inputMode="url" autoComplete="url" />
      </div>
      <TextArea id="topic" label="Topic or project" required value={values.topic} onChange={set("topic")} error={errors.topic}
        placeholder="What do you need written? Share the topic, context or content problem." />

      <div className="space-y-2">
        <Label htmlFor="serviceType">What do you need? *</Label>
        <Select value={values.serviceType} onValueChange={setServiceType}>
          <SelectTrigger id="serviceType" aria-required="true" aria-invalid={Boolean(errors.serviceType)} aria-describedby={errors.serviceType ? "serviceType-error" : undefined}>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceTypeOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.serviceType && <p id="serviceType-error" className="text-xs text-accent">{errors.serviceType}</p>}
      </div>

      <TextField id="timeline" label="Timeline" placeholder="e.g. within 7 days" value={values.timeline} onChange={set("timeline")} error={errors.timeline} />
      <TextArea id="notes" label="Additional context" value={values.notes} onChange={set("notes")} error={errors.notes} />

      <input
        type="text" tabIndex={-1} autoComplete="off"
        aria-hidden="true"
        value={values.website_url} onChange={set("website_url")}
        style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
      />

      {serverError && (
        <div role="alert" className="text-sm text-accent border border-accent/40 bg-accent/5 px-4 py-3">
          {serverError}
        </div>
      )}

         <button
           type="submit"
           disabled={submitting}
           className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent py-3.5 text-sm font-medium text-accent-foreground transition-colors duration-120 ease-cross hover:bg-foreground disabled:cursor-not-allowed disabled:opacity-60"
         >
           {submitting && <Loader2 size={18} className="animate-spin" />}
           {submitting ? "Sending…" : "Send inquiry"}
         </button>
      <p className="text-xs text-muted-foreground text-center">
        I aim to reply within 1 to 2 working days. By sending this form you agree that I may use these details to reply to your enquiry. They are stored for up to 12 months. See the{" "}
        <a href="/privacy-policy" className="underline underline-offset-2 hover:text-accent">Privacy Policy</a>.
      </p>
    </form>
  );
};

export default SeoBlogInquiryForm;