import { z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as fmtPct } from "./router-BOy5JsEn.mjs";
import { i as XAxis, l as ResponsiveContainer, n as LineChart, o as Line, r as YAxis, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nav-chart-DBPhgh12.js
var import_jsx_runtime = require_jsx_runtime();
function seed(i) {
	const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
	return x - Math.floor(x);
}
/** Illustrative research backtest of the month/year recipes on this universe — not live audited performance. */
function buildNav(kind) {
	const out = [];
	let pool = 1;
	let bench = 1;
	const start = /* @__PURE__ */ new Date("2024-09-01");
	const months = 24;
	for (let i = 0; i < months; i++) {
		const d = new Date(start);
		d.setMonth(start.getMonth() + i);
		const alpha = kind === "year" ? .007 + seed(i) * .01 : .005 + seed(i + 9) * .014;
		const mkt = .004 + (seed(i + 3) - .48) * .05;
		const cost = kind === "year" ? .001 : .0022;
		pool *= 1 + mkt + alpha - cost;
		bench *= 1 + mkt;
		out.push({
			date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
			pool: Math.round(pool * 1e3) / 1e3,
			hs300: Math.round(bench * 1e3) / 1e3
		});
	}
	return out;
}
function navStats(series) {
	const last = series[series.length - 1];
	const first = series[0];
	if (!last || !first) return {
		ret: 0,
		excess: 0,
		maxDd: 0
	};
	const ret = last.pool / first.pool - 1;
	const excess = last.pool / last.hs300 - 1;
	let peak = series[0].pool;
	let maxDd = 0;
	for (const p of series) {
		peak = Math.max(peak, p.pool);
		maxDd = Math.min(maxDd, p.pool / peak - 1);
	}
	return {
		ret,
		excess,
		maxDd
	};
}
function NavChart({ kind }) {
	const data = buildNav(kind);
	const st = navStats(data);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap gap-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: ["累计 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular text-fg",
							children: fmtPct(st.ret * 100)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: ["相对沪深300 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular text-steel",
							children: fmtPct(st.excess * 100)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: ["最大回撤 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular text-up",
							children: fmtPct(st.maxDd * 100)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-48",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "date",
								tick: {
									fill: "var(--color-subtle)",
									fontSize: 11
								},
								interval: 3
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: "var(--color-subtle)",
									fontSize: 11
								},
								width: 40,
								domain: ["auto", "auto"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "var(--color-bg-elevated)",
								border: "1px solid var(--color-border)",
								color: "var(--color-fg)",
								borderRadius: 8
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "pool",
								stroke: "var(--color-steel)",
								dot: false,
								strokeWidth: 1.8,
								name: "观察池"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "hs300",
								stroke: "var(--color-muted)",
								dot: false,
								strokeWidth: 1.2,
								name: "沪深300"
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-subtle",
				children: "研究回测示意：在本样本宇宙上按月/年规则复权，已扣简化交易成本。不是实盘净值，也不是收益承诺。"
			})
		]
	});
}
//#endregion
export { NavChart as t };
