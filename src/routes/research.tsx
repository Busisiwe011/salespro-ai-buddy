import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { AiNotice } from "@/components/AiNotice";
import { CopyButton } from "@/components/CopyButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { generateAiText } from "@/lib/ai.functions";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Sales Research Assistant | SalesPro AI" },
      {
        name: "description",
        content:
          "Turn your product, competitor and promotion notes into clear sales briefs before customer interactions.",
      },
      { property: "og:title", content: "Sales Research Assistant | SalesPro AI" },
      {
        property: "og:description",
        content:
          "Turn your notes into clear product briefs, competitor comparisons and promotion briefings.",
      },
    ],
  }),
  component: Research,
});

const SYSTEM =
  "You are a retail sales research assistant helping brand promoters and field sales representatives quickly understand products, competitors, and promotions before customer interactions. RULES: Only use information provided by the user. Never invent product specs, prices, promotions, or claims not given. If information is missing, explicitly state what's missing rather than guessing. Keep language simple and practical for live sales conversations. No medical, legal, or financial claims.";

const MODES = {
  "Product Brief":
    "Structure the output with these headings: Product / Key Benefits / Target Customer / Top Selling Points / Potential Objections / Suggested Responses / Information to verify.",
  "Competitor Comparison":
    "Structure the output with these headings: Products Compared / Key Differences / Where We Win / Where They Win / Talking Points / Traps to Avoid / Information to verify.",
  "Promotion Briefing":
    "Structure the output with these headings: Promotion / What the Customer Gets / Who It Suits / How to Explain It / Terms to Be Clear About / Likely Questions / Information to verify.",
  "Sales Insights":
    "Structure the output with these headings: Summary / What Stands Out / Opportunities / Risks / Recommended Next Actions / Information to verify.",
} as const;

type Mode = keyof typeof MODES;

function Research() {
  const run = useServerFn(generateAiText);
  const [mode, setMode] = useState<Mode>("Product Brief");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!input.trim()) {
      setError(
        "Add a few notes first — product details, competitor info or promo terms — and I'll turn them into a brief.",
      );
      setOutput("");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await run({
        data: {
          system: SYSTEM,
          messages: [
            {
              role: "user" as const,
              content: `Mode: ${mode}\n${MODES[mode]}\n\nInformation provided:\n${input.trim()}`,
            },
          ],
        },
      });
      setOutput(res.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Sales Research Assistant
      </h1>

      <div className="mt-5 flex flex-wrap gap-2">
        {(Object.keys(MODES) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              mode === m
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={7}
        placeholder="Paste product details, competitor notes or promotion terms here…"
        className="mt-4"
      />

      <div className="mt-3 flex items-center gap-3">
        <Button onClick={generate} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Generating…" : "Generate Brief"}
        </Button>
      </div>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {output && (
        <Card className="mt-6 rounded-xl p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="font-semibold">{mode}</h2>
            <CopyButton text={output} />
          </div>
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
            {output}
          </pre>
          <AiNotice className="mt-4" />
        </Card>
      )}
    </AppLayout>
  );
}
