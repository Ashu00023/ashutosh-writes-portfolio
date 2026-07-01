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
      className={cn(
        "bg-background/60 border-border/60 focus:border-accent",
        error && "border-red-500/70 focus:border-red-500",
      )}
      {...rest}
    />
    {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
    {error && <p className="text-xs text-red-500">{error}</p>}
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
      className={cn(
        "bg-background/60 border-border/60 focus:border-accent min-h-[110px]",
        error && "border-red-500/70 focus:border-red-500",
      )}
      {...rest}
    />
    {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);