import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { StockTable } from "@/components/stock-table";
import { countFilters, TagFilter } from "@/components/stock-tags";
import { Disclaimer } from "@/components/disclaimer";
import { useMarket } from "@/lib/market-store";
import { matchesFilter, tagsOf, type MarketFilter } from "@/lib/research/tags";

export const Route = createFileRoute("/quotes")({ component: QuotesPage });

function QuotesPage() {
  const stocks = useMarket((s) => s.stocks);
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<MarketFilter>("全部");
  const counts = useMemo(() => countFilters(stocks), [stocks]);
  const rows = stocks.filter((s) => {
    const needle = q.trim();
    const hit =
      !needle ||
      s.name.includes(needle) ||
      s.code.includes(needle) ||
      s.industry.includes(needle) ||
      tagsOf(s).some((t) => t.includes(needle));
    return hit && matchesFilter(s, tag);
  });

  return (
    <div className="grid gap-4">
      <header>
        <h1 className="text-2xl font-medium tracking-tight">行情</h1>
        <p className="mt-1 text-sm text-muted">
          按市场与主题筛选。沪深=上证/深市主板；科创板、创业板、港股单独标注；新能源为车电锂电光伏链条。
        </p>
      </header>
      <TagFilter value={tag} onChange={setTag} counts={counts} />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="名称 / 代码 / 科创板 / 新能源 / 港股"
        className="h-10 w-full rounded-md border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-steel/40"
      />
      <StockTable rows={rows} />
      <Disclaimer compact />
    </div>
  );
}
