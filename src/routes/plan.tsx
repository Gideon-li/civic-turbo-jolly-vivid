import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Disclaimer } from "@/components/disclaimer";
import { Badge } from "@/components/ui/badge";
import { useMarket } from "@/lib/market-store";
import {
  dirTone,
  GOALS_10Y,
  GOALS_5Y,
  HORIZONS,
  IMPACTS,
  PILLARS,
  PLAN_AS_OF,
  type Direction,
} from "@/lib/research/plan";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/plan")({ component: PlanPage });

function PlanPage() {
  const stocks = useMarket((s) => s.stocks);
  const [dir, setDir] = useState<Direction | "全部">("全部");
  const rows = IMPACTS.filter((i) => dir === "全部" || i.y5.dir === dir || i.y10.dir === dir);
  const byIndustry = useMemo(() => {
    const m = new Map<string, typeof stocks>();
    for (const s of stocks) {
      const arr = m.get(s.industry) ?? [];
      arr.push(s);
      m.set(s.industry, arr);
    }
    return m;
  }, [stocks]);

  return (
    <div className="grid gap-6">
      <header className="grid gap-3">
        <p className="text-xs tracking-[0.2em] text-steel uppercase">Policy map · {PLAN_AS_OF}</p>
        <h1 className="max-w-3xl text-2xl font-medium tracking-tight sm:text-3xl">中国中长期规划对照</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          把公开的五年规划与 2035 远景，映射到研究宇宙里的行业——只解释政策方向如何改空间假设，不代替财务兑现，也不是推荐。
        </p>
        <Disclaimer />
      </header>

      <ol className="grid gap-2 sm:grid-cols-3">
        {[
          { t: "2026", d: "十五五开局", n: "产业体系、科技、内需、绿色同时铺开" },
          { t: "2030", d: "五年节点", n: "非化石能源约 25%，数字与先进制造骨架成型" },
          { t: "2035", d: "十年远景", n: "基本实现社会主义现代化，人均 GDP 中等发达" },
        ].map((x) => (
          <li key={x.t} className="rounded-lg border border-border bg-bg-elevated p-4">
            <div className="tabular text-2xl text-steel">{x.t}</div>
            <div className="mt-1 text-sm text-fg">{x.d}</div>
            <p className="mt-1 text-sm text-muted">{x.n}</p>
          </li>
        ))}
      </ol>

      <section className="grid gap-4 lg:grid-cols-2">
        <HorizonCard
          title={HORIZONS.y5.title}
          years={HORIZONS.y5.years}
          lead={HORIZONS.y5.lead}
          source={HORIZONS.y5.source}
          goals={GOALS_5Y}
        />
        <HorizonCard
          title={HORIZONS.y10.title}
          years={HORIZONS.y10.years}
          lead={HORIZONS.y10.lead}
          source={HORIZONS.y10.source}
          goals={GOALS_10Y}
        />
      </section>

      <section className="grid gap-3">
        <h2 className="text-lg font-medium">六条主柱</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <article key={p.id} className="rounded-lg border border-border bg-surface p-4">
              <h3 className="text-sm font-medium text-fg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-medium">行业影响</h2>
            <p className="mt-1 text-sm text-muted">五年看兑现窗口，十年看空间是否还在。同一行业两列可以不一致。</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["全部", "受益", "中性", "约束"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDir(d)}
                className={cn(
                  "inline-flex h-10 items-center rounded-full border px-3 text-sm",
                  dir === d ? "border-steel bg-surface-2 text-fg" : "border-border text-muted hover:text-fg",
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {rows.map((row) => {
            const names = byIndustry.get(row.industry) ?? [];
            return (
              <article key={row.industry} className="rounded-lg border border-border bg-bg-elevated p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-medium">{row.industry}</h3>
                  <Badge>{row.theme}</Badge>
                  <Badge tone={dirTone(row.y5.dir)}>五年 {row.y5.dir}</Badge>
                  <Badge tone={dirTone(row.y10.dir)}>十年 {row.y10.dir}</Badge>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <ImpactCol title="2026–2030" block={row.y5} />
                  <ImpactCol title="至 2035" block={row.y10} />
                </div>
                {names.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-3">
                    {names.map((s) => (
                      <Link
                        key={s.code}
                        to="/stock/$code"
                        params={{ code: s.code }}
                        className="inline-flex h-9 items-center rounded-sm border border-border px-2.5 text-sm hover:border-steel/40 hover:text-steel"
                      >
                        {s.name}
                        <span className="ml-1.5 tabular text-xs text-muted">{s.code}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <p className="text-xs leading-relaxed text-subtle">
        文本依据公开纲要精神做研究映射，不是官方点名个股，也不构成投资建议。指标口径以正式公布文件为准；规划改变空间假设，财务与订单改变评分。
      </p>
    </div>
  );
}

function HorizonCard({
  title,
  years,
  lead,
  source,
  goals,
}: {
  title: string;
  years: string;
  lead: string;
  source: string;
  goals: { k: string; v: string }[];
}) {
  return (
    <article className="rounded-lg border border-border bg-bg-elevated p-5">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-lg font-medium">{title}</h2>
        <span className="tabular text-sm text-steel">{years}</span>
      </div>
      <p className="mt-2 text-sm text-muted">{lead}</p>
      <dl className="mt-4 grid gap-3">
        {goals.map((g) => (
          <div key={g.k} className="grid grid-cols-[4.5rem_1fr] gap-2 text-sm">
            <dt className="text-subtle">{g.k}</dt>
            <dd className="text-fg">{g.v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-subtle">{source}</p>
    </article>
  );
}

function ImpactCol({ title, block }: { title: string; block: { dir: Direction; summary: string; points: string[] } }) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2 text-sm text-fg">
        {title}
        <Badge tone={dirTone(block.dir)}>{block.dir}</Badge>
      </div>
      <p className="text-sm leading-relaxed text-muted">{block.summary}</p>
      <ul className="mt-2 grid gap-1 text-sm text-muted">
        {block.points.map((p) => (
          <li key={p} className="pl-3 before:mr-2 before:text-subtle before:content-['·']">
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
