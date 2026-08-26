import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Disclaimer, l as useMarket } from "./router-BOy5JsEn.mjs";
import { n as StockTable, s as useWatchlist } from "./stock-table-Bk28CdSA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watch-DnqyJG60.js
var import_jsx_runtime = require_jsx_runtime();
function WatchPage() {
	const codes = useWatchlist((s) => s.codes);
	const stocks = useMarket((s) => s.stocks);
	const month = useMarket((s) => s.month);
	const yearCore = useMarket((s) => s.yearCore);
	const rows = stocks.filter((s) => codes.includes(s.code));
	const inMonth = rows.filter((s) => month.some((m) => m.code === s.code)).length;
	const inYear = rows.filter((s) => yearCore.some((m) => m.code === s.code)).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-medium tracking-tight",
				children: "自选对照"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "保存在本机。看评分漂移、是否仍在月年池，而不是跟单。"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-subtle",
							children: "自选"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "tabular text-xl",
							children: rows.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-subtle",
							children: "仍在月度池"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "tabular text-xl",
							children: inMonth
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-subtle",
							children: "仍在年度核心"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "tabular text-xl",
							children: inYear
						})]
					})
				]
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"还没有自选。去",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/quotes",
						className: "text-steel",
						children: "行情"
					}),
					" ",
					"点星号加入。"
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockTable, { rows }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { compact: true })
		]
	});
}
//#endregion
export { WatchPage as component };
