import { useEffect, useState } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchKlines } from "@/lib/research/quotes";
import type { Bar as KBar } from "@/lib/research/types";

function ma(bars: KBar[], n: number) {
  return bars.map((_, i) => {
    if (i < n - 1) return undefined;
    let s = 0;
    for (let k = 0; k < n; k++) s += bars[i - k].close;
    return s / n;
  });
}

export function PriceChart({ symbol }: { symbol: string }) {
  const [bars, setBars] = useState<KBar[]>([]);
  const [err, setErr] = useState<string>();

  useEffect(() => {
    let alive = true;
    void fetchKlines({ data: { symbol } }).then((r) => {
      if (!alive) return;
      setBars(r.bars);
      if (!r.ok) setErr(r.error);
    });
    return () => {
      alive = false;
    };
  }, [symbol]);

  if (!bars.length) {
    return (
      <div className="grid h-64 place-items-center rounded-lg border border-border bg-surface text-sm text-muted">
        {err ?? "K线加载中"}
      </div>
    );
  }

  const m20 = ma(bars, 20);
  const m60 = ma(bars, 60);
  const data = bars.map((b, i) => ({
    date: b.date.slice(5),
    close: b.close,
    vol: b.volume,
    ma20: m20[i],
    ma60: m60[i],
  }));

  return (
    <div className="h-72 rounded-lg border border-border bg-surface p-2">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: "var(--color-subtle)", fontSize: 11 }} interval={18} />
          <YAxis
            yAxisId="p"
            domain={["auto", "auto"]}
            tick={{ fill: "var(--color-subtle)", fontSize: 11 }}
            width={52}
          />
          <YAxis yAxisId="v" orientation="right" hide />
          <Tooltip
            contentStyle={{
              background: "var(--color-bg-elevated)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              color: "var(--color-fg)",
            }}
          />
          <Bar yAxisId="v" dataKey="vol" fill="var(--color-border-strong)" opacity={0.45} />
          <Area
            yAxisId="p"
            type="monotone"
            dataKey="close"
            stroke="var(--color-steel)"
            fill="color-mix(in oklab, var(--color-steel) 16%, transparent)"
            strokeWidth={1.6}
          />
          <Line yAxisId="p" type="monotone" dataKey="ma20" stroke="var(--color-warn)" dot={false} strokeWidth={1} />
          <Line yAxisId="p" type="monotone" dataKey="ma60" stroke="var(--color-muted)" dot={false} strokeWidth={1} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
