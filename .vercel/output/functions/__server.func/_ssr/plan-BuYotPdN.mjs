import { i as __toESM } from "../_runtime.mjs";
import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as Disclaimer, T as cn, d as GOALS_5Y, f as HORIZONS, g as dirTone, h as PLAN_AS_OF, l as useMarket, m as PILLARS, p as IMPACTS, u as GOALS_10Y } from "./router-BOy5JsEn.mjs";
import { t as Badge } from "./badge-ClQcrVsD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plan-BuYotPdN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlanPage() {
	const stocks = useMarket((s) => s.stocks);
	const [dir, setDir] = (0, import_react.useState)("全部");
	const rows = IMPACTS.filter((i) => dir === "全部" || i.y5.dir === dir || i.y10.dir === dir);
	const byIndustry = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const s of stocks) {
			const arr = m.get(s.industry) ?? [];
			arr.push(s);
			m.set(s.industry, arr);
		}
		return m;
	}, [stocks]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs tracking-[0.2em] text-steel uppercase",
						children: ["Policy map · ", PLAN_AS_OF]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "max-w-3xl text-2xl font-medium tracking-tight sm:text-3xl",
						children: "中国中长期规划对照"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-3xl text-sm leading-relaxed text-muted",
						children: "把公开的五年规划与 2035 远景，映射到研究宇宙里的行业——只解释政策方向如何改空间假设，不代替财务兑现，也不是推荐。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-2 sm:grid-cols-3",
				children: [
					{
						t: "2026",
						d: "十五五开局",
						n: "产业体系、科技、内需、绿色同时铺开"
					},
					{
						t: "2030",
						d: "五年节点",
						n: "非化石能源约 25%，数字与先进制造骨架成型"
					},
					{
						t: "2035",
						d: "十年远景",
						n: "基本实现社会主义现代化，人均 GDP 中等发达"
					}
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-border bg-bg-elevated p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "tabular text-2xl text-steel",
							children: x.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm text-fg",
							children: x.d
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: x.n
						})
					]
				}, x.t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizonCard, {
					title: HORIZONS.y5.title,
					years: HORIZONS.y5.years,
					lead: HORIZONS.y5.lead,
					source: HORIZONS.y5.source,
					goals: GOALS_5Y
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizonCard, {
					title: HORIZONS.y10.title,
					years: HORIZONS.y10.years,
					lead: HORIZONS.y10.lead,
					source: HORIZONS.y10.source,
					goals: GOALS_10Y
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "六条主柱"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 md:grid-cols-2 lg:grid-cols-3",
					children: PILLARS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-lg border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium text-fg",
							children: p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: p.body
						})]
					}, p.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "行业影响"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "五年看兑现窗口，十年看空间是否还在。同一行业两列可以不一致。"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							"全部",
							"受益",
							"中性",
							"约束"
						].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setDir(d),
							className: cn("inline-flex h-10 items-center rounded-full border px-3 text-sm", dir === d ? "border-steel bg-surface-2 text-fg" : "border-border text-muted hover:text-fg"),
							children: d
						}, d))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: rows.map((row) => {
						const names = byIndustry.get(row.industry) ?? [];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-lg border border-border bg-bg-elevated p-4 sm:p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-base font-medium",
											children: row.industry
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: row.theme }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											tone: dirTone(row.y5.dir),
											children: ["五年 ", row.y5.dir]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											tone: dirTone(row.y10.dir),
											children: ["十年 ", row.y10.dir]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 grid gap-4 md:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactCol, {
										title: "2026–2030",
										block: row.y5
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactCol, {
										title: "至 2035",
										block: row.y10
									})]
								}),
								names.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 flex flex-wrap gap-2 border-t border-border pt-3",
									children: names.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/stock/$code",
										params: { code: s.code },
										className: "inline-flex h-9 items-center rounded-sm border border-border px-2.5 text-sm hover:border-steel/40 hover:text-steel",
										children: [s.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-1.5 tabular text-xs text-muted",
											children: s.code
										})]
									}, s.code))
								})
							]
						}, row.industry);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-subtle",
				children: "文本依据公开纲要精神做研究映射，不是官方点名个股，也不构成投资建议。指标口径以正式公布文件为准；规划改变空间假设，财务与订单改变评分。"
			})
		]
	});
}
function HorizonCard({ title, years, lead, source, goals }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg border border-border bg-bg-elevated p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular text-sm text-steel",
					children: years
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: lead
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-4 grid gap-3",
				children: goals.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[4.5rem_1fr] gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-subtle",
						children: g.k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-fg",
						children: g.v
					})]
				}, g.k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-subtle",
				children: source
			})
		]
	});
}
function ImpactCol({ title, block }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1 flex items-center gap-2 text-sm text-fg",
			children: [title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: dirTone(block.dir),
				children: block.dir
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-relaxed text-muted",
			children: block.summary
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 grid gap-1 text-sm text-muted",
			children: block.points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "pl-3 before:mr-2 before:text-subtle before:content-['·']",
				children: p
			}, p))
		})
	] });
}
//#endregion
export { PlanPage as component };
