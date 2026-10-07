import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type BaseProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
};

export const TextField = ({
  id,
  label,
  required,
  error,
  hint,
  ...rest
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="text-sm font-medium text-foreground">
      {label} {required && <span className="text-accent">*</span>}
    </Label>
    <Input
      id={id}
      aria-invalid={!!error}
      aria-required={required || undefined}
      aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
      className={cn(
        "bg-background/60 border-border focus:border-ledger",
        error && "border-accent/70 focus:border-accent",
      )}
      {...rest}
    />
    {hint && !error && <p id={`${id}-hint`} className="text-xs text-muted-foreground">{hint}</p>}
    {error && <p id={`${id}-error`} className="text-xs text-accent">{error}</p>}
  </div>
);

export const TextArea = ({
  id,
  label,
  required,
  error,
  hint,
  ...rest
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="text-sm font-medium text-foreground">
      {label} {required && <span className="text-accent">*</span>}
    </Label>
    <Textarea
      id={id}
      aria-invalid={!!error}
      aria-required={required || undefined}
      aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
      className={cn(
        "bg-background/60 border-border/60 focus:border-accent min-h-[110px]",
        error && "border-red-500/70 focus:border-red-500",
      )}
      {...rest}
    />
    {hint && !error && <p id={`${id}-hint`} className="text-xs text-muted-foreground">{hint}</p>}
    {error && <p id={`${id}-error`} className="text-xs text-accent">{error}</p>}
  </div>
);