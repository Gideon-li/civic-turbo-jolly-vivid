import type { Board } from "./types";

/** 新能源产业链（车/电/锂电/光伏/电控） */
const ENERGY = new Set([
  "300750", "002594", "601127", "300274", "601012", "300014", "300124", "01211", "02015",
]);

/** A+H 或港股通标的，便于对照两地 */
const CONNECT = new Set([
  "600036", "601318", "000333", "002594", "300750", "688981", "603259", "000063",
  "01211", "00981",
]);

export const MARKET_FILTERS = ["全部", "沪深", "科创板", "创业板", "港股", "新能源"] as const;
export type MarketFilter = (typeof MARKET_FILTERS)[number];

export function marketLabel(board: Board) {
  if (board === "深市主板") return "深市";
  return board;
}

export function tagsOf(s: { board: Board; code: string }) {
  const tags: string[] = [marketLabel(s.board)];
  if (s.board === "沪市" || s.board === "深市主板") tags.unshift("沪深");
  if (ENERGY.has(s.code)) tags.push("新能源");
  if (CONNECT.has(s.code)) tags.push("港股通");
  return tags;
}

export function displayTags(s: { board: Board; code: string }) {
  return tagsOf(s).filter((t) => t !== "沪深");
}

export function matchesFilter(s: { board: Board; code: string; name: string; industry: string }, f: MarketFilter) {
  if (f === "全部") return true;
  return tagsOf(s).includes(f);
}

export function tagTone(tag: string): "neutral" | "steel" | "warn" | "down" | "up" {
  if (tag === "科创板" || tag === "港股") return "steel";
  if (tag === "创业板" || tag === "新能源") return "warn";
  if (tag === "港股通") return "down";
  return "neutral";
}
