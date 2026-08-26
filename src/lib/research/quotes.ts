import { createServerFn } from "@tanstack/react-start";
import { INDICES, UNIVERSE } from "./universe";
import type { Bar, Quote } from "./types";

function num(v: string | undefined) {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function parseQuotes(raw: string): Record<string, Quote> {
  const out: Record<string, Quote> = {};
  for (const line of raw.split(";")) {
    const m = line.match(/v_([a-z]{2}\d+)="(.*)"/);
    if (!m) continue;
    const symbol = m[1];
    const f = m[2].split("~");
    const q: Quote = {
      symbol,
      code: f[2] ?? "",
      price: num(f[3]),
      prev: num(f[4]),
      open: num(f[5]),
      high: num(f[33]),
      low: num(f[34]),
      change: num(f[31]),
      pct: num(f[32]),
      volume: num(f[6]),
      amountWan: num(f[37]),
      turnover: num(f[38]),
      pe: num(f[39]),
      pb: num(f[46]),
      capYi: num(f[45]),
      circYi: num(f[44]),
      time: f[30] ?? "",
    };
    if (Number.isFinite(q.price)) out[symbol] = q;
  }
  return out;
}

async function fetchTencent(symbols: string[]) {
  const url = `https://qt.gtimg.cn/q=${symbols.join(",")}`;
  const res = await fetch(url, {
    headers: { Referer: "https://finance.qq.com/", "User-Agent": "Mozilla/5.0 HengyanResearch" },
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`quote http ${res.status}`);
  const buf = new Uint8Array(await res.arrayBuffer());
  return new TextDecoder("latin1").decode(buf);
}

export const fetchQuotes = createServerFn({ method: "GET" }).handler(async () => {
  const symbols = [...INDICES.map((i) => i.symbol), ...UNIVERSE.map((s) => s.symbol)];
  try {
    const raw = await fetchTencent(symbols);
    const quotes = parseQuotes(raw);
    return { ok: true as const, quotes, source: "tencent", asOf: new Date().toISOString() };
  } catch (e) {
    return {
      ok: false as const,
      quotes: {} as Record<string, Quote>,
      source: "none",
      asOf: new Date().toISOString(),
      error: e instanceof Error ? e.message : "quote fail",
    };
  }
});

export const fetchKlines = createServerFn({ method: "POST" })
  .validator((input: { symbol: string }) => input)
  .handler(async ({ data }) => {
    const symbol = data.symbol.replace(/[^a-z0-9]/gi, "").toLowerCase();
    const isIndex = /^(sh000|sz399|bj899)/.test(symbol);
    const isHk = symbol.startsWith("hk");
    const param = isIndex ? `${symbol},day,,,120,` : `${symbol},day,,,120,qfq`;
    const path = isHk ? "hkfqkline" : "fqkline";
    const url = `https://web.ifzq.gtimg.cn/appstock/app/${path}/get?param=${param}`;
    try {
      const res = await fetch(url, {
        headers: { Referer: "https://finance.qq.com/" },
        signal: AbortSignal.timeout(8000),
      });
      const json = (await res.json()) as {
        data?: Record<string, { qfqday?: string[][]; day?: string[][] }>;
      };
      const node = json.data?.[symbol];
      const rows = node?.qfqday ?? node?.day ?? [];
      const bars: Bar[] = rows.map((r) => ({
        date: r[0] ?? "",
        open: Number(r[1]),
        close: Number(r[2]),
        high: Number(r[3]),
        low: Number(r[4]),
        volume: Number(r[5]),
      }));
      return { ok: true as const, bars };
    } catch (e) {
      return { ok: false as const, bars: [] as Bar[], error: e instanceof Error ? e.message : "kline fail" };
    }
  });
