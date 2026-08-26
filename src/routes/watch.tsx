import { createFileRoute, Link } from "@tanstack/react-router";
import { Disclaimer } from "@/components/disclaimer";
import { StockTable } from "@/components/stock-table";
import { useMarket } from "@/lib/market-store";
import { useWatchlist } from "@/lib/watchlist";

export const Route = createFileRoute("/watch")({ component: WatchPage });

function WatchPage() {
  const codes = useWatchlist((s) => s.codes);
  const stocks = useMarket((s) => s.stocks);
  const month = useMarket((s) => s.month);
  const yearCore = useMarket((s) => s.yearCore);
  const rows = stocks.filter((s) => codes.includes(s.code));
  const inMonth = rows.filter((s) => month.some((m) => m.code === s.code)).length;
  const inYear = rows.filter((s) => yearCore.some((m) => m.code === s.code)).length;

  return (
    <div className="grid gap-4">
      <header>
        <h1 className="text-2xl font-medium tracking-tight">自选对照</h1>
        <p className="mt-1 text-sm text-muted">保存在本机。看评分漂移、是否仍在月年池，而不是跟单。</p>
      </header>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="text-xs text-subtle">自选</div>
          <div className="tabular text-xl">{rows.length}</div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="text-xs text-subtle">仍在月度池</div>
          <div className="tabular text-xl">{inMonth}</div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="text-xs text-subtle">仍在年度核心</div>
          <div className="tabular text-xl">{inYear}</div>
        </div>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-muted">
          还没有自选。去{" "}
          <Link to="/quotes" className="text-steel">
            行情
          </Link>{" "}
          点星号加入。
        </p>
      ) : (
        <StockTable rows={rows} />
      )}
      <Disclaimer compact />
    </div>
  );
}
