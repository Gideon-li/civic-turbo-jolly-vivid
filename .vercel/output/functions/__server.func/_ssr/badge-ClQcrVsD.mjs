import { z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as cn } from "./router-BOy5JsEn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-ClQcrVsD.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "neutral", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", {
			neutral: "bg-surface-2 text-muted border-border",
			up: "bg-up/12 text-up border-up/20",
			down: "bg-down/12 text-down border-down/20",
			steel: "bg-steel/12 text-steel border-steel/20",
			warn: "bg-warn/12 text-warn border-warn/25"
		}[tone], className),
		children
	});
}
//#endregion
export { Badge as t };
