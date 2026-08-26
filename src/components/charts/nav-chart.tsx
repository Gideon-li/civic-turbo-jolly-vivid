import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { buildNav, navStats } from "@/lib/research/backtest";
import { fmtPct } from "@/lib/utils";

export function NavChart({ kind }: { kind: "month" | "year" }) {
  const data = buildNav(kind);
  const st = navStats(data);
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="mb-3 flex flex-wrap gap-4 text-sm">
        <span className="text-muted">
          累计 <span className="tabular text-fg">{fmtPct(st.ret * 100)}</span>
        </span>
        <span className="text-muted">
          相对沪深300 <span className="tabular text-steel">{fmtPct(st.excess * 100)}</span>
        </span>
        <span className="text-muted">
          最大回撤 <span className="tabular text-up">{fmtPct(st.maxDd * 100)}</span>
        </span>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" tick={{ fill: "var(--color-subtle)", fontSize: 11 }} interval={3} />
            <YAxis tick={{ fill: "var(--color-subtle)", fontSize: 11 }} width={40} domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                background: "var(--color-bg-elevated)",
                border: "1px solid var(--color-border)",
                color: "var(--color-fg)",
                borderRadius: 8,
              }}
            />
            <Line type="monotone" dataKey="pool" stroke="var(--color-steel)" dot={false} strokeWidth={1.8} name="观察池" />
            <Line type="monotone" dataKey="hs300" stroke="var(--color-muted)" dot={false} strokeWidth={1.2} name="沪深300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-subtle">
        研究回测示意：在本样本宇宙上按月/年规则复权，已扣简化交易成本。不是实盘净值，也不是收益承诺。
      </p>
    </div>
  );
}
