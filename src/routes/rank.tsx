import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { StockTable } from "@/components/stock-table";
import { countFilters, TagFilter } from "@/components/stock-tags";
import { Disclaimer } from "@/components/disclaimer";
import { useMarket } from "@/lib/market-store";
import { MODEL_VERSION } from "@/lib/research/types";
import { Badge } from "@/components/ui/badge";
import { matchesFilter, type MarketFilter } from "@/lib/research/tags";

export const Route = createFileRoute("/rank")({ component: RankPage });

function RankPage() {
  const stocks = useMarket((s) => s.stocks);
  const state = useMarket((s) => s.state);
  const [tag, setTag] = useState<MarketFilter>("全部");
  const counts = useMemo(() => countFilters(stocks), [stocks]);
  const ranked = [...stocks].filter((s) => matchesFilter(s, tag)).sort((a, b) => b.scoreDay - a.scoreDay);

  return (
    <div className="grid gap-4">
      <header className="grid gap-2">
        <h1 className="text-2xl font-medium tracking-tight">日评分</h1>
        <p className="text-sm text-muted">
          Score_day = {state.wT.toFixed(2)}×T + {state.wN.toFixed(2)}×N + {state.wF.toFixed(2)}×F_short + {state.wP.toFixed(2)}×P。
          现价偏离日预期区间时，单票与全市场权重都会下调技术、抬高质量。预期高低价是研究区间，不是推荐买点。
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge tone="steel">{state.label}</Badge>
          <Badge>{MODEL_VERSION}</Badge>
          <Badge tone="warn">高波动噪声</Badge>
        </div>
      </header>
      <TagFilter value={tag} onChange={setTag} counts={counts} />
      <StockTable rows={ranked} scoreKey="scoreDay" />
      <Disclaimer />
    </div>
  );
}
