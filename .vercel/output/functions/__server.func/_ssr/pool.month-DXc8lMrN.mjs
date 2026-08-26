import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Disclaimer, l as useMarket, r as MODEL_VERSION } from "./router-BOy5JsEn.mjs";
import { n as StockTable } from "./stock-table-Bk28CdSA.mjs";
import { t as NavChart } from "./nav-chart-DBPhgh12.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pool.month-DXc8lMrN.js
var import_jsx_runtime = require_jsx_runtime();
function MonthPool() {
	const month = useMarket((s) => s.month);
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
						children: "月度观察池"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm text-muted",
						children: "硬条件：加速或稳健成长，空间与规划分不低于阈值。综合分 0.12×T20 + 0.12×N20 + 0.30×F + 0.28×S + 0.18×P₅。升破日预期上沿会降权，避免把冲高送进月度池。行业上限 25%。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-subtle",
						children: [
							MODEL_VERSION,
							" · ",
							month.length,
							" 只 ·",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pool/year",
								className: "text-steel",
								children: "年度池"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavChart, { kind: "month" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockTable, {
				rows: month,
				scoreKey: "scoreMonth"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, {})
		]
	});
}
//#endregion
export { MonthPool as component };
