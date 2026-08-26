import { i as __toESM } from "../_runtime.mjs";
import { z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as Disclaimer, c as tagsOf, l as useMarket, o as matchesFilter } from "./router-BOy5JsEn.mjs";
import { a as countFilters, i as TagFilter, n as StockTable } from "./stock-table-Bk28CdSA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quotes-DxgLB46E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuotesPage() {
	const stocks = useMarket((s) => s.stocks);
	const [q, setQ] = (0, import_react.useState)("");
	const [tag, setTag] = (0, import_react.useState)("全部");
	const counts = (0, import_react.useMemo)(() => countFilters(stocks), [stocks]);
	const rows = stocks.filter((s) => {
		const needle = q.trim();
		return (!needle || s.name.includes(needle) || s.code.includes(needle) || s.industry.includes(needle) || tagsOf(s).some((t) => t.includes(needle))) && matchesFilter(s, tag);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-medium tracking-tight",
				children: "行情"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "按市场与主题筛选。沪深=上证/深市主板；科创板、创业板、港股单独标注；新能源为车电锂电光伏链条。"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagFilter, {
				value: tag,
				onChange: setTag,
				counts
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "名称 / 代码 / 科创板 / 新能源 / 港股",
				className: "h-10 w-full rounded-md border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-steel/40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockTable, { rows }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { compact: true })
		]
	});
}
//#endregion
export { QuotesPage as component };
