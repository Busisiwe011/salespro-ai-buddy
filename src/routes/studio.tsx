import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { AiNotice } from "@/components/AiNotice";
import { CopyButton } from "@/components/CopyButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateAiText } from "@/lib/ai.functions";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Sales Communication Studio | SalesPro AI" },
      {
        name: "description",
        content:
          "Draft follow-ups, manager updates and store reports with the right tone for every audience.",
      },
      { property: "og:title", content: "Sales Communication Studio | SalesPro AI" },
      {
        property: "og:description",
        content:
          "Draft sales emails with the right tone for customers, managers and teammates.",
      },
    ],
  }),
  component: Studio,
});

const SYSTEM =
  "You are a professional sales communication assistant. Write clear, appropriate emails based only on the information given. Never invent facts, prices, or commitments not provided by the user. Match the selected tone and audience. Always start your reply with a line beginning 'Subject:' followed by the email body.";

const EMAIL_TYPES = [
  "Client Follow-up",
  "Manager Update",
  "Store Report",
  "Product Enquiry",
  "Customer Response",
];
const AUDIENCES = ["Customer", "Store Manager", "Sales Manager", "Team Member"];
const TONES = ["Professional", "Friendly", "Persuasive", "Concise"];

function Field({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function Studio() {
  const run = useServerFn(generateAiText);
  const [type, setType] = useState(EMAIL_TYPES[0]);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [info, setInfo] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!info.trim()) {
      setError("Add the key details you want included, then I'll draft the email.");
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
              content: `Email type: ${type}\nAudience: ${audience}\nTone: ${tone}\n\nKey information:\n${info.trim()}`,
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
        Sales Communication Studio
      </h1>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <Field label="Email Type" value={type} onChange={setType} options={EMAIL_TYPES} />
        <Field label="Audience" value={audience} onChange={setAudience} options={AUDIENCES} />
        <Field label="Tone" value={tone} onChange={setTone} options={TONES} />
      </div>

      <div className="mt-4 space-y-1.5">
        <Label>Key information</Label>
        <Textarea
          rows={6}
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          placeholder="What happened, what you need, dates, names, next steps…"
        />
      </div>

      <Button className="mt-3" onClick={generate} disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading ? "Generating…" : "Generate Email"}
      </Button>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {output && (
        <Card className="mt-6 rounded-xl p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="font-semibold">Draft email</h2>
            <CopyButton text={output} />
          </div>
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
            {output}
          </pre>
          <AiNotice className="mt-4" />
        </Card>
      )}
    </AppLayout>
  );
}
