import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Search, MessagesSquare, Mail, Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/research", label: "Research Assistant", icon: Search },
  { to: "/copilot", label: "Copilot", icon: MessagesSquare },
  { to: "/studio", label: "Communication Studio", icon: Mail },
] as const;

export function AppLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={() => setOpen(false)}
          activeOptions={{ exact: to === "/" }}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          activeProps={{
            className:
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-accent/10 text-accent-foreground",
          }}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-card p-4 lg:flex">
        <div className="mb-6 px-3 py-2">
          <span className="text-lg font-bold tracking-tight">
            SalesPro <span className="text-accent">AI</span>
          </span>
        </div>
        {nav}
      </aside>

      <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
        <button
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 hover:bg-secondary"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <span className="text-base font-bold">
          SalesPro <span className="text-accent">AI</span>
        </span>
      </header>
      {open && (
        <div className="border-b border-border bg-card p-3 lg:hidden">{nav}</div>
      )}

      <main className="lg:pl-64">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:py-10">
          <p className="mb-6 text-sm text-muted-foreground">
            Good morning, Busisiwe 👋
          </p>
          {children}
        </div>
      </main>
    </div>
  );
}
