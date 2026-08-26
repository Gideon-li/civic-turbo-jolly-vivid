import { i as __toESM } from "../_runtime.mjs";
import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as findName } from "./universe-C26WLyNd.mjs";
import { C as Disclaimer } from "./router-BOy5JsEn.mjs";
import { t as Badge } from "./badge-ClQcrVsD.mjs";
import { t as NEWS } from "./news-ZdPJ3gXL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-CiFVE2qx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewsPage() {
	const [kind, setKind] = (0, import_react.useState)("全部");
	const kinds = [
		"全部",
		"公告",
		"政策",
		"公司",
		"宏观",
		"市场"
	];
	const rows = NEWS.filter((n) => kind === "全部" || n.kind === kind);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-medium tracking-tight",
				children: "新闻与事件"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "公告权重大于评论。标记「空间假设」的事件会进入中长期评分，而不是只抬日评分。"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: kinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setKind(k),
					className: `h-9 rounded-full border px-3 text-sm ${kind === k ? "border-steel bg-surface-2 text-fg" : "border-border text-muted"}`,
					children: k
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: rows.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-border bg-bg-elevated p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 text-xs text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular",
									children: n.time
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.source }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: n.kind }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									tone: n.sentiment >= 0 ? "up" : "down",
									children: [n.sentiment >= 0 ? "+" : "", n.sentiment]
								}),
								n.spaceFlag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "warn",
									children: "空间假设"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.impact })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-base font-medium",
							children: n.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: n.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: n.codes.map((c) => {
								const name = findName(c);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/stock/$code",
									params: { code: c },
									className: "text-sm text-steel hover:underline",
									children: name?.name ?? c
								}, c);
							})
						})
					]
				}, n.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { compact: true })
		]
	});
}
//#endregion
export { NewsPage as component };
