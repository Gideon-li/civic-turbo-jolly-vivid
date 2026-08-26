import { Badge } from "@/components/ui/badge";
import { displayTags, MARKET_FILTERS, matchesFilter, tagTone, type MarketFilter } from "@/lib/research/tags";
import type { Board } from "@/lib/research/types";
import { cn } from "@/lib/utils";

export function StockTags({
  board,
  code,
  className,
}: {
  board: Board;
  code: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-wrap gap-1", className)}>
      {displayTags({ board, code }).map((t) => (
        <Badge key={t} tone={tagTone(t)}>
          {t}
        </Badge>
      ))}
    </span>
  );
}

export function TagFilter({
  value,
  onChange,
  counts,
}: {
  value: MarketFilter;
  onChange: (v: MarketFilter) => void;
  counts: Partial<Record<MarketFilter, number>>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {MARKET_FILTERS.map((f) => (
        <button
          key={f}
          type="button"
          onClick={() => onChange(f)}
          className={cn(
            "inline-flex h-10 items-center gap-1.5 rounded-full border px-3 text-sm",
            value === f ? "border-steel bg-surface-2 text-fg" : "border-border text-muted hover:text-fg",
          )}
        >
          {f}
          {typeof counts[f] === "number" && (
            <span className="tabular text-xs text-subtle">{counts[f]}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function countFilters<T extends { board: Board; code: string; name: string; industry: string }>(rows: T[]) {
  const counts: Partial<Record<MarketFilter, number>> = { 全部: rows.length };
  for (const f of MARKET_FILTERS) {
    if (f === "全部") continue;
    counts[f] = rows.filter((s) => matchesFilter(s, f)).length;
  }
  return counts;
}
