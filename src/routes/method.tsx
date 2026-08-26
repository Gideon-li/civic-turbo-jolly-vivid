import { createFileRoute } from "@tanstack/react-router";
import { Disclaimer } from "@/components/disclaimer";
import { MODEL_VERSION } from "@/lib/research/types";

export const Route = createFileRoute("/method")({ component: MethodPage });

function MethodPage() {
  return (
    <article className="grid max-w-3xl gap-6 text-sm leading-relaxed text-muted">
      <header className="grid gap-2 text-fg">
        <h1 className="text-2xl font-medium tracking-tight">方法说明</h1>
        <p className="text-muted">模型 {MODEL_VERSION}。同一版本 + 同一数据切片应得到同一观察池。</p>
      </header>
      <Disclaimer />
      <section className="grid gap-2">
        <h2 className="text-lg text-fg">五层结构</h2>
        <p>L1 技术 T：均线、动量、ADX、RSI、换手拥挤、当日涨跌。L2 事件 N：公告优先于评论。L3 质量 F：收入/利润增速、ROE、现金流、成长阶段。L4 空间 S：行业天花板、弹性、兑现、估值。L5 规划 P：十五五（五年）与 2035（十年）行业方向，受益 / 中性 / 约束映射为 78 / 50 / 26。</p>
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg text-fg">每日权重与偏离训练</h2>
        <p>基准：趋势市提高 wT、wN；震荡与回撤提高 wF；规划 wP 常驻约 0.08。行情刷新时统计样本相对日预期上/下沿的偏离：超过约 22% 升破上沿则下调 wT、上调 wF 与 wP；跌破下沿则降低动量、提高质量。单票再做一次局部缩放。这是规则化在线调整，不是神经网络拟合。</p>
        <p>日评分 Score_day = wT×T + wN×N + wF×F_short + wP×P_day。F_short 只用近季变化。</p>
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg text-fg">预期高低价</h2>
        <p>日区间：年化波动 / √252，叠加规划与质量漂移，并裁剪到涨跌停。月区间约 21 个交易日，年区间按对数波动。现价在带外会改当日权重，不自动改写年度空间假设。高低价是研究观察带，不是目标价。</p>
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg text-fg">月度 / 年度</h2>
        <p>月度：0.12×T20 + 0.12×N20 + 0.30×F + 0.28×S + 0.18×P₅。年度：0.08×趋势稳定性 + 0.32×F + 0.38×S + 0.22×P₁₀。规划十年偏约束的行业默认不进年度核心。</p>
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg text-fg">成长阶段</h2>
        <p>导入培育、加速成长、稳健成长、成熟现金、衰退出清。一年内不应频繁跳标签。成熟现金与衰退默认不作为成长空间推荐。</p>
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg text-fg">回测假设</h2>
        <p>样本为衡砚研究宇宙，非全市场。月度组合月频调仓，年度季频复核。成本按印花税、佣金与简化冲击近似扣除。财务按研究快照对齐，演示环境未做完整披露日对齐。过往回测不代表未来表现。</p>
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg text-fg">中长期规划</h2>
        <p>十五五与 2035 进入 P 因子：日评分用偏五年的 P_day，月度用 P₅，年度用 P₁₀。规划页是文字对照，评分层才改变排序。</p>
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg text-fg">数据</h2>
        <p>行情快照与日 K 来自腾讯财经公开接口，失败时回退到研究样本。财务、阶段、新闻事件为研究层标注，用于解释评分，不是交易所官方数据库。生产环境应换成授权数据源。</p>
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg text-fg">合规</h2>
        <p>未取得证券投资咨询资质前，本台只提供数据、指标、回测与研究排序。禁止具体买卖价位、收益承诺、按荐股收费。个人备忘只存在你的浏览器里。</p>
      </section>
    </article>
  );
}
