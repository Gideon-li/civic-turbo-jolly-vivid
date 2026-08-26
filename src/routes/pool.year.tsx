import { createFileRoute, Link } from "@tanstack/react-router";
import { NavChart } from "@/components/charts/nav-chart";
import { Disclaimer } from "@/components/disclaimer";
import { StockTable } from "@/components/stock-table";
import { useMarket } from "@/lib/market-store";
import { MODEL_VERSION } from "@/lib/research/types";

export const Route = createFileRoute("/pool/year")({ component: YearPool });

function YearPool() {
  const yearCore = useMarket((s) => s.yearCore);
  const yearWatch = useMarket((s) => s.yearWatch);
  return (
    <div className="grid gap-5">
      <header className="grid gap-2">
        <p className="text-xs text-steel">研究观察池 · 不构成投资建议</p>
        <h1 className="text-2xl font-medium tracking-tight">年度观察池</h1>
        <p className="max-w-2xl text-sm text-muted">
          Score_year = 0.08×趋势稳定性 + 0.32×F + 0.38×S + 0.22×P₁₀。规划十年为「约束」的行业默认不进核心。表内高低价为年度研究区间。PE 高分位只进「高预期观察」。
        </p>
        <p className="text-xs text-subtle">
          {MODEL_VERSION} · 核心 {yearCore.length} ·{" "}
          <Link to="/pool/month" className="text-steel">
            月度池
          </Link>
        </p>
      </header>
      <NavChart kind="year" />
      <h2 className="text-base font-medium">核心池</h2>
      <StockTable rows={yearCore} scoreKey="scoreYear" />
      <h2 className="text-base font-medium">高预期观察</h2>
      <p className="text-sm text-muted">空间叙事强但估值约束或利润兑现不足，不进入年度核心。</p>
      <StockTable rows={yearWatch} scoreKey="scoreYear" />
      <Disclaimer />
    </div>
  );
}
