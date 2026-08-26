import { i as __toESM } from "../_runtime.mjs";
import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as Star } from "../_libs/lucide-react.mjs";
import { C as Disclaimer, D as fmtPct, E as fmtNum, S as Score, T as cn, _ as impactForIndustry, b as Chg, g as dirTone, k as fmtYi, l as useMarket, n as Route, r as MODEL_VERSION, v as fetchKlines, x as Px } from "./router-BOy5JsEn.mjs";
import { t as Badge } from "./badge-ClQcrVsD.mjs";
import { n as newsFor } from "./news-ZdPJ3gXL.mjs";
import { o as stageTone, r as StockTags, s as useWatchlist, t as ExpectPanel } from "./stock-table-Bk28CdSA.mjs";
import { a as Area, c as Bar, i as XAxis, l as ResponsiveContainer, o as Line, r as YAxis, s as CartesianGrid, t as ComposedChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stock._code-C3v9_Dv0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ma(bars, n) {
	return bars.map((_, i) => {
		if (i < n - 1) return void 0;
		let s = 0;
		for (let k = 0; k < n; k++) s += bars[i - k].close;
		return s / n;
	});
}
function PriceChart({ symbol }) {
	const [bars, setBars] = (0, import_react.useState)([]);
	const [err, setErr] = (0, import_react.useState)();
	(0, import_react.useEffect)(() => {
		let alive = true;
		fetchKlines({ data: { symbol } }).then((r) => {
			if (!alive) return;
			setBars(r.bars);
			if (!r.ok) setErr(r.error);
		});
		return () => {
			alive = false;
		};
	}, [symbol]);
	if (!bars.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-64 place-items-center rounded-lg border border-border bg-surface text-sm text-muted",
		children: err ?? "K线加载中"
	});
	const m20 = ma(bars, 20);
	const m60 = ma(bars, 60);
	const data = bars.map((b, i) => ({
		date: b.date.slice(5),
		close: b.close,
		vol: b.volume,
		ma20: m20[i],
		ma60: m60[i]
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-72 rounded-lg border border-border bg-surface p-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-border)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "date",
						tick: {
							fill: "var(--color-subtle)",
							fontSize: 11
						},
						interval: 18
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						yAxisId: "p",
						domain: ["auto", "auto"],
						tick: {
							fill: "var(--color-subtle)",
							fontSize: 11
						},
						width: 52
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						yAxisId: "v",
						orientation: "right",
						hide: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
						background: "var(--color-bg-elevated)",
						border: "1px solid var(--color-border)",
						borderRadius: 8,
						color: "var(--color-fg)"
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						yAxisId: "v",
						dataKey: "vol",
						fill: "var(--color-border-strong)",
						opacity: .45
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						yAxisId: "p",
						type: "monotone",
						dataKey: "close",
						stroke: "var(--color-steel)",
						fill: "color-mix(in oklab, var(--color-steel) 16%, transparent)",
						strokeWidth: 1.6
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						yAxisId: "p",
						type: "monotone",
						dataKey: "ma20",
						stroke: "var(--color-warn)",
						dot: false,
						strokeWidth: 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						yAxisId: "p",
						type: "monotone",
						dataKey: "ma60",
						stroke: "var(--color-muted)",
						dot: false,
						strokeWidth: 1
					})
				]
			})
		})
	});
}
var LAYERS = [
	{
		key: "t",
		label: "T 技术",
		sub: "价量趋势与拥挤"
	},
	{
		key: "n",
		label: "N 事件",
		sub: "新闻与公告冲击"
	},
	{
		key: "f",
		label: "F 质量",
		sub: "财务与成长阶段"
	},
	{
		key: "s",
		label: "S 空间",
		sub: "中长期天花板"
	},
	{
		key: "p",
		label: "P 规划",
		sub: "十五五 / 2035"
	}
];
function ScoreBars({ s }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: LAYERS.map((l) => {
			const v = s[l.key];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex items-baseline justify-between text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-xs text-muted",
					children: l.sub
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular text-fg",
					children: v.toFixed(1)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1.5 overflow-hidden rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("h-full rounded-full bg-steel"),
					style: { width: `${v}%` }
				})
			})] }, l.key);
		})
	});
}
function StockPage() {
	const { code } = Route.useParams();
	const stocks = useMarket((s) => s.stocks);
	const month = useMarket((s) => s.month);
	const yearCore = useMarket((s) => s.yearCore);
	const yearWatch = useMarket((s) => s.yearWatch);
	const s = stocks.find((x) => x.code === code);
	const toggle = useWatchlist((x) => x.toggle);
	const starred = useWatchlist((x) => x.codes.includes(code));
	const note = useWatchlist((x) => x.notes[code] ?? "");
	const setNote = useWatchlist((x) => x.setNote);
	const news = newsFor(code);
	if (!s) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl",
				children: "未纳入研究宇宙"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "当前样本约四十只，用于演示四层评分与月年池规则。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/quotes",
				className: "text-steel",
				children: "返回行情"
			})
		]
	});
	const q = s.quote;
	const inMonth = month.some((m) => m.code === code);
	const inYear = yearCore.some((m) => m.code === code);
	const inWatch = yearWatch.some((m) => m.code === code);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex min-w-0 flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl font-medium tracking-tight",
								children: s.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular text-muted",
								children: s.code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: stageTone(s.stage),
								children: s.stage
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockTags, {
								board: s.board,
								code: s.code
							}),
							inMonth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "steel",
								children: "月度池"
							}),
							inYear && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "steel",
								children: "年度核心"
							}),
							inWatch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "warn",
								children: "高预期观察"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							s.industry,
							" · ",
							s.board,
							" · ",
							s.business,
							" · 实控人 ",
							s.controller,
							s.symbol.startsWith("hk") ? " · 报价港币" : ""
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-3xl tabular",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Px, { n: q?.price })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chg, {
						pct: q?.pct,
						className: "text-lg"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => toggle(code),
					className: cn("inline-flex h-10 items-center gap-2 rounded-sm border px-3 text-sm", starred ? "border-steel bg-surface-2 text-steel" : "border-border text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", starred && "fill-steel") }), starred ? "已在自选" : "加入自选"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 rounded-lg border border-border bg-bg-elevated p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium",
						children: "三句话结论"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "grid gap-2 text-sm text-muted",
						children: s.thesis.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t }, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-fg",
						children: s.hint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { compact: true })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpectPanel, { s }),
			impactForIndustry(s.industry) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanImpact, { industry: s.industry }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceChart, { symbol: s.symbol }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2 text-sm sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "开盘",
								v: q ? fmtNum(q.open) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "最高",
								v: q ? fmtNum(q.high) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "最低",
								v: q ? fmtNum(q.low) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "换手",
								v: q ? fmtPct(q.turnover) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "PE",
								v: q && Number.isFinite(q.pe) ? fmtNum(q.pe) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "PB",
								v: q && Number.isFinite(q.pb) ? fmtNum(q.pb) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "总市值",
								v: fmtYi(q?.capYi ?? NaN)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "成交额",
								v: q ? s.symbol.startsWith("hk") ? `${fmtNum(q.amountWan / 1e8, 2)} 亿港元` : `${fmtNum(q.amountWan / 1e4, 2)} 亿` : "—"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-4 lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-medium",
								children: "五层评分"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: MODEL_VERSION
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 grid grid-cols-3 gap-2 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									label: "日评分",
									n: s.scoreDay
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									label: "月度",
									n: s.scoreMonth
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									label: "年度",
									n: s.scoreYear
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBars, { s })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium",
						children: "财务快照"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "收入同比",
								v: fmtPct(s.revYoy)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "净利同比",
								v: fmtPct(s.npYoy)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "ROE",
								v: fmtPct(s.roe)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "毛利率",
								v: s.grossMargin ? fmtPct(s.grossMargin) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "经营现金流/净利",
								v: fmtNum(s.cfoToNp)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "资本开支/收入",
								v: fmtPct(s.capexToRev)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "PEG",
								v: fmtNum(s.peg)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "PE 分位",
								v: `${s.pePercentile}`
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-medium",
							children: "空间与风险"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-2 gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
									k: "行业空间",
									v: String(s.industrySpace)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
									k: "公司弹性",
									v: String(s.elasticity)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
									k: "兑现能力",
									v: String(s.delivery)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
									k: "估值拖累",
									v: String(s.valuationDrag)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 list-disc pl-5 text-sm text-muted",
							children: s.risks.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: r }, r))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium",
					children: "因子贡献"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[480px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-1 text-left font-medium",
									children: "因子"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-1 text-left font-medium",
									children: "层"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-1 text-right font-medium",
									children: "取值"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-1 text-right font-medium",
									children: "权重"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: s.factors.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1.5",
									children: f.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1.5 text-muted",
									children: f.layer
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1.5 text-right tabular",
									children: fmtNum(f.value, 1)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1.5 text-right tabular",
									children: fmtNum(f.weight, 2)
								})
							]
						}, f.key)) })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium",
						children: "相关新闻"
					}),
					news.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "近期样本中没有单独映射的事件。"
					}),
					news.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-md border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted",
							children: [
								n.time,
								" · ",
								n.source
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm",
							children: n.title
						})]
					}, n.id))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-bg-elevated p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium",
						children: "个人备忘"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-subtle",
						children: "只存在本机浏览器，不上传、不构成平台建议。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: note,
						onChange: (e) => setNote(code, e.target.value),
						rows: 5,
						placeholder: "记录你自己的交易假设、仓位纪律和证伪条件…",
						className: "mt-3 w-full rounded-md border border-border bg-surface p-3 text-sm outline-none focus:ring-2 focus:ring-steel/40"
					})
				]
			})
		]
	});
}
function KV({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-bg-elevated px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-subtle",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tabular text-fg",
			children: v
		})]
	});
}
function Mini({ label, n }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-bg-elevated py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Score, {
			n,
			className: "text-lg"
		})]
	});
}
function PlanImpact({ industry }) {
	const row = impactForIndustry(industry);
	if (!row) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-3 rounded-lg border border-border bg-bg-elevated p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium",
					children: "中长期规划对照"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/plan",
					className: "text-sm text-steel hover:underline",
					children: "全部行业"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					row.industry,
					" · ",
					row.theme,
					"。规划改的是空间假设，不自动改日评分。"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex items-center gap-2 text-sm",
					children: ["五年 2026–2030 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: dirTone(row.y5.dir),
						children: row.y5.dir
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: row.y5.summary
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex items-center gap-2 text-sm",
					children: ["十年至 2035 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: dirTone(row.y10.dir),
						children: row.y10.dir
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: row.y10.summary
				})] })]
			})
		]
	});
}
//#endregion
export { StockPage as component };
