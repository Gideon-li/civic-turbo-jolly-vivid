import { i as __toESM } from "../_runtime.mjs";
import { z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as Disclaimer, l as useMarket, o as matchesFilter, r as MODEL_VERSION } from "./router-BOy5JsEn.mjs";
import { t as Badge } from "./badge-ClQcrVsD.mjs";
import { a as countFilters, i as TagFilter, n as StockTable } from "./stock-table-Bk28CdSA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rank-S4xaQPK_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RankPage() {
	const stocks = useMarket((s) => s.stocks);
	const state = useMarket((s) => s.state);
	const [tag, setTag] = (0, import_react.useState)("全部");
	const counts = (0, import_react.useMemo)(() => countFilters(stocks), [stocks]);
	const ranked = [...stocks].filter((s) => matchesFilter(s, tag)).sort((a, b) => b.scoreDay - a.scoreDay);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-medium tracking-tight",
						children: "日评分"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Score_day = ",
							state.wT.toFixed(2),
							"×T + ",
							state.wN.toFixed(2),
							"×N + ",
							state.wF.toFixed(2),
							"×F_short + ",
							state.wP.toFixed(2),
							"×P。 现价偏离日预期区间时，单票与全市场权重都会下调技术、抬高质量。预期高低价是研究区间，不是推荐买点。"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "steel",
								children: state.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: MODEL_VERSION }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "warn",
								children: "高波动噪声"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagFilter, {
				value: tag,
				onChange: setTag,
				counts
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockTable, {
				rows: ranked,
				scoreKey: "scoreDay"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, {})
		]
	});
}
//#endregion
export { RankPage as component };
