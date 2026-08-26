import { Badge } from "@/components/ui/badge";
import { Px } from "@/components/chg";
import type { Band, BandSide, ExpectBands, ScoredStock } from "@/lib/research/types";
import { clamp, cn, fmtPx } from "@/lib/utils";

export function sideLabel(side: BandSide) {
  if (side === "above") return "上沿外";
  if (side === "below") return "下沿外";
  if (side === "inside") return "区间内";
  return "待行情";
}

export function sideTone(side: BandSide): "warn" | "steel" | "neutral" {
  if (side === "above" || side === "below") return "warn";
  if (side === "inside") return "steel";
  return "neutral";
}

export function bandOf(s: ScoredStock, horizon: "day" | "month" | "year"): Band | undefined {
  return s.bands?.[horizon];
}

export function sideOf(s: ScoredStock, horizon: "day" | "month" | "year"): BandSide {
  if (horizon === "month") return s.monthSide;
  if (horizon === "year") return s.yearSide;
  return s.daySide;
}

export function BandBar({
  band,
  px,
  label,
  side,
}: {
  band?: Band;
  px?: number;
  label: string;
  side: BandSide;
}) {
  if (!band || !Number.isFinite(band.low) || !Number.isFinite(band.high)) {
    return (
      <div className="rounded-md bg-surface p-3">
        <div className="text-xs text-subtle">{label}</div>
        <div className="mt-1 text-sm text-muted">待行情快照</div>
      </div>
    );
  }
  const span = Math.max(band.high - band.low, 1e-6);
  const marker = Number.isFinite(px) ? clamp((((px as number) - band.low) / span) * 100, -4, 104) : 50;
  return (
    <div className="rounded-md bg-surface p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs text-subtle">{label}</span>
        <Badge tone={sideTone(side)}>{sideLabel(side)}</Badge>
      </div>
      <div className="flex items-baseline justify-between text-sm tabular">
        <span className="text-down">{fmtPx(band.low)}</span>
        <Px n={px} className="text-base" />
        <span className="text-up">{fmtPx(band.high)}</span>
      </div>
      <div className="relative mt-2 h-1.5 overflow-visible rounded-full bg-surface-2">
        <div
          className={cn("absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full", side === "inside" ? "bg-steel" : "bg-warn")}
          style={{ left: `${marker}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-subtle">
        <span>预期最低</span>
        <span>现价</span>
        <span>预期最高</span>
      </div>
    </div>
  );
}

export function ExpectPanel({ s }: { s: ScoredStock }) {
  return (
    <section className="grid gap-3 rounded-lg border border-border bg-bg-elevated p-5">
      <div>
        <h2 className="text-base font-medium">研究预期区间</h2>
        <p className="mt-1 text-sm text-muted">
          由波动率、成长阶段、质量与规划因子推算的观察带，不是目标价或收益承诺。升破上沿会下调当日技术权重。
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <BandBar label="当日" band={s.bands?.day} px={s.quote?.price} side={s.daySide} />
        <BandBar label="月度" band={s.bands?.month} px={s.quote?.price} side={s.monthSide} />
        <BandBar label="年度" band={s.bands?.year} px={s.quote?.price} side={s.yearSide} />
      </div>
    </section>
  );
}

export function BandCell({ band, side }: { band?: Band; side: BandSide }) {
  if (!band) return <span className="text-muted">—</span>;
  return (
    <div className="text-right">
      <div className="tabular text-up">{fmtPx(band.high)}</div>
      <div className="tabular text-xs text-down">{fmtPx(band.low)}</div>
      <div className="text-[10px] text-subtle">{sideLabel(side)}</div>
    </div>
  );
}
