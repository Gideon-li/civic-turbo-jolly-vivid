import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { Chg, Score } from "@/components/chg";
import { Disclaimer } from "@/components/disclaimer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { stageTone } from "@/components/stock-table";
import { countFilters, StockTags } from "@/components/stock-tags";
import { MODEL_VERSION } from "@/lib/research/types";
import type { ScoredStock } from "@/lib/research/types";
import { NEWS } from "@/lib/research/news";
import { dirTone, IMPACTS, PILLARS } from "@/lib/research/plan";
import { useMarket } from "@/lib/market-store";
import { fmtNum } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { stocks, state, month, yearCore, breadthUp, loading, live } = useMarket();
  const movers = [...stocks].sort((a, b) => Math.abs(b.scoreDay - 50) - Math.abs(a.scoreDay - 50)).slice(0, 6);
  const topDay = [...stocks].sort((a, b) => b.scoreDay - a.scoreDay).slice(0, 8);
  const counts = useMemo(() => countFilters(stocks), [stocks]);

  return (
    <div className="grid gap-6">
      <section className="grid gap-3">
        <p className="text-xs tracking-[0.2em] text-steel uppercase">Personal research desk</p>
        <h1 className="max-w-3xl text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
          把行情、财务、新闻与技术指标，变成可拆解的每日权重和月年观察池
        </h1>
        <Disclaimer />
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/pool/month">本月研究观察池</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/plan">五年 / 十年规划</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/method">方法与回测假设</Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {(["沪深", "科创板", "创业板", "港股", "新能源"] as const).map((f) => (
          <Link
            key={f}
            to="/quotes"
            className="rounded-lg border border-border bg-bg-elevated px-3 py-3 hover:border-steel/40"
          >
            <div className="text-xs text-muted">{f}</div>
            <div className="tabular text-lg text-fg">{counts[f] ?? 0}</div>
          </Link>
        ))}
        <Link to="/quotes" className="rounded-lg border border-border bg-bg-elevated px-3 py-3 hover:border-steel/40">
          <div className="text-xs text-muted">全部样本</div>
          <div className="tabular text-lg text-fg">{stocks.length}</div>
        </Link>
      </section>

      <section className="rounded-lg border border-border bg-bg-elevated p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-base font-medium">五年 / 十年规划</h2>
          <Link to="/plan" className="inline-flex items-center gap-1 text-sm text-steel">
            对照表 <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <p className="text-sm text-muted">
          十五五（2026–2030）铺产业与科技，2035 看基本实现现代化。下面是研究宇宙里政策方向偏受益的行业。
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.id} className="rounded-md bg-surface p-3">
              <div className="text-sm text-fg">{p.title}</div>
              <p className="mt-1 line-clamp-2 text-xs text-muted">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {IMPACTS.filter((i) => i.y5.dir === "受益").map((i) => (
            <Link key={i.industry} to="/plan" className="hover:opacity-90">
              <Badge tone={dirTone(i.y5.dir)}>
                {i.industry} · {i.theme}
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-bg-elevated p-5 md:col-span-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-medium">市场状态仪</h2>
            <Badge tone={state.tone === "up" ? "up" : state.tone === "down" ? "down" : "steel"}>{state.label}</Badge>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{state.note}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <Stat k="风格" v={state.style} />
            <Stat k="拥挤" v={state.crowd} />
            <Stat k="上沿外" v={`${state.overBand}`} />
            <Stat k="下沿外" v={`${state.underBand}`} />
            <Stat k="上涨占比" v={loading ? "—" : `${Math.round(breadthUp * 100)}%`} />
            <Stat k="行情" v={live ? "公开快照" : "研究样本"} />
          </dl>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-4">
            <Weight label="wT 技术" v={state.wT} />
            <Weight label="wN 事件" v={state.wN} />
            <Weight label="wF 质量" v={state.wF} />
            <Weight label="wP 规划" v={state.wP} />
          </div>
          <p className="mt-3 text-xs text-subtle">
            模型 {MODEL_VERSION} · 现价偏离预期区间时，当日权重在线调整；月年结构不跟风改
          </p>
        </div>
        <div className="rounded-lg border border-border bg-bg-elevated p-5">
          <h2 className="text-base font-medium">今日评分张力</h2>
          <ul className="mt-3 grid gap-2">
            {movers.map((s) => (
              <li key={s.code}>
                <Link to="/stock/$code" params={{ code: s.code }} className="flex items-center justify-between gap-2 rounded-md px-1 py-1 hover:bg-surface-2">
                  <span className="truncate text-sm">{s.name}</span>
                  <span className="flex items-center gap-2">
                    <Chg pct={s.quote?.pct} />
                    <Score n={s.scoreDay} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PoolCard title="月度观察池" to="/pool/month" rows={month.slice(0, 6)} score="scoreMonth" />
        <PoolCard title="年度观察池" to="/pool/year" rows={yearCore.slice(0, 6)} score="scoreYear" />
      </section>

      <section className="rounded-lg border border-border bg-bg-elevated p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-medium">日评分前列</h2>
          <Link to="/rank" className="text-sm text-steel hover:underline">
            全部
          </Link>
        </div>
        <div className="grid gap-2">
          {topDay.map((s, i) => (
            <Link
              key={s.code}
              to="/stock/$code"
              params={{ code: s.code }}
              className="flex items-center gap-3 rounded-md border border-transparent px-2 py-2 hover:border-border hover:bg-surface"
            >
              <span className="w-6 tabular text-subtle">{i + 1}</span>
              <span className="flex-1 truncate text-sm">
                {s.name} <span className="text-muted">{s.code}</span>
              </span>
              <StockTags board={s.board} code={s.code} className="hidden sm:inline-flex" />
              <Badge tone={stageTone(s.stage)}>{s.stage}</Badge>
              <Chg pct={s.quote?.pct} />
              <Score n={s.scoreDay} />
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-medium">新闻与事件</h2>
          <Link to="/news" className="text-sm text-steel hover:underline">
            全部
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {NEWS.slice(0, 4).map((n) => (
            <article key={n.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-center gap-2 text-xs text-muted">
                <span>{n.time}</span>
                <span>{n.source}</span>
                {n.spaceFlag && <Badge tone="warn">空间假设</Badge>}
              </div>
              <h3 className="mt-2 text-sm font-medium">{n.title}</h3>
              <p className="mt-1 text-sm text-muted">{n.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-xs text-subtle">{k}</dt>
      <dd className="mt-0.5 text-fg">{v}</dd>
    </div>
  );
}

function Weight({ label, v }: { label: string; v: number }) {
  return (
    <div className="rounded-md bg-surface p-2">
      <div className="text-subtle">{label}</div>
      <div className="tabular text-sm text-fg">{fmtNum(v, 2)}</div>
    </div>
  );
}

function PoolCard({
  title,
  to,
  rows,
  score,
}: {
  title: string;
  to: "/pool/month" | "/pool/year";
  rows: ScoredStock[];
  score: "scoreMonth" | "scoreYear";
}) {
  return (
    <div className="rounded-lg border border-border bg-bg-elevated p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-medium">{title}</h2>
        <Link to={to} className="inline-flex items-center gap-1 text-sm text-steel">
          查看 <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <ul className="grid gap-2">
        {rows.map((s) => (
          <li key={s.code}>
            <Link to="/stock/$code" params={{ code: s.code }} className="flex items-center justify-between rounded-md py-1 hover:bg-surface-2">
              <span className="text-sm">
                {s.name} <span className="text-muted">{s.code}</span>
              </span>
              <span className="flex items-center gap-2">
                <StockTags board={s.board} code={s.code} className="hidden md:inline-flex" />
                <Badge tone={stageTone(s.stage)}>{s.stage}</Badge>
                <Score n={s[score]} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
