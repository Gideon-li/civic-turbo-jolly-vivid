import { i as __toESM } from "../_runtime.mjs";
import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as ArrowRight } from "../_libs/lucide-react.mjs";
import { C as Disclaimer, E as fmtNum, S as Score, b as Chg, g as dirTone, l as useMarket, m as PILLARS, p as IMPACTS, r as MODEL_VERSION, y as Button } from "./router-BOy5JsEn.mjs";
import { t as Badge } from "./badge-ClQcrVsD.mjs";
import { t as NEWS } from "./news-ZdPJ3gXL.mjs";
import { a as countFilters, o as stageTone, r as StockTags } from "./stock-table-Bk28CdSA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BstykZ2i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { stocks, state, month, yearCore, breadthUp, loading, live } = useMarket();
	const movers = [...stocks].sort((a, b) => Math.abs(b.scoreDay - 50) - Math.abs(a.scoreDay - 50)).slice(0, 6);
	const topDay = [...stocks].sort((a, b) => b.scoreDay - a.scoreDay).slice(0, 8);
	const counts = (0, import_react.useMemo)(() => countFilters(stocks), [stocks]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.2em] text-steel uppercase",
						children: "Personal research desk"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "max-w-3xl text-3xl leading-tight font-medium tracking-tight sm:text-4xl",
						children: "把行情、财务、新闻与技术指标，变成可拆解的每日权重和月年观察池"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/pool/month",
									children: "本月研究观察池"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/plan",
									children: "五年 / 十年规划"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/method",
									children: "方法与回测假设"
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6",
				children: [[
					"沪深",
					"科创板",
					"创业板",
					"港股",
					"新能源"
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/quotes",
					className: "rounded-lg border border-border bg-bg-elevated px-3 py-3 hover:border-steel/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: f
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "tabular text-lg text-fg",
						children: counts[f] ?? 0
					})]
				}, f)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/quotes",
					className: "rounded-lg border border-border bg-bg-elevated px-3 py-3 hover:border-steel/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: "全部样本"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "tabular text-lg text-fg",
						children: stocks.length
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-bg-elevated p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-medium",
							children: "五年 / 十年规划"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/plan",
							className: "inline-flex items-center gap-1 text-sm text-steel",
							children: ["对照表 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "十五五（2026–2030）铺产业与科技，2035 看基本实现现代化。下面是研究宇宙里政策方向偏受益的行业。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
						children: PILLARS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-surface p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-fg",
								children: p.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-xs text-muted",
								children: p.body
							})]
						}, p.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: IMPACTS.filter((i) => i.y5.dir === "受益").map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/plan",
							className: "hover:opacity-90",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: dirTone(i.y5.dir),
								children: [
									i.industry,
									" · ",
									i.theme
								]
							})
						}, i.industry))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 md:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-bg-elevated p-5 md:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-medium",
								children: "市场状态仪"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: state.tone === "up" ? "up" : state.tone === "down" ? "down" : "steel",
								children: state.label
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: state.note
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "风格",
									v: state.style
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "拥挤",
									v: state.crowd
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "上沿外",
									v: `${state.overBand}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "下沿外",
									v: `${state.underBand}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "上涨占比",
									v: loading ? "—" : `${Math.round(breadthUp * 100)}%`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "行情",
									v: live ? "公开快照" : "研究样本"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Weight, {
									label: "wT 技术",
									v: state.wT
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Weight, {
									label: "wN 事件",
									v: state.wN
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Weight, {
									label: "wF 质量",
									v: state.wF
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Weight, {
									label: "wP 规划",
									v: state.wP
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-subtle",
							children: [
								"模型 ",
								MODEL_VERSION,
								" · 现价偏离预期区间时，当日权重在线调整；月年结构不跟风改"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-bg-elevated p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium",
						children: "今日评分张力"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid gap-2",
						children: movers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/stock/$code",
							params: { code: s.code },
							className: "flex items-center justify-between gap-2 rounded-md px-1 py-1 hover:bg-surface-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm",
								children: s.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chg, { pct: s.quote?.pct }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Score, { n: s.scoreDay })]
							})]
						}) }, s.code))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoolCard, {
					title: "月度观察池",
					to: "/pool/month",
					rows: month.slice(0, 6),
					score: "scoreMonth"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoolCard, {
					title: "年度观察池",
					to: "/pool/year",
					rows: yearCore.slice(0, 6),
					score: "scoreYear"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-bg-elevated p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium",
						children: "日评分前列"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/rank",
						className: "text-sm text-steel hover:underline",
						children: "全部"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2",
					children: topDay.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/stock/$code",
						params: { code: s.code },
						className: "flex items-center gap-3 rounded-md border border-transparent px-2 py-2 hover:border-border hover:bg-surface",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-6 tabular text-subtle",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex-1 truncate text-sm",
								children: [
									s.name,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: s.code
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockTags, {
								board: s.board,
								code: s.code,
								className: "hidden sm:inline-flex"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: stageTone(s.stage),
								children: s.stage
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chg, { pct: s.quote?.pct }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Score, { n: s.scoreDay })
						]
					}, s.code))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium",
					children: "新闻与事件"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/news",
					className: "text-sm text-steel hover:underline",
					children: "全部"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: NEWS.slice(0, 4).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.time }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.source }),
								n.spaceFlag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "warn",
									children: "空间假设"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-sm font-medium",
							children: n.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: n.summary
						})
					]
				}, n.id))
			})] })
		]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs text-subtle",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-0.5 text-fg",
		children: v
	})] });
}
function Weight({ label, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-surface p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tabular text-sm text-fg",
			children: fmtNum(v, 2)
		})]
	});
}
function PoolCard({ title, to, rows, score }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-bg-elevated p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-medium",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to,
				className: "inline-flex items-center gap-1 text-sm text-steel",
				children: ["查看 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-2",
			children: rows.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/stock/$code",
				params: { code: s.code },
				className: "flex items-center justify-between rounded-md py-1 hover:bg-surface-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm",
					children: [
						s.name,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: s.code
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockTags, {
							board: s.board,
							code: s.code,
							className: "hidden md:inline-flex"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: stageTone(s.stage),
							children: s.stage
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Score, { n: s[score] })
					]
				})]
			}) }, s.code))
		})]
	});
}
//#endregion
export { Home as component };
