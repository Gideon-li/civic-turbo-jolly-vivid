import { cn, fmtPct, fmtPx } from "@/lib/utils";

export function Chg({ pct, className }: { pct?: number; className?: string }) {
  if (pct === undefined || !Number.isFinite(pct)) {
    return <span className={cn("tabular text-muted", className)}>—</span>;
  }
  const tone = pct > 0 ? "text-up" : pct < 0 ? "text-down" : "text-muted";
  return <span className={cn("tabular font-medium", tone, className)}>{fmtPct(pct)}</span>;
}

export function Px({ n, className }: { n?: number; className?: string }) {
  if (n === undefined || !Number.isFinite(n)) {
    return <span className={cn("tabular text-muted", className)}>—</span>;
  }
  return <span className={cn("tabular", className)}>{fmtPx(n)}</span>;
}

export function Score({ n, className }: { n: number; className?: string }) {
  const tone = n >= 72 ? "text-steel" : n >= 55 ? "text-fg" : "text-muted";
  return <span className={cn("tabular font-medium", tone, className)}>{n.toFixed(1)}</span>;
}
