import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "neutral",
  children,
}: {
  className?: string;
  tone?: "neutral" | "up" | "down" | "steel" | "warn";
  children: ReactNode;
}) {
  const tones = {
    neutral: "bg-surface-2 text-muted border-border",
    up: "bg-up/12 text-up border-up/20",
    down: "bg-down/12 text-down border-down/20",
    steel: "bg-steel/12 text-steel border-steel/20",
    warn: "bg-warn/12 text-warn border-warn/25",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
