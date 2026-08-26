import { createFileRoute, Link } from "@tanstack/react-router";
import { NavChart } from "@/components/charts/nav-chart";
import { Disclaimer } from "@/components/disclaimer";
import { StockTable } from "@/components/stock-table";
import { useMarket } from "@/lib/market-store";
import { MODEL_VERSION } from "@/lib/research/types";

export const Route = createFileRoute("/pool/month")({ component: MonthPool });

function MonthPool() {
  const month = useMarket((s) => s.month);
  return (
    <div className="grid gap-5">
      <header className="grid gap-2">
        <p className="text-xs text-steel">研究观察池 · 不构成投资建议</p>
        <h1 className="text-2xl font-medium tracking-tight">月度观察池</h1>
        <p className="max-w-2xl text-sm text-muted">
          硬条件：加速或稳健成长，空间与规划分不低于阈值。综合分 0.12×T20 + 0.12×N20 + 0.30×F + 0.28×S + 0.18×P₅。升破日预期上沿会降权，避免把冲高送进月度池。行业上限 25%。
        </p>
        <p className="text-xs text-subtle">
          {MODEL_VERSION} · {month.length} 只 ·{" "}
          <Link to="/pool/year" className="text-steel">
            年度池
          </Link>
        </p>
      </header>
      <NavChart kind="month" />
      <StockTable rows={month} scoreKey="scoreMonth" />
      <Disclaimer />
    </div>
  );
}
