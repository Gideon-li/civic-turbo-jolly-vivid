import { cn } from "@/lib/utils";

export function Disclaimer({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <p className={cn("text-xs leading-relaxed text-subtle", className)}>
      {compact
        ? "市场有风险。评分与观察池是研究辅助，不构成投资建议；过往回测不代表未来表现。"
        : "衡砚是个人研究台，不是持牌证券投资咨询。评分由技术、事件、质量、空间与规划五层因子合成。预期高低价是波动率推算的研究区间，不是目标价、买卖指令或收益承诺。市场有风险，决策请独立完成。"}
    </p>
  );
}
