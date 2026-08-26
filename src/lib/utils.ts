import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function fmtNum(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("zh-CN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function fmtPx(n: number) {
  if (!Number.isFinite(n)) return "—";
  const digits = Math.abs(n) >= 100 ? 2 : Math.abs(n) >= 10 ? 2 : 3;
  return n.toLocaleString("zh-CN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function fmtYi(n: number) {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 10000) return `${fmtNum(n / 10000, 2)} 万亿`;
  return `${fmtNum(n, 0)} 亿`;
}

export function fmtPct(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(digits)}%`;
}

export function fmtVol(hands: number) {
  if (!Number.isFinite(hands)) return "—";
  // Tencent stock volume is in 手
  const shares = hands * 100;
  if (shares >= 1e8) return `${(shares / 1e8).toFixed(2)} 亿`;
  if (shares >= 1e4) return `${(shares / 1e4).toFixed(0)} 万`;
  return `${shares.toFixed(0)}`;
}
