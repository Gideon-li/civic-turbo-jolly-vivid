import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Star } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { O as fmtPx, S as Score, T as cn, a as displayTags, b as Chg, i as MARKET_FILTERS, k as fmtYi, o as matchesFilter, s as tagTone, w as clamp, x as Px } from "./router-BOy5JsEn.mjs";
import { t as Badge } from "./badge-ClQcrVsD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stock-table-Bk28CdSA.js
var import_jsx_runtime = require_jsx_runtime();
function sideLabel(side) {
	if (side === "above") return "上沿外";
	if (side === "below") return "下沿外";
	if (side === "inside") return "区间内";
	return "待行情";
}
function sideTone(side) {
	if (side === "above" || side === "below") return "warn";
	if (side === "inside") return "steel";
	return "neutral";
}
function BandBar({ band, px, label, side }) {
	if (!band || !Number.isFinite(band.low) || !Number.isFinite(band.high)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-sm text-muted",
			children: "待行情快照"
		})]
	});
	const span = Math.max(band.high - band.low, 1e-6);
	const marker = Number.isFinite(px) ? clamp((px - band.low) / span * 100, -4, 104) : 50;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-surface p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-subtle",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: sideTone(side),
					children: sideLabel(side)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between text-sm tabular",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-down",
						children: fmtPx(band.low)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Px, {
						n: px,
						className: "text-base"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-up",
						children: fmtPx(band.high)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mt-2 h-1.5 overflow-visible rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full", side === "inside" ? "bg-steel" : "bg-warn"),
					style: { left: `${marker}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex justify-between text-[11px] text-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "预期最低" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "现价" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "预期最高" })
				]
			})
		]
	});
}
function ExpectPanel({ s }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-3 rounded-lg border border-border bg-bg-elevated p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-base font-medium",
			children: "研究预期区间"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "由波动率、成长阶段、质量与规划因子推算的观察带，不是目标价或收益承诺。升破上沿会下调当日技术权重。"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BandBar, {
					label: "当日",
					band: s.bands?.day,
					px: s.quote?.price,
					side: s.daySide
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BandBar, {
					label: "月度",
					band: s.bands?.month,
					px: s.quote?.price,
					side: s.monthSide
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BandBar, {
					label: "年度",
					band: s.bands?.year,
					px: s.quote?.price,
					side: s.yearSide
				})
			]
		})]
	});
}
function BandCell({ band, side }) {
	if (!band) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted",
		children: "—"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-right",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tabular text-up",
				children: fmtPx(band.high)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tabular text-xs text-down",
				children: fmtPx(band.low)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] text-subtle",
				children: sideLabel(side)
			})
		]
	});
}
function StockTags({ board, code, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex flex-wrap gap-1", className),
		children: displayTags({
			board,
			code
		}).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: tagTone(t),
			children: t
		}, t))
	});
}
function TagFilter({ value, onChange, counts }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: MARKET_FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onChange(f),
			className: cn("inline-flex h-10 items-center gap-1.5 rounded-full border px-3 text-sm", value === f ? "border-steel bg-surface-2 text-fg" : "border-border text-muted hover:text-fg"),
			children: [f, typeof counts[f] === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular text-xs text-subtle",
				children: counts[f]
			})]
		}, f))
	});
}
function countFilters(rows) {
	const counts = { 全部: rows.length };
	for (const f of MARKET_FILTERS) {
		if (f === "全部") continue;
		counts[f] = rows.filter((s) => matchesFilter(s, f)).length;
	}
	return counts;
}
var useWatchlist = create()(persist((set, get) => ({
	codes: [
		"300750",
		"002594",
		"600036",
		"002371"
	],
	notes: {},
	toggle: (code) => set((s) => ({ codes: s.codes.includes(code) ? s.codes.filter((c) => c !== code) : [...s.codes, code] })),
	has: (code) => get().codes.includes(code),
	setNote: (code, note) => set((s) => ({ notes: {
		...s.notes,
		[code]: note
	} }))
}), { name: "hengyan-watch" }));
function StockTable({ rows, scoreKey = "scoreDay" }) {
	const toggle = useWatchlist((s) => s.toggle);
	const codes = useWatchlist((s) => s.codes);
	const horizon = scoreKey === "scoreMonth" ? "month" : scoreKey === "scoreYear" ? "year" : "day";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-lg border border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[980px] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-surface text-xs text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 font-medium",
						children: " "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 font-medium",
						children: "证券"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 font-medium",
						children: "市场 / 主题"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 font-medium",
						children: "行业"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 font-medium",
						children: "阶段"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 text-right font-medium",
						children: "现价"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 text-right font-medium",
						children: "涨跌"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 text-right font-medium",
						children: "预期高 / 低"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 text-right font-medium",
						children: "市值"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 text-right font-medium",
						children: "T"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 text-right font-medium",
						children: "N"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 text-right font-medium",
						children: "F"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 text-right font-medium",
						children: "S"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 text-right font-medium",
						children: "P"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 text-right font-medium",
						children: "综合"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t border-border hover:bg-surface/80",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-2 py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "自选",
							onClick: () => toggle(r.code),
							className: "grid size-10 place-items-center text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", codes.includes(r.code) && "fill-steel text-steel") })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/stock/$code",
							params: { code: r.code },
							className: "block hover:text-steel",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted tabular",
								children: [r.code, r.symbol.startsWith("hk") ? " · HKD" : ""]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockTags, {
							board: r.board,
							code: r.code
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2 text-muted",
						children: r.industry
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: stageTone(r.stage),
							children: r.stage
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Px, { n: r.quote?.price })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chg, { pct: r.quote?.pct })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BandCell, {
							band: horizon === "month" ? r.bands?.month : horizon === "year" ? r.bands?.year : r.bands?.day,
							side: horizon === "month" ? r.monthSide : horizon === "year" ? r.yearSide : r.daySide
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2 text-right text-muted tabular",
						children: fmtYi(r.quote?.capYi ?? NaN)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Score, { n: r.t })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Score, { n: r.n })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Score, { n: r.f })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Score, { n: r.s })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Score, { n: r.p })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Score, { n: r[scoreKey] })
					})
				]
			}, r.code)) })]
		})
	});
}
function stageTone(stage) {
	if (stage === "加速成长") return "steel";
	if (stage === "稳健成长") return "neutral";
	if (stage === "导入培育") return "warn";
	return "down";
}
//#endregion
export { countFilters as a, TagFilter as i, StockTable as n, stageTone as o, StockTags as r, useWatchlist as s, ExpectPanel as t };
