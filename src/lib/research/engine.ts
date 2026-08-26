import { clamp } from "@/lib/utils";
import { planScores } from "./plan";
import { UNIVERSE } from "./universe";
import type {
  Band,
  BandSide,
  ExpectBands,
  FactorRow,
  MarketState,
  NameCard,
  Quote,
  ScoredStock,
} from "./types";

function nz(n: number) {
  return Number.isFinite(n) ? n : 0;
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

function roundPx(n: number) {
  if (!Number.isFinite(n) || n <= 0) return NaN;
  const d = n >= 100 ? 100 : n >= 10 ? 100 : 1000;
  return Math.round(n * d) / d;
}

export function inferMarketState(indexPct: Record<string, number>, breadthUp: number): MarketState {
  const hs = nz(indexPct["sh000300"]);
  const cyb = nz(indexPct["sz399006"]);
  const kc = nz(indexPct["sh000688"]);
  const avg = (hs + cyb + kc) / 3;

  const base = {
    wP: 0.08,
    overBand: 0,
    underBand: 0,
  };

  if (avg >= 0.7 && breadthUp >= 0.55 && kc > hs) {
    return {
      label: "趋势偏多",
      tone: "up",
      style: "成长 / 科创占优",
      crowd: "中高",
      wT: 0.44,
      wN: 0.3,
      wF: 0.18,
      ...base,
      note: "指数共振向上且科创强于沪深300，日评分提高技术与事件权重；规划因子仍约束追高。",
    };
  }
  if (avg <= -0.8 || breadthUp < 0.38) {
    return {
      label: "拥挤回撤",
      tone: "down",
      style: "质量 / 低波",
      crowd: "回落",
      wT: 0.2,
      wN: 0.26,
      wF: 0.46,
      ...base,
      note: "市场转弱，日评分提高质量与规划；观察池只做风险剔除，不因反弹追高。",
    };
  }
  return {
    label: "震荡修复",
    tone: "flat",
    style: "大小盘均衡",
    crowd: "中性",
    wT: 0.28,
    wN: 0.23,
    wF: 0.41,
    ...base,
    note: "趋势未完全展开，日评分偏向质量与规划兑现；成长股需要基本面确认才进入月度池。",
  };
}

function stageBonus(stage: NameCard["stage"]) {
  switch (stage) {
    case "加速成长":
      return 18;
    case "稳健成长":
      return 12;
    case "导入培育":
      return 4;
    case "成熟现金":
      return -2;
    case "衰退出清":
      return -22;
  }
}

function layerT(s: NameCard, livePct: number) {
  const trend = (s.adx - 18) * 0.55 + s.mom20 * 1.15;
  const osc = (s.rsi - 50) * 0.22;
  const crowdPenalty = Math.abs(s.turnBias) * 7;
  const live = clamp(livePct * 3.2, -12, 12);
  return clamp(52 + trend + osc - crowdPenalty + live - Math.max(0, s.bias20) * 0.4, 6, 96);
}

function layerF(s: NameCard) {
  const growth = s.revYoy * 0.55 + s.npYoy * 0.35;
  const quality = (s.roe - 8) * 1.15 + (s.cfoToNp - 0.8) * 10;
  return clamp(38 + growth + quality + stageBonus(s.stage), 4, 96);
}

function layerFShort(s: NameCard) {
  return clamp(45 + s.npYoy * 0.5 + (s.revYoy - s.npYoy) * 0.15, 8, 92);
}

function layerS(s: NameCard) {
  const raw =
    s.industrySpace * 0.32 + s.elasticity * 0.26 + s.delivery * 0.26 + (100 - s.valuationDrag) * 0.16;
  const peHaircut = s.pePercentile >= 90 ? 0.84 : s.pePercentile >= 80 ? 0.92 : 1;
  return clamp(raw * peHaircut, 5, 96);
}

export function dayLimit(s: NameCard) {
  if (s.st) return 0.05;
  if (s.board === "创业板" || s.board === "科创板") return 0.2;
  if (s.board === "港股") return 0.12;
  return 0.1;
}

export function expectBands(s: NameCard, quote: Quote | undefined, p5: number, p10: number, f: number): ExpectBands | undefined {
  const px = quote?.price;
  const prev = quote?.prev;
  if (!px || !Number.isFinite(px) || px <= 0) return undefined;
  const vol = clamp(s.vol20, 12, 58) / 100;
  const lim = dayLimit(s);
  const ref = Number.isFinite(prev) && (prev as number) > 0 ? (prev as number) : px;
  const quality = (f - 50) / 50;
  const planM = (p5 - 50) / 50;
  const planY = (p10 - 50) / 50;

  const muDay = clamp(planM * 0.003 + quality * 0.002, -0.012, 0.016);
  const muMonth = clamp(planM * 0.045 + quality * 0.03 + s.mom20 / 100 * 0.12, -0.12, 0.2);
  let muYear = clamp(planY * 0.14 + quality * 0.1 + (s.revYoy / 100) * 0.22, -0.3, 0.55);
  if (s.stage === "加速成长") muYear += 0.04;
  if (s.stage === "衰退出清") muYear -= 0.12;
  if (s.stage === "成熟现金") muYear = Math.min(muYear, 0.12);

  const sigD = vol / Math.sqrt(252);
  const sigM = vol * Math.sqrt(21 / 252);
  const sigY = vol;

  const capHigh = ref * (1 + lim);
  const capLow = ref * (1 - lim);
  let dayHigh = Math.min(capHigh, ref * (1 + muDay + 1.15 * sigD));
  let dayLow = Math.max(capLow, ref * (1 + muDay - 1.15 * sigD));
  if (dayHigh <= dayLow) {
    dayHigh = Math.min(capHigh, ref * 1.012);
    dayLow = Math.max(capLow, ref * 0.988);
  }

  const monthMid = px * Math.exp(muMonth);
  const yearMid = px * Math.exp(muYear);
  let yearHigh = px * Math.exp(muYear + 1.05 * sigY);
  let yearLow = px * Math.exp(muYear - 1.15 * sigY);
  if (s.stage === "导入培育") yearHigh *= 1.06;
  if (s.stage === "衰退出清") yearHigh = Math.min(yearHigh, px * 1.18);

  const band = (low: number, high: number, mid: number): Band => ({
    low: roundPx(low),
    high: roundPx(high),
    mid: roundPx(mid),
  });

  return {
    day: band(dayLow, dayHigh, ref * (1 + muDay)),
    month: band(px * Math.exp(muMonth - 1.15 * sigM), px * Math.exp(muMonth + 1.15 * sigM), monthMid),
    year: band(yearLow, yearHigh, yearMid),
  };
}

export function bandSide(px: number | undefined, band?: Band): BandSide {
  if (!px || !band || !Number.isFinite(px) || !Number.isFinite(band.low) || !Number.isFinite(band.high)) return "na";
  if (px > band.high * 1.002) return "above";
  if (px < band.low * 0.998) return "below";
  return "inside";
}

function renormalize(w: { wT: number; wN: number; wF: number; wP: number }) {
  const t = Math.max(0.08, w.wT);
  const n = Math.max(0.08, w.wN);
  const f = Math.max(0.12, w.wF);
  const p = Math.max(0.05, w.wP);
  const s = t + n + f + p;
  return { wT: t / s, wN: n / s, wF: f / s, wP: p / s };
}

export function adaptWeights(base: MarketState, over: number, under: number, n: number): MarketState {
  const overRatio = n ? over / n : 0;
  const underRatio = n ? under / n : 0;
  let { wT, wN, wF, wP } = base;
  let note = base.note;
  if (overRatio >= 0.22) {
    wT -= 0.1;
    wN -= 0.03;
    wF += 0.06;
    wP += 0.07;
    note = `样本 ${over} 只升破日预期上沿，下调技术权重、上调质量与规划，抑制把涨停叙事送进月年池。`;
  } else if (underRatio >= 0.22) {
    wT -= 0.06;
    wN += 0.02;
    wF += 0.05;
    wP += 0.01;
    note = `样本 ${under} 只跌破日预期下沿，降低动量、提高质量。规划受益且质量高的，月度分不完全跟跌。`;
  } else if (over + under > 0) {
    note = `${base.note} 区间偏离 ${over} 上 / ${under} 下，权重小幅跟随，不改月年结构。`;
  }
  return { ...base, ...renormalize({ wT, wN, wF, wP }), overBand: over, underBand: under, note };
}

function localDayWeights(st: MarketState, side: BandSide) {
  let { wT, wN, wF, wP } = st;
  if (side === "above") {
    wT *= 0.8;
    wF *= 1.14;
    wP *= 1.1;
  } else if (side === "below") {
    wT *= 0.86;
    wN *= 1.06;
    wF *= 1.1;
  }
  return renormalize({ wT, wN, wF, wP });
}

function hint(s: NameCard, t: number, f: number, space: number, yearCore: boolean, side: BandSide) {
  if (s.veto) return `一票否决：${s.vetoReason ?? "风险项"}。不进入任何观察池。`;
  if (side === "above") return "现价升破日预期上沿，下调当日技术权重；月年结论仍看质量、空间与规划，不把冲高当加仓信号。";
  if (side === "below" && f >= 65) return "现价跌破日预期下沿，但质量仍在。短线降权，中长期观察池不因一日波动除名。";
  if (side === "below") return "现价跌破日预期下沿且质量一般，日评分与月度分同步降权。";
  if (s.stage === "衰退出清") return "成长阶段为出清，短线波动不改变中长期空间假设。";
  if (s.stage === "导入培育") return "仍处导入/培育，只进主题观察，不进年度核心池。";
  if (s.pePercentile >= 90) return "空间叙事强但估值分位过高，仅列入高预期观察。";
  if (yearCore && space >= 70 && f >= 65) return "质量、空间与规划同时靠前，优先看月年池解释，而不是日评分。";
  if (t >= 75 && f < 55) return "短线分偏高、基本面一般，警惕把热点送进中长期名单。";
  if (f >= 70 && t < 45) return "质量仍在，短线偏弱，更适合中长期对照而非追涨。";
  return "分数需拆开看：日评分描述噪声，月年池表达成长空间与规划因子。";
}

function factorsOf(
  s: NameCard,
  t: number,
  n: number,
  f: number,
  space: number,
  p5: number,
  p10: number,
  st: MarketState,
): FactorRow[] {
  return [
    { key: "mom20", label: "20日动量", layer: "T", value: s.mom20, weight: st.wT * 0.35 },
    { key: "adx", label: "ADX 趋势", layer: "T", value: s.adx, weight: st.wT * 0.25 },
    { key: "rsi", label: "RSI", layer: "T", value: s.rsi, weight: st.wT * 0.2 },
    { key: "turn", label: "换手拥挤", layer: "T", value: s.turnBias, weight: st.wT * 0.2 },
    { key: "news", label: "事件情绪", layer: "N", value: n, weight: st.wN },
    { key: "rev", label: "收入增速", layer: "F", value: s.revYoy, weight: 0.16 },
    { key: "np", label: "利润增速", layer: "F", value: s.npYoy, weight: 0.14 },
    { key: "roe", label: "ROE", layer: "F", value: s.roe, weight: 0.12 },
    { key: "space", label: "行业空间", layer: "S", value: s.industrySpace, weight: 0.16 },
    { key: "el", label: "公司弹性", layer: "S", value: s.elasticity, weight: 0.12 },
    { key: "del", label: "兑现能力", layer: "S", value: s.delivery, weight: 0.1 },
    { key: "plan5", label: "规划五年", layer: "P", value: p5, weight: 0.12 },
    { key: "plan10", label: "规划十年", layer: "P", value: p10, weight: 0.16 },
    { key: "tScore", label: "技术综合", layer: "T", value: t, weight: st.wT },
    { key: "fScore", label: "质量综合", layer: "F", value: f, weight: 0.3 },
    { key: "sScore", label: "空间综合", layer: "S", value: space, weight: 0.28 },
  ];
}

export function scoreOne(s: NameCard, quote: Quote | undefined, st: MarketState): ScoredStock {
  const livePct = quote?.pct ?? 0;
  const t = layerT(s, livePct);
  const t20 = clamp(t - livePct * 1.2 + s.mom20 * 0.4, 6, 96);
  const n = clamp(s.newsScore + (livePct > 3 ? 4 : 0), 5, 95);
  const n20 = s.newsScore20;
  const f = layerF(s);
  const fShort = layerFShort(s);
  const space = layerS(s);
  const ps = planScores(s.industry);
  const bands = expectBands(s, quote, ps.p5, ps.p10, f);
  const daySide = bandSide(quote?.price, bands?.day);
  const monthSide = bandSide(quote?.price, bands?.month);
  const yearSide = bandSide(quote?.price, bands?.year);
  const w = localDayWeights(st, daySide);

  let scoreDay = clamp(w.wT * t + w.wN * n + w.wF * fShort + w.wP * ps.pDay, 5, 96);
  let scoreMonth = clamp(0.12 * t20 + 0.12 * n20 + 0.3 * f + 0.28 * space + 0.18 * ps.pMonth, 5, 96);
  let scoreYear = clamp(0.08 * s.trendStab + 0.32 * f + 0.38 * space + 0.22 * ps.pYear, 5, 96);

  if (daySide === "above") {
    scoreDay -= 3.2;
    scoreMonth -= 1.1;
  } else if (daySide === "below") {
    scoreDay -= 2.4;
    if (f >= 65 && space >= 60 && ps.p5 >= 60) scoreMonth += 1.4;
    else scoreMonth -= 2.2;
  }
  if (monthSide === "above" && s.pePercentile >= 80) scoreYear -= 2.5;
  scoreDay = clamp(scoreDay, 5, 96);
  scoreMonth = clamp(scoreMonth, 5, 96);
  scoreYear = clamp(scoreYear, 5, 96);

  const yearCore =
    !s.veto &&
    !s.st &&
    !s.newIpo &&
    (s.stage === "加速成长" || s.stage === "稳健成长") &&
    s.pePercentile < 90 &&
    space >= 58 &&
    f >= 55 &&
    ps.p10 >= 42 &&
    yearSide !== "above";

  return {
    ...s,
    quote,
    t: round1(t),
    n: round1(n),
    f: round1(f),
    s: round1(space),
    p: round1(ps.pMonth),
    p5: round1(ps.p5),
    p10: round1(ps.p10),
    t20: round1(t20),
    n20: round1(n20),
    fShort: round1(fShort),
    scoreDay: round1(scoreDay),
    scoreMonth: round1(scoreMonth),
    scoreYear: round1(scoreYear),
    yearCore,
    hint: hint(s, t, f, space, yearCore, daySide),
    factors: factorsOf(s, t, n, f, space, ps.p5, ps.p10, st),
    bands,
    daySide,
    monthSide,
    yearSide,
  };
}

export function scoreUniverse(quotes: Record<string, Quote>) {
  const indexPct: Record<string, number> = {};
  for (const [k, q] of Object.entries(quotes)) {
    if (k.startsWith("sh000") || k.startsWith("sz399") || k.startsWith("bj899")) {
      indexPct[k] = q.pct;
    }
  }
  const breadthUp = UNIVERSE.filter((s) => (quotes[s.symbol]?.pct ?? 0) > 0).length / UNIVERSE.length;
  const base = inferMarketState(indexPct, breadthUp);

  let over = 0;
  let under = 0;
  let counted = 0;
  for (const s of UNIVERSE) {
    const q = quotes[s.symbol];
    if (!q?.price) continue;
    const f = layerF(s);
    const ps = planScores(s.industry);
    const bands = expectBands(s, q, ps.p5, ps.p10, f);
    const side = bandSide(q.price, bands?.day);
    if (side === "na") continue;
    counted += 1;
    if (side === "above") over += 1;
    if (side === "below") under += 1;
  }
  const state = adaptWeights(base, over, under, counted);
  const stocks = UNIVERSE.map((s) => scoreOne(s, quotes[s.symbol], state)).sort((a, b) => b.scoreDay - a.scoreDay);
  return { state, stocks, breadthUp };
}

export function monthlyPool(stocks: ScoredStock[], size = 28) {
  const eligible = stocks.filter(
    (s) =>
      !s.veto &&
      !s.st &&
      !s.newIpo &&
      !s.auditIssue &&
      (s.stage === "加速成长" || s.stage === "稳健成长") &&
      s.s >= 58 &&
      s.p5 >= 40,
  );
  eligible.sort((a, b) => b.scoreMonth - a.scoreMonth);
  const picked: ScoredStock[] = [];
  const industryCount: Record<string, number> = {};
  const capBucket = { 大: 0, 中: 0, 小: 0 };
  for (const s of eligible) {
    if (picked.length >= size) break;
    const ic = industryCount[s.industry] ?? 0;
    if ((ic + 1) / size > 0.25) continue;
    const cap = s.quote?.capYi ?? 0;
    const bucket = cap >= 5000 ? "大" : cap >= 1500 ? "中" : "小";
    if (capBucket[bucket] / size > 0.5 && bucket === "小") continue;
    picked.push(s);
    industryCount[s.industry] = ic + 1;
    capBucket[bucket] += 1;
  }
  return picked;
}

export function yearlyPool(stocks: ScoredStock[], size = 20) {
  const core = stocks
    .filter((s) => s.yearCore)
    .sort((a, b) => b.scoreYear - a.scoreYear)
    .slice(0, size);
  const watch = stocks
    .filter((s) => !s.yearCore && (s.stage === "加速成长" || s.stage === "导入培育") && s.s >= 70)
    .sort((a, b) => b.scoreYear - a.scoreYear)
    .slice(0, 8);
  return { core, watch };
}
