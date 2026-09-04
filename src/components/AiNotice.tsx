import { AlertTriangle } from "lucide-react";

export function AiNotice({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex items-start gap-2 text-xs text-muted-foreground ${className}`}
    >
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
      <span>
        AI-generated content — review before use. AI may produce inaccurate or
        incomplete information.
      </span>
    </p>
  );
}
