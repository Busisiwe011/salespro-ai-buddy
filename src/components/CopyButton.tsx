import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? (
        <Check className="mr-1.5 h-4 w-4" />
      ) : (
        <Copy className="mr-1.5 h-4 w-4" />
      )}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}
