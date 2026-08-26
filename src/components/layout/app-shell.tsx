import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Disclaimer } from "@/components/disclaimer";
import { Chg } from "@/components/chg";
import { Button } from "@/components/ui/button";
import { useMarket } from "@/lib/market-store";
import { tagsOf } from "@/lib/research/tags";
import { MODEL_VERSION } from "@/lib/research/types";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "总览" },
  { to: "/quotes", label: "行情" },
  { to: "/rank", label: "日评分" },
  { to: "/pool/month", label: "月度池" },
  { to: "/pool/year", label: "年度池" },
  { to: "/news", label: "新闻" },
  { to: "/plan", label: "规划" },
  { to: "/watch", label: "自选" },
  { to: "/method", label: "方法" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const refresh = useMarket((s) => s.refresh);
  const loading = useMarket((s) => s.loading);
  const indices = useMarket((s) => s.indices);
  const live = useMarket((s) => s.live);
  const stocks = useMarket((s) => s.stocks);
  const [q, setQ] = useState("");

  useEffect(() => {
    void refresh();
    const t = window.setInterval(() => void refresh(), 60_000);
    return () => window.clearInterval(t);
  }, [refresh]);

  const hits = useMemo(() => {
    const s = q.trim();
    if (!s) return [];
    return stocks
      .filter(
        (x) =>
          x.name.includes(s) ||
          x.code.includes(s) ||
          x.industry.includes(s) ||
          tagsOf(x).some((t) => t.includes(s)),
      )
      .slice(0, 8);
  }, [q, stocks]);

  return (
    <div className="min-h-dvh overflow-x-hidden bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex shrink-0 items-baseline gap-2">
            <span className="font-display text-lg tracking-tight text-fg">衡砚</span>
            <span className="hidden text-xs text-muted sm:inline">研究台</span>
          </Link>
          <nav className="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "rounded-sm px-2.5 py-1.5 text-sm transition-colors duration-150",
                  pathname === n.to ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="relative ml-auto w-36 sm:w-52">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="代码 / 名称 / 科创"
              className="h-9 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none placeholder:text-subtle focus:ring-2 focus:ring-steel/40"
            />
            {hits.length > 0 && (
              <div className="absolute top-10 right-0 left-0 overflow-hidden rounded-md border border-border bg-bg-elevated shadow-panel">
                {hits.map((h) => (
                  <Link
                    key={h.code}
                    to="/stock/$code"
                    params={{ code: h.code }}
                    onClick={() => setQ("")}
                    className="flex items-center justify-between px-3 py-2 text-sm hover:bg-surface-2"
                  >
                    <span>
                      {h.name} <span className="text-muted">{h.code}</span>
                    </span>
                    <Chg pct={h.quote?.pct} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex min-w-0 gap-4 overflow-x-auto border-t border-border px-4 py-1.5 text-xs">
          <span className={cn("shrink-0 tabular", live ? "text-steel" : "text-warn")}>
            {loading ? "同步中" : live ? "公开快照" : "研究快照"}
          </span>
          {indices.map((i) => (
            <span key={i.symbol} className="flex shrink-0 items-center gap-2 text-muted">
              {i.name}
              <span className="tabular text-fg">{i.quote ? i.quote.price.toFixed(2) : "—"}</span>
              <Chg pct={i.quote?.pct} />
            </span>
          ))}
        </div>
        <nav className="flex min-w-0 gap-1 overflow-x-auto border-t border-border px-2 py-1 lg:hidden">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "flex h-11 shrink-0 items-center rounded-sm px-3 text-sm",
                pathname === n.to ? "bg-surface-2 text-fg" : "text-muted",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
      <footer className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-lg border border-border bg-bg-elevated px-4 py-3">
          <Disclaimer />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-subtle">
            <span>模型 {MODEL_VERSION}</span>
            <Button variant="ghost" size="sm" className="h-8" asChild>
              <Link to="/plan">中长期规划</Link>
            </Button>
            <Button variant="ghost" size="sm" className="h-8" asChild>
              <Link to="/method">查看方法说明</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
