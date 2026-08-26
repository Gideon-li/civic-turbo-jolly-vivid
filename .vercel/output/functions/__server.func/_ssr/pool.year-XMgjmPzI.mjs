import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Disclaimer, l as useMarket, r as MODEL_VERSION } from "./router-BOy5JsEn.mjs";
import { n as StockTable } from "./stock-table-Bk28CdSA.mjs";
import { t as NavChart } from "./nav-chart-DBPhgh12.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pool.year-XMgjmPzI.js
var import_jsx_runtime = require_jsx_runtime();
function YearPool() {
	const yearCore = useMarket((s) => s.yearCore);
	const yearWatch = useMarket((s) => s.yearWatch);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-steel",
						children: "研究观察池 · 不构成投资建议"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-medium tracking-tight",
						children: "年度观察池"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm text-muted",
						children: "Score_year = 0.08×趋势稳定性 + 0.32×F + 0.38×S + 0.22×P₁₀。规划十年为「约束」的行业默认不进核心。表内高低价为年度研究区间。PE 高分位只进「高预期观察」。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-subtle",
						children: [
							MODEL_VERSION,
							" · 核心 ",
							yearCore.length,
							" ·",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pool/month",
								className: "text-steel",
								children: "月度池"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavChart, { kind: "year" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-medium",
				children: "核心池"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockTable, {
				rows: yearCore,
				scoreKey: "scoreYear"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-medium",
				children: "高预期观察"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "空间叙事强但估值约束或利润兑现不足，不进入年度核心。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockTable, {
				rows: yearWatch,
				scoreKey: "scoreYear"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, {})
		]
	});
}
//#endregion
export { YearPool as component };
