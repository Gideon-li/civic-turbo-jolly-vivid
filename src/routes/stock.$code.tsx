import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { PriceChart } from "@/components/charts/price-chart";
import { Chg, Px, Score } from "@/components/chg";
import { Disclaimer } from "@/components/disclaimer";
import { ExpectPanel } from "@/components/expect-band";
import { ScoreBars } from "@/components/score-bars";
import { Badge } from "@/components/ui/badge";
import { stageTone } from "@/components/stock-table";
import { StockTags } from "@/components/stock-tags";
import { useMarket } from "@/lib/market-store";
import { newsFor } from "@/lib/research/news";
import { dirTone, impactForIndustry } from "@/lib/research/plan";
import { MODEL_VERSION } from "@/lib/research/types";
import { useWatchlist } from "@/lib/watchlist";
import { cn, fmtNum, fmtPct, fmtYi } from "@/lib/utils";

export const Route = createFileRoute("/stock/$code")({ component: StockPage });

function StockPage() {
  const { code } = Route.useParams();
  const stocks = useMarket((s) => s.stocks);
  const month = useMarket((s) => s.month);
  const yearCore = useMarket((s) => s.yearCore);
  const yearWatch = useMarket((s) => s.yearWatch);
  const s = stocks.find((x) => x.code === code);
  const toggle = useWatchlist((x) => x.toggle);
  const starred = useWatchlist((x) => x.codes.includes(code));
  const note = useWatchlist((x) => x.notes[code] ?? "");
  const setNote = useWatchlist((x) => x.setNote);
  const news = newsFor(code);

  if (!s) {
    return (
      <div className="grid gap-3">
        <h1 className="text-xl">未纳入研究宇宙</h1>
        <p className="text-sm text-muted">当前样本约四十只，用于演示四层评分与月年池规则。</p>
        <Link to="/quotes" className="text-steel">
          返回行情
        </Link>
      </div>
    );
  }

  const q = s.quote;
  const inMonth = month.some((m) => m.code === code);
  const inYear = yearCore.some((m) => m.code === code);
  const inWatch = yearWatch.some((m) => m.code === code);

  return (
    <div className="grid gap-6">
      <header className="flex min-w-0 flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h1 className="text-3xl font-medium tracking-tight">{s.name}</h1>
            <span className="tabular text-muted">{s.code}</span>
            <Badge tone={stageTone(s.stage)}>{s.stage}</Badge>
            <StockTags board={s.board} code={s.code} />
            {inMonth && <Badge tone="steel">月度池</Badge>}
            {inYear && <Badge tone="steel">年度核心</Badge>}
            {inWatch && <Badge tone="warn">高预期观察</Badge>}
          </div>
          <p className="mt-1 text-sm text-muted">
            {s.industry} · {s.board} · {s.business} · 实控人 {s.controller}
            {s.symbol.startsWith("hk") ? " · 报价港币" : ""}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl tabular">
            <Px n={q?.price} />
          </div>
          <Chg pct={q?.pct} className="text-lg" />
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => toggle(code)}
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-sm border px-3 text-sm",
            starred ? "border-steel bg-surface-2 text-steel" : "border-border text-muted",
          )}
        >
          <Star className={cn("size-4", starred && "fill-steel")} />
          {starred ? "已在自选" : "加入自选"}
        </button>
      </div>

      <section className="grid gap-3 rounded-lg border border-border bg-bg-elevated p-5">
        <h2 className="text-base font-medium">三句话结论</h2>
        <ol className="grid gap-2 text-sm text-muted">
          {s.thesis.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
        <p className="text-sm text-fg">{s.hint}</p>
        <Disclaimer compact />
      </section>

      <ExpectPanel s={s} />

      {impactForIndustry(s.industry) && (
        <PlanImpact industry={s.industry} />
      )}

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="grid gap-4 lg:col-span-3">
          <PriceChart symbol={s.symbol} />
          <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            <KV k="开盘" v={q ? fmtNum(q.open) : "—"} />
            <KV k="最高" v={q ? fmtNum(q.high) : "—"} />
            <KV k="最低" v={q ? fmtNum(q.low) : "—"} />
            <KV k="换手" v={q ? fmtPct(q.turnover) : "—"} />
            <KV k="PE" v={q && Number.isFinite(q.pe) ? fmtNum(q.pe) : "—"} />
            <KV k="PB" v={q && Number.isFinite(q.pb) ? fmtNum(q.pb) : "—"} />
            <KV k="总市值" v={fmtYi(q?.capYi ?? NaN)} />
            <KV
              k="成交额"
              v={
                q
                  ? s.symbol.startsWith("hk")
                    ? `${fmtNum(q.amountWan / 1e8, 2)} 亿港元`
                    : `${fmtNum(q.amountWan / 10000, 2)} 亿`
                  : "—"
              }
            />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4 lg:col-span-2">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-base font-medium">五层评分</h2>
            <span className="text-xs text-subtle">{MODEL_VERSION}</span>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-2 text-center">
            <Mini label="日评分" n={s.scoreDay} />
            <Mini label="月度" n={s.scoreMonth} />
            <Mini label="年度" n={s.scoreYear} />
          </div>
          <ScoreBars s={s} />
        </div>
      </div>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="text-base font-medium">财务快照</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <KV k="收入同比" v={fmtPct(s.revYoy)} />
            <KV k="净利同比" v={fmtPct(s.npYoy)} />
            <KV k="ROE" v={fmtPct(s.roe)} />
            <KV k="毛利率" v={s.grossMargin ? fmtPct(s.grossMargin) : "—"} />
            <KV k="经营现金流/净利" v={fmtNum(s.cfoToNp)} />
            <KV k="资本开支/收入" v={fmtPct(s.capexToRev)} />
            <KV k="PEG" v={fmtNum(s.peg)} />
            <KV k="PE 分位" v={`${s.pePercentile}`} />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="text-base font-medium">空间与风险</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <KV k="行业空间" v={String(s.industrySpace)} />
            <KV k="公司弹性" v={String(s.elasticity)} />
            <KV k="兑现能力" v={String(s.delivery)} />
            <KV k="估值拖累" v={String(s.valuationDrag)} />
          </div>
          <ul className="mt-3 list-disc pl-5 text-sm text-muted">
            {s.risks.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-4">
        <h2 className="text-base font-medium">因子贡献</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="text-xs text-muted">
              <tr>
                <th className="py-1 text-left font-medium">因子</th>
                <th className="py-1 text-left font-medium">层</th>
                <th className="py-1 text-right font-medium">取值</th>
                <th className="py-1 text-right font-medium">权重</th>
              </tr>
            </thead>
            <tbody>
              {s.factors.map((f) => (
                <tr key={f.key} className="border-t border-border">
                  <td className="py-1.5">{f.label}</td>
                  <td className="py-1.5 text-muted">{f.layer}</td>
                  <td className="py-1.5 text-right tabular">{fmtNum(f.value, 1)}</td>
                  <td className="py-1.5 text-right tabular">{fmtNum(f.weight, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-3">
        <h2 className="text-base font-medium">相关新闻</h2>
        {news.length === 0 && <p className="text-sm text-muted">近期样本中没有单独映射的事件。</p>}
        {news.map((n) => (
          <article key={n.id} className="rounded-md border border-border p-3">
            <div className="text-xs text-muted">
              {n.time} · {n.source}
            </div>
            <div className="mt-1 text-sm">{n.title}</div>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-border bg-bg-elevated p-4">
        <h2 className="text-base font-medium">个人备忘</h2>
        <p className="mt-1 text-xs text-subtle">只存在本机浏览器，不上传、不构成平台建议。</p>
        <textarea
          value={note}
          onChange={(e) => setNote(code, e.target.value)}
          rows={5}
          placeholder="记录你自己的交易假设、仓位纪律和证伪条件…"
          className="mt-3 w-full rounded-md border border-border bg-surface p-3 text-sm outline-none focus:ring-2 focus:ring-steel/40"
        />
      </section>
    </div>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-md bg-bg-elevated px-3 py-2">
      <div className="text-xs text-subtle">{k}</div>
      <div className="tabular text-fg">{v}</div>
    </div>
  );
}

function Mini({ label, n }: { label: string; n: number }) {
  return (
    <div className="rounded-md bg-bg-elevated py-2">
      <div className="text-xs text-subtle">{label}</div>
      <Score n={n} className="text-lg" />
    </div>
  );
}

function PlanImpact({ industry }: { industry: string }) {
  const row = impactForIndustry(industry);
  if (!row) return null;
  return (
    <section className="grid gap-3 rounded-lg border border-border bg-bg-elevated p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-medium">中长期规划对照</h2>
        <Link to="/plan" className="text-sm text-steel hover:underline">
          全部行业
        </Link>
      </div>
      <p className="text-sm text-muted">
        {row.industry} · {row.theme}。规划改的是空间假设，不自动改日评分。
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm">
            五年 2026–2030 <Badge tone={dirTone(row.y5.dir)}>{row.y5.dir}</Badge>
          </div>
          <p className="text-sm leading-relaxed text-muted">{row.y5.summary}</p>
        </div>
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm">
            十年至 2035 <Badge tone={dirTone(row.y10.dir)}>{row.y10.dir}</Badge>
          </div>
          <p className="text-sm leading-relaxed text-muted">{row.y10.summary}</p>
        </div>
      </div>
    </section>
  );
}

