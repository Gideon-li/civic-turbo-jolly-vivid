import type { ScoredStock } from "@/lib/research/types";
import { cn } from "@/lib/utils";

const LAYERS = [
  { key: "t", label: "T 技术", sub: "价量趋势与拥挤" },
  { key: "n", label: "N 事件", sub: "新闻与公告冲击" },
  { key: "f", label: "F 质量", sub: "财务与成长阶段" },
  { key: "s", label: "S 空间", sub: "中长期天花板" },
  { key: "p", label: "P 规划", sub: "十五五 / 2035" },
] as const;

export function ScoreBars({ s }: { s: ScoredStock }) {
  return (
    <div className="grid gap-3">
      {LAYERS.map((l) => {
        const v = s[l.key];
        return (
          <div key={l.key}>
            <div className="mb-1 flex items-baseline justify-between text-sm">
              <span>
                {l.label}
                <span className="ml-2 text-xs text-muted">{l.sub}</span>
              </span>
              <span className="tabular text-fg">{v.toFixed(1)}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div
                className={cn("h-full rounded-full bg-steel")}
                style={{ width: `${v}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
