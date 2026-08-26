export type Stage = "导入培育" | "加速成长" | "稳健成长" | "成熟现金" | "衰退出清";

export type Board = "沪市" | "深市主板" | "创业板" | "科创板" | "港股";

export type Quote = {
  symbol: string;
  code: string;
  price: number;
  prev: number;
  open: number;
  high: number;
  low: number;
  change: number;
  pct: number;
  volume: number;
  amountWan: number;
  turnover: number;
  pe: number;
  pb: number;
  capYi: number;
  circYi: number;
  time: string;
};

export type Bar = {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
};

export type NameCard = {
  code: string;
  symbol: string;
  name: string;
  industry: string;
  board: Board;
  listed: string;
  business: string;
  controller: string;
  stage: Stage;
  revYoy: number;
  npYoy: number;
  roe: number;
  grossMargin: number;
  cfoToNp: number;
  capexToRev: number;
  peg: number;
  pePercentile: number;
  mom20: number;
  bias20: number;
  adx: number;
  rsi: number;
  turnBias: number;
  vol20: number;
  trendStab: number;
  newsScore: number;
  newsScore20: number;
  industrySpace: number;
  elasticity: number;
  delivery: number;
  valuationDrag: number;
  st: boolean;
  newIpo: boolean;
  auditIssue: boolean;
  veto: boolean;
  vetoReason?: string;
  thesis: [string, string, string];
  risks: string[];
};

export type FactorRow = {
  key: string;
  label: string;
  layer: "T" | "N" | "F" | "S" | "P";
  value: number;
  weight: number;
};

export type Band = {
  low: number;
  high: number;
  mid: number;
};

export type ExpectBands = {
  day: Band;
  month: Band;
  year: Band;
};

export type BandSide = "above" | "inside" | "below" | "na";

export type ScoredStock = NameCard & {
  quote?: Quote;
  t: number;
  n: number;
  f: number;
  s: number;
  p: number;
  p5: number;
  p10: number;
  t20: number;
  n20: number;
  fShort: number;
  scoreDay: number;
  scoreMonth: number;
  scoreYear: number;
  yearCore: boolean;
  hint: string;
  factors: FactorRow[];
  bands?: ExpectBands;
  daySide: BandSide;
  monthSide: BandSide;
  yearSide: BandSide;
};

export type MarketState = {
  label: "趋势偏多" | "震荡修复" | "拥挤回撤";
  tone: "up" | "flat" | "down";
  style: string;
  crowd: string;
  wT: number;
  wN: number;
  wF: number;
  wP: number;
  overBand: number;
  underBand: number;
  note: string;
};

export const MODEL_VERSION = "HY-20260826-E";
export const UNIVERSE_AS_OF = "2026-08-26";
