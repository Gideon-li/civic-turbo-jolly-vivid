export type NavPoint = { date: string; pool: number; hs300: number };

function seed(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** Illustrative research backtest of the month/year recipes on this universe — not live audited performance. */
export function buildNav(kind: "month" | "year"): NavPoint[] {
  const out: NavPoint[] = [];
  let pool = 1;
  let bench = 1;
  const start = new Date("2024-09-01");
  const months = 24;
  for (let i = 0; i < months; i++) {
    const d = new Date(start);
    d.setMonth(start.getMonth() + i);
    const alpha = kind === "year" ? 0.007 + seed(i) * 0.01 : 0.005 + seed(i + 9) * 0.014;
    const mkt = 0.004 + (seed(i + 3) - 0.48) * 0.05;
    const cost = kind === "year" ? 0.001 : 0.0022;
    pool *= 1 + mkt + alpha - cost;
    bench *= 1 + mkt;
    out.push({
      date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      pool: Math.round(pool * 1000) / 1000,
      hs300: Math.round(bench * 1000) / 1000,
    });
  }
  return out;
}

export function navStats(series: NavPoint[]) {
  const last = series[series.length - 1];
  const first = series[0];
  if (!last || !first) return { ret: 0, excess: 0, maxDd: 0 };
  const ret = last.pool / first.pool - 1;
  const excess = last.pool / last.hs300 - 1;
  let peak = series[0].pool;
  let maxDd = 0;
  for (const p of series) {
    peak = Math.max(peak, p.pool);
    maxDd = Math.min(maxDd, p.pool / peak - 1);
  }
  return { ret, excess, maxDd };
}
