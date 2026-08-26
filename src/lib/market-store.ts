import { create } from "zustand";
import { fetchQuotes } from "@/lib/research/quotes";
import { monthlyPool, scoreUniverse, yearlyPool } from "@/lib/research/engine";
import { INDICES } from "@/lib/research/universe";
import type { MarketState, Quote, ScoredStock } from "@/lib/research/types";

type IndexView = {
  symbol: string;
  code: string;
  name: string;
  quote?: Quote;
};

type MarketSnap = {
  loading: boolean;
  error?: string;
  asOf?: string;
  live: boolean;
  quotes: Record<string, Quote>;
  stocks: ScoredStock[];
  state: MarketState;
  breadthUp: number;
  indices: IndexView[];
  month: ScoredStock[];
  yearCore: ScoredStock[];
  yearWatch: ScoredStock[];
  refresh: () => Promise<void>;
};

const seeded = scoreUniverse({});
const seededYear = yearlyPool(seeded.stocks);

export const useMarket = create<MarketSnap>((set) => ({
  loading: false,
  quotes: {},
  stocks: seeded.stocks,
  state: seeded.state,
  breadthUp: seeded.breadthUp,
  indices: INDICES.map((i) => ({ ...i })),
  month: monthlyPool(seeded.stocks),
  yearCore: seededYear.core,
  yearWatch: seededYear.watch,
  live: false,
  refresh: async () => {
    try {
      const res = await fetchQuotes();
      const scored = scoreUniverse(res.quotes);
      const month = monthlyPool(scored.stocks);
      const year = yearlyPool(scored.stocks);
      set({
        loading: false,
        error: res.ok ? undefined : res.error,
        asOf: res.asOf,
        live: res.ok,
        quotes: res.quotes,
        stocks: scored.stocks,
        state: scored.state,
        breadthUp: scored.breadthUp,
        indices: INDICES.map((i) => ({ ...i, quote: res.quotes[i.symbol] })),
        month,
        yearCore: year.core,
        yearWatch: year.watch,
      });
    } catch (e) {
      set({
        loading: false,
        live: false,
        error: e instanceof Error ? e.message : "行情同步失败",
      });
    }
  },
}));
