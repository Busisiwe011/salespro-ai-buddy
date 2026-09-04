import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Send } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { AiNotice } from "@/components/AiNotice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateAiText } from "@/lib/ai.functions";

export const Route = createFileRoute("/copilot")({
  head: () => ({
    meta: [
      { title: "SalesPro Copilot — Live Sales Chat Help" },
      {
        name: "description",
        content:
          "Chat with SalesPro Copilot for objection handling, product explanations, pitch prep and manager updates.",
      },
      { property: "og:title", content: "SalesPro Copilot — Live Sales Chat Help" },
      {
        property: "og:description",
        content:
          "Objection handling, product explanations, pitch prep and manager updates, in the moment.",
      },
    ],
  }),
  component: Copilot,
});

const SYSTEM =
  "You are SalesPro Copilot, helping retail sales reps with objection handling, product explanations, sales pitch prep, and manager communication. Never invent product specs, prices, or claims not given in the conversation — if you don't have the info, say so and ask for it. Keep responses short, practical, and usable in the moment. Ask one clarifying question if a request is ambiguous. No medical, legal, or financial claims.";

const CHIPS = [
  "Handle an objection: ",
  "Explain a product: ",
  "Prepare a sales pitch for: ",
  "Write a manager update about: ",
];

type Msg = { role: "user" | "assistant"; content: string };

function Copilot() {
  const run = useServerFn(generateAiText);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const res = await run({ data: { system: SYSTEM, messages: next } });
      setMessages([...next, { role: "assistant", content: res.text }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        SalesPro Copilot
      </h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {CHIPS.map((c) => (
          <button
            key={c}
            onClick={() => setInput(c)}
            className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary"
          >
            {c.replace(/[:\s]+$/, "").replace(" for", "").replace(" about", "")}
          </button>
        ))}
      </div>

      <div className="mt-5 min-h-[320px] space-y-3 rounded-xl border border-border bg-card p-4">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Ask anything about your customer conversation — start with a chip
            above.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-foreground"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
          </div>
        )}
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message…"
        />
        <Button type="submit" disabled={loading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>

      <AiNotice className="mt-3" />
    </AppLayout>
  );
}
