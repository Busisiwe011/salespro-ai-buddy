import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { X, Search, MessagesSquare, Mail, AlertTriangle } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SalesPro AI — AI Copilot for Retail Sales Teams" },
      {
        name: "description",
        content:
          "SalesPro AI helps brand promoters and field sales reps research products, handle objections and write sales emails in seconds.",
      },
      { property: "og:title", content: "SalesPro AI — AI Copilot for Retail Sales Teams" },
      {
        property: "og:description",
        content:
          "Research products, handle objections and write sales emails in seconds with SalesPro AI.",
      },
    ],
  }),
  component: Overview,
});

const TOOLS = [
  {
    to: "/research",
    icon: Search,
    title: "Research Assistant",
    desc: "Product briefs, competitor comparisons and promo briefings.",
  },
  {
    to: "/copilot",
    icon: MessagesSquare,
    title: "Copilot",
    desc: "Chat through objections, pitches and manager updates.",
  },
  {
    to: "/studio",
    icon: Mail,
    title: "Communication Studio",
    desc: "Draft polished sales emails in the right tone.",
  },
] as const;

function Overview() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <AppLayout>
      {showBanner && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p className="flex-1 text-foreground">
            AI-generated content — review before use. AI may produce inaccurate
            or incomplete information.
          </p>
          <button
            aria-label="Dismiss notice"
            onClick={() => setShowBanner(false)}
            className="rounded p-1 hover:bg-accent/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Your AI productivity copilot
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Prepare for customer conversations, handle objections in the moment and
        send clear updates — all from one place.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {TOOLS.map(({ to, icon: Icon, title, desc }) => (
          <Link key={to} to={to}>
            <Card className="h-full rounded-xl p-5 transition-colors hover:border-accent">
              <Icon className="h-6 w-6 text-accent" />
              <h2 className="mt-3 font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
