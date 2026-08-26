import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { NEWS } from "@/lib/research/news";
import { findName } from "@/lib/research/universe";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/news")({ component: NewsPage });

function NewsPage() {
  const [kind, setKind] = useState("全部");
  const kinds = ["全部", "公告", "政策", "公司", "宏观", "市场"];
  const rows = NEWS.filter((n) => kind === "全部" || n.kind === kind);
  return (
    <div className="grid gap-4">
      <header>
        <h1 className="text-2xl font-medium tracking-tight">新闻与事件</h1>
        <p className="mt-1 text-sm text-muted">公告权重大于评论。标记「空间假设」的事件会进入中长期评分，而不是只抬日评分。</p>
      </header>
      <div className="flex flex-wrap gap-2">
        {kinds.map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`h-9 rounded-full border px-3 text-sm ${kind === k ? "border-steel bg-surface-2 text-fg" : "border-border text-muted"}`}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="grid gap-3">
        {rows.map((n) => (
          <article key={n.id} className="rounded-lg border border-border bg-bg-elevated p-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="tabular">{n.time}</span>
              <span>{n.source}</span>
              <Badge>{n.kind}</Badge>
              <Badge tone={n.sentiment >= 0 ? "up" : "down"}>{n.sentiment >= 0 ? "+" : ""}{n.sentiment}</Badge>
              {n.spaceFlag && <Badge tone="warn">空间假设</Badge>}
              <span>{n.impact}</span>
            </div>
            <h2 className="mt-2 text-base font-medium">{n.title}</h2>
            <p className="mt-1 text-sm text-muted">{n.summary}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {n.codes.map((c) => {
                const name = findName(c);
                return (
                  <Link key={c} to="/stock/$code" params={{ code: c }} className="text-sm text-steel hover:underline">
                    {name?.name ?? c}
                  </Link>
                );
              })}
            </div>
          </article>
        ))}
      </div>
      <Disclaimer compact />
    </div>
  );
}
