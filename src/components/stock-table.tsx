import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Chg, Px, Score } from "@/components/chg";
import { Badge } from "@/components/ui/badge";
import { BandCell } from "@/components/expect-band";
import { StockTags } from "@/components/stock-tags";
import { useWatchlist } from "@/lib/watchlist";
import type { ScoredStock } from "@/lib/research/types";
import { cn, fmtYi } from "@/lib/utils";

export function StockTable({
  rows,
  scoreKey = "scoreDay",
}: {
  rows: ScoredStock[];
  scoreKey?: "scoreDay" | "scoreMonth" | "scoreYear";
}) {
  const toggle = useWatchlist((s) => s.toggle);
  const codes = useWatchlist((s) => s.codes);
  const horizon = scoreKey === "scoreMonth" ? "month" : scoreKey === "scoreYear" ? "year" : "day";
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[980px] text-left text-sm">
        <thead className="bg-surface text-xs text-muted">
          <tr>
            <th className="px-3 py-2 font-medium"> </th>
            <th className="px-3 py-2 font-medium">证券</th>
            <th className="px-3 py-2 font-medium">市场 / 主题</th>
            <th className="px-3 py-2 font-medium">行业</th>
            <th className="px-3 py-2 font-medium">阶段</th>
            <th className="px-3 py-2 text-right font-medium">现价</th>
            <th className="px-3 py-2 text-right font-medium">涨跌</th>
            <th className="px-3 py-2 text-right font-medium">预期高 / 低</th>
            <th className="px-3 py-2 text-right font-medium">市值</th>
            <th className="px-3 py-2 text-right font-medium">T</th>
            <th className="px-3 py-2 text-right font-medium">N</th>
            <th className="px-3 py-2 text-right font-medium">F</th>
            <th className="px-3 py-2 text-right font-medium">S</th>
            <th className="px-3 py-2 text-right font-medium">P</th>
            <th className="px-3 py-2 text-right font-medium">综合</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.code} className="border-t border-border hover:bg-surface/80">
              <td className="px-2 py-2">
                <button
                  aria-label="自选"
                  onClick={() => toggle(r.code)}
                  className="grid size-10 place-items-center text-muted"
                >
                  <Star className={cn("size-4", codes.includes(r.code) && "fill-steel text-steel")} />
                </button>
              </td>
              <td className="px-3 py-2">
                <Link to="/stock/$code" params={{ code: r.code }} className="block hover:text-steel">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted tabular">
                    {r.code}
                    {r.symbol.startsWith("hk") ? " · HKD" : ""}
                  </div>
                </Link>
              </td>
              <td className="px-3 py-2">
                <StockTags board={r.board} code={r.code} />
              </td>
              <td className="px-3 py-2 text-muted">{r.industry}</td>
              <td className="px-3 py-2">
                <Badge tone={stageTone(r.stage)}>{r.stage}</Badge>
              </td>
              <td className="px-3 py-2 text-right">
                <Px n={r.quote?.price} />
              </td>
              <td className="px-3 py-2 text-right">
                <Chg pct={r.quote?.pct} />
              </td>
              <td className="px-3 py-2">
                <BandCell
                  band={horizon === "month" ? r.bands?.month : horizon === "year" ? r.bands?.year : r.bands?.day}
                  side={horizon === "month" ? r.monthSide : horizon === "year" ? r.yearSide : r.daySide}
                />
              </td>
              <td className="px-3 py-2 text-right text-muted tabular">{fmtYi(r.quote?.capYi ?? NaN)}</td>
              <td className="px-3 py-2 text-right">
                <Score n={r.t} />
              </td>
              <td className="px-3 py-2 text-right">
                <Score n={r.n} />
              </td>
              <td className="px-3 py-2 text-right">
                <Score n={r.f} />
              </td>
              <td className="px-3 py-2 text-right">
                <Score n={r.s} />
              </td>
              <td className="px-3 py-2 text-right">
                <Score n={r.p} />
              </td>
              <td className="px-3 py-2 text-right">
                <Score n={r[scoreKey]} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function stageTone(stage: string): "steel" | "neutral" | "warn" | "down" {
  if (stage === "加速成长") return "steel";
  if (stage === "稳健成长") return "neutral";
  if (stage === "导入培育") return "warn";
  return "down";
}
