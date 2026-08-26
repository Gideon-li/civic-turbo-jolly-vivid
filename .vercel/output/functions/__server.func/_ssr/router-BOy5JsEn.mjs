import { i as __toESM } from "../_runtime.mjs";
import { _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as UNIVERSE, t as INDICES } from "./universe-C26WLyNd.mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/disclaimer-DiVjmZZ9.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
function fmtNum(n, digits = 2) {
	if (!Number.isFinite(n)) return "—";
	return n.toLocaleString("zh-CN", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
}
function fmtPx(n) {
	if (!Number.isFinite(n)) return "—";
	const digits = Math.abs(n) >= 100 ? 2 : Math.abs(n) >= 10 ? 2 : 3;
	return n.toLocaleString("zh-CN", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
}
function fmtYi(n) {
	if (!Number.isFinite(n)) return "—";
	if (Math.abs(n) >= 1e4) return `${fmtNum(n / 1e4, 2)} 万亿`;
	return `${fmtNum(n, 0)} 亿`;
}
function fmtPct(n, digits = 2) {
	if (!Number.isFinite(n)) return "—";
	return `${n > 0 ? "+" : ""}${n.toFixed(digits)}%`;
}
function Disclaimer({ className, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-xs leading-relaxed text-subtle", className),
		children: compact ? "市场有风险。评分与观察池是研究辅助，不构成投资建议；过往回测不代表未来表现。" : "衡砚是个人研究台，不是持牌证券投资咨询。评分由技术、事件、质量、空间与规划五层因子合成。预期高低价是波动率推算的研究区间，不是目标价、买卖指令或收益承诺。市场有风险，决策请独立完成。"
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BOy5JsEn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Chg({ pct, className }) {
	if (pct === void 0 || !Number.isFinite(pct)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("tabular text-muted", className),
		children: "—"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("tabular font-medium", pct > 0 ? "text-up" : pct < 0 ? "text-down" : "text-muted", className),
		children: fmtPct(pct)
	});
}
function Px({ n, className }) {
	if (n === void 0 || !Number.isFinite(n)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("tabular text-muted", className),
		children: "—"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("tabular", className),
		children: fmtPx(n)
	});
}
function Score({ n, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("tabular font-medium", n >= 72 ? "text-steel" : n >= 55 ? "text-fg" : "text-muted", className),
		children: n.toFixed(1)
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[opacity,transform,background-color,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel/50 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			outline: "border border-border bg-transparent text-fg hover:bg-surface-2",
			ghost: "text-muted hover:bg-surface-2 hover:text-fg",
			up: "bg-up/15 text-up hover:bg-up/25"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var fetchQuotes = createServerFn({ method: "GET" }).handler(createSsrRpc("8e016c7e2f123b990dc2cce000b0a19e46d7ea6019eaa3ecd05246c16f996c47"));
var fetchKlines = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("e65347b9d06432aece37d17eccee06c36261edb44cdd32291d18262c4530b2fe"));
var PLAN_AS_OF = "2026-03";
var HORIZONS = {
	y5: {
		id: "15th",
		title: "五年：十五五",
		years: "2026–2030",
		lead: "建设现代化产业体系，科技自立自强，扩大内需，绿色转型。",
		source: "《国民经济和社会发展第十五个五年规划纲要》（2026年3月公布）"
	},
	y10: {
		id: "2035",
		title: "十年：到 2035",
		years: "至 2035",
		lead: "基本实现社会主义现代化，人均国内生产总值达到中等发达国家水平。",
		source: "二十大报告与十五五纲要衔接的 2035 远景目标"
	}
};
var GOALS_5Y = [
	{
		k: "主线",
		v: "高质量发展，不设五年 GDP 年均增速硬指标"
	},
	{
		k: "科技",
		v: "全社会研发投入强度继续提高，企业成为创新主体"
	},
	{
		k: "数字",
		v: "数字经济核心产业、算力网与「人工智能+」全面铺开"
	},
	{
		k: "产业",
		v: "保持制造业合理比重，传统产业升级 + 新兴/未来产业"
	},
	{
		k: "能源",
		v: "非化石能源消费比重提高到约 25%，新型能源基础设施"
	},
	{
		k: "绿色",
		v: "单位 GDP 二氧化碳排放持续下降，稳妥碳达峰"
	},
	{
		k: "内需",
		v: "提振消费、扩大有效投资，构建强大国内市场"
	},
	{
		k: "开放",
		v: "制度型开放、高质量共建「一带一路」、金融强国"
	}
];
var GOALS_10Y = [
	{
		k: "国力",
		v: "经济、科技、国防、综合国力和国际影响力大幅跃升"
	},
	{
		k: "收入",
		v: "人均 GDP 达到中等发达国家水平"
	},
	{
		k: "科技",
		v: "进入创新型国家前列，关键核心技术自主可控程度显著提高"
	},
	{
		k: "产业",
		v: "现代化产业体系成型，新质生产力成为增长主引擎"
	},
	{
		k: "绿色",
		v: "碳达峰后转向碳中和中期路径，美丽中国建设重大进展"
	},
	{
		k: "民生",
		v: "健康中国、共同富裕取得更为明显的实质性进展"
	},
	{
		k: "安全",
		v: "粮食、能源、产业链供应链与金融安全屏障巩固"
	},
	{
		k: "香港",
		v: "巩固国际金融/航运/贸易中心，建设国际创科中心"
	}
];
var PILLARS = [
	{
		id: "industry",
		title: "现代化产业体系",
		body: "智能化、绿色化、融合化。传统产业提质，新兴产业做大，前瞻布局未来产业：新能源、生物医药、生物制造、具身智能、低空经济。"
	},
	{
		id: "tech",
		title: "科技自立自强",
		body: "原始创新与关键核心技术攻关，集成电路、工业母机、基础软件、高端仪器。新质生产力由科技创新催生。"
	},
	{
		id: "digital",
		title: "数字中国 · 人工智能+",
		body: "算力网、数据要素、工业互联网。人工智能向制造、医疗、交通、政务渗透，不是单独炒作一条赛道。"
	},
	{
		id: "demand",
		title: "强大国内市场",
		body: "提振消费（服务消费、以旧换新、新场景）与有效投资（两重、设备更新、民间投资）。出口逻辑要对照内需。"
	},
	{
		id: "green",
		title: "全面绿色转型",
		body: "新型电力系统、非化石能源、节能改造、循环经济。高碳产能是约束项，绿电、储能、电网是五年兑现窗口。"
	},
	{
		id: "open",
		title: "开放与金融强国",
		body: "制度型开放、人民币产品、绿色金融。港股是跨境资本与「走出去」定价层，不是另一套基本面。"
	}
];
var IMPACTS = [
	{
		industry: "电子",
		theme: "科技自立 / 算力",
		y5: {
			dir: "受益",
			summary: "集成电路、先进封装、AI 芯片与设备是十五五攻关主轴，国产替代与算力资本开支共振。",
			points: [
				"晶圆代工与半导体设备享受国产化与扩产双重订单。",
				"光模块、服务器链受益于算力网和「人工智能+」。",
				"估值已部分透支政策叙事，要看产能与良率兑现。"
			]
		},
		y10: {
			dir: "受益",
			summary: "到 2035 年关键核心技术自主可控是国力指标，半导体从追赶转为体系能力。",
			points: ["成熟制程全球份额与先进制程受限并存。", "设备、材料、EDA 的国产率决定利润率。"]
		}
	},
	{
		industry: "计算机",
		theme: "人工智能+ / 信创",
		y5: {
			dir: "受益",
			summary: "人工智能向行业场景渗透，政务与工业软件是应用层，但订单节奏慢于硬件。",
			points: ["大模型应用与信创采购是五年政策增量。", "缺少算力或数据闭环的公司弹性有限。"]
		},
		y10: {
			dir: "受益",
			summary: "数智化成为基础设施，软件从项目制走向持续运营。",
			points: ["行业模型与工业软件壁垒高于通用聊天机器人。"]
		}
	},
	{
		industry: "通信",
		theme: "算力网 / 新型基建",
		y5: {
			dir: "受益",
			summary: "信息网络、算力网超前布局，光通信与无线设备是数字中国的管道。",
			points: ["东数西算与海内外云资本开支决定景气。", "运营商资本开支结构比 5G 周期更偏算力。"]
		},
		y10: {
			dir: "受益",
			summary: "网络强国目标要求自主可控的通信与算力底座。",
			points: ["技术迭代快，份额比主题更重要。"]
		}
	},
	{
		industry: "电力设备",
		theme: "新型能源系统",
		y5: {
			dir: "受益",
			summary: "非化石能源比重升至约 25%，电网、储能、光伏、锂电是五年兑现窗口。",
			points: ["新能源装机与电网投资确定性高于下游车。", "产能过剩会压盈利，政策保的是装机不是价格。"]
		},
		y10: {
			dir: "受益",
			summary: "碳中和中期路径要求新型电力系统成型，龙头份额向全球扩散。",
			points: ["技术路线切换（固态电池、钙钛矿）是十年变量。"]
		}
	},
	{
		industry: "汽车",
		theme: "新能源车 / 出海",
		y5: {
			dir: "受益",
			summary: "新能源汽车仍是新兴支柱，但国内价格战，增量在出海与智能化。",
			points: ["十五五强调产业健康有序，产能出清利于龙头。", "关税与海外工厂决定利润，不只看国内销量。"]
		},
		y10: {
			dir: "受益",
			summary: "到 2035 年电动智能汽车有望成为中国制造的全球名片之一。",
			points: ["智能化软件利润率可能超过硬件。", "品牌分化，后排企业难进十年核心。"]
		}
	},
	{
		industry: "机械设备",
		theme: "设备更新 / 交通强国",
		y5: {
			dir: "受益",
			summary: "大规模设备更新、工业母机、船舶与工程机械出海是实体经济抓手。",
			points: ["船舶周期与能源装备订单能见度高于地产链机械。", "国产工业母机是科技攻关，放量仍慢。"]
		},
		y10: {
			dir: "受益",
			summary: "制造强国要求装备升级换代贯穿十年。",
			points: ["全球份额比国内地产周期更决定十年空间。"]
		}
	},
	{
		industry: "医药生物",
		theme: "健康中国 / 生物医药",
		y5: {
			dir: "受益",
			summary: "生物医药被列为新兴产业，集采约束未消失，创新药与器械出海是弹性。",
			points: ["健康中国把支付与基层医疗做大，不是全面涨价。", "CXO 与创新药跟全球投融资周期绑定。"]
		},
		y10: {
			dir: "受益",
			summary: "人口老龄化使医疗成为十年需求最确定的内需之一。",
			points: ["创新管线与国际化能力决定谁留下。"]
		}
	},
	{
		industry: "公用事业",
		theme: "绿电 / 能源安全",
		y5: {
			dir: "受益",
			summary: "水电、核电、电网侧是新型能源基础设施的压舱石，盈利比主题股更稳。",
			points: ["电价与来水是波动源，政策方向明确。"]
		},
		y10: {
			dir: "受益",
			summary: "碳中和路径中，稳定的非化石电源资产稀缺。",
			points: ["抽蓄、核电长期资本开支可见。"]
		}
	},
	{
		industry: "有色金属",
		theme: "资源安全 / 新能源金属",
		y5: {
			dir: "受益",
			summary: "铜、金与能源金属对应电网、军工与储备，政策偏资源安全保障。",
			points: ["价格周期仍主导，规划只提供需求底。"]
		},
		y10: {
			dir: "中性",
			summary: "十年维度看全球资本开支与价格中枢，政策不能消灭周期。",
			points: ["一体化矿山比纯冶炼更符合安全逻辑。"]
		}
	},
	{
		industry: "煤炭",
		theme: "达峰约束 / 托底保供",
		y5: {
			dir: "约束",
			summary: "稳妥碳达峰，煤炭消费占比下降，但能源安全要求产量托底。",
			points: ["高红利、低增长是五年基准假设。", "煤电联营与转型项目质量参差。"]
		},
		y10: {
			dir: "约束",
			summary: "十年维度需求中枢下移，估值应按衰退/成熟现金处理。",
			points: ["不能把保供政策读成成长空间。"]
		}
	},
	{
		industry: "银行",
		theme: "金融强国 / 服务实体",
		y5: {
			dir: "中性",
			summary: "金融强国强调服务实体与风险收敛，息差承压，零售与财富是结构亮点。",
			points: ["基建与设备更新带来信贷，地产仍是资产质量变量。"]
		},
		y10: {
			dir: "中性",
			summary: "十年看净息差中枢与不良生成，难当新质生产力主线。",
			points: ["分红与财富管理比规模扩张更重要。"]
		}
	},
	{
		industry: "非银金融",
		theme: "资本市场 / 居民财富",
		y5: {
			dir: "中性",
			summary: "提高直接融资比重、活跃资本市场，券商与财富管理受益制度，但贝塔仍大。",
			points: ["政策是空间假设，成交额才是兑现。"]
		},
		y10: {
			dir: "受益",
			summary: "居民资产从房产向金融迁移是十年慢变量。",
			points: ["龙头平台比通道型券商更贴这条曲线。"]
		}
	},
	{
		industry: "食品饮料",
		theme: "消费提振 / 人口约束",
		y5: {
			dir: "中性",
			summary: "提振消费与品牌引领利好优质消费品，但反浪费、年轻人口与渠道库存压制量价。",
			points: ["高端白酒看商务与宴席修复，不是规划点名赛道。"]
		},
		y10: {
			dir: "中性",
			summary: "人口总量见顶，量靠结构升级与下沉，利润靠定价权。",
			points: ["现金流资产，空间分不应按科技成长给。"]
		}
	},
	{
		industry: "家用电器",
		theme: "以旧换新 / 出海",
		y5: {
			dir: "受益",
			summary: "消费品以旧换新仍在十五五投资与消费工具箱里，叠加出海。",
			points: ["补贴退坡后看更新周期与海外工厂。"]
		},
		y10: {
			dir: "中性",
			summary: "国内保有量饱和，十年增长看全球份额与智能化。",
			points: ["家电龙头更像全球制造平台。"]
		}
	},
	{
		industry: "互联网",
		theme: "数字中国 / 内需平台",
		y5: {
			dir: "受益",
			summary: "数字经济与服务消费是内需抓手，平台企业从监管出清转向有序发展。",
			points: ["广告、即时零售、云是五年兑现层。", "港股定价，和 A 股互联网券商拥挤不同。"]
		},
		y10: {
			dir: "受益",
			summary: "国内市场平台 + 国际化，是新发展格局的消费基础设施。",
			points: ["反垄断与数据安全是长期约束，不是短期主题。"]
		}
	},
	{
		industry: "交通运输",
		theme: "现代物流 / 有效投资",
		y5: {
			dir: "中性",
			summary: "物流降本、有效投资与消费修复带来件量，价格战仍在。",
			points: ["快递龙头看份额与成本，不是规划弹性品种。"]
		},
		y10: {
			dir: "中性",
			summary: "网络效应稳，增速随名义消费。",
			points: ["跨境与供应链服务是增量。"]
		}
	},
	{
		industry: "农林牧渔",
		theme: "粮食安全 / 乡村振兴",
		y5: {
			dir: "中性",
			summary: "粮食与重要农产品稳产保供是安全项，猪周期不因规划消失。",
			points: ["规模化养殖符合政策，盈利仍看供给。"]
		},
		y10: {
			dir: "中性",
			summary: "蛋白质需求随人口与结构缓慢变化。",
			points: ["成本曲线领先者才有十年位置。"]
		}
	},
	{
		industry: "房地产",
		theme: "高质量发展 / 租购并举",
		y5: {
			dir: "约束",
			summary: "推动房地产高质量发展，多主体供给、租购并举，不再作为短期刺激引擎。",
			points: ["销售与开工中枢下移是五年基准。", "城市分化，不能把保交楼读成行业反转。"]
		},
		y10: {
			dir: "约束",
			summary: "人口与城镇化速率决定十年需求，行业从增量开发转向存量与保障。",
			points: ["研究宇宙中默认风险样本，不进成长空间推荐。"]
		}
	}
];
function impactForIndustry(industry) {
	return IMPACTS.find((i) => i.industry === industry);
}
function dirTone(dir) {
	if (dir === "受益") return "steel";
	if (dir === "约束") return "warn";
	return "neutral";
}
function dirScore(dir) {
	if (dir === "受益") return 78;
	if (dir === "约束") return 26;
	return 50;
}
function planScores(industry) {
	const row = impactForIndustry(industry);
	const p5 = dirScore(row?.y5.dir ?? "中性");
	const p10 = dirScore(row?.y10.dir ?? "中性");
	return {
		p5,
		p10,
		pDay: .55 * p5 + 22.5,
		pMonth: .7 * p5 + .3 * p10,
		pYear: .32 * p5 + .68 * p10,
		dir5: row?.y5.dir ?? "中性",
		dir10: row?.y10.dir ?? "中性"
	};
}
function nz(n) {
	return Number.isFinite(n) ? n : 0;
}
function round1(n) {
	return Math.round(n * 10) / 10;
}
function roundPx(n) {
	if (!Number.isFinite(n) || n <= 0) return NaN;
	const d = n >= 100 ? 100 : n >= 10 ? 100 : 1e3;
	return Math.round(n * d) / d;
}
function inferMarketState(indexPct, breadthUp) {
	const hs = nz(indexPct["sh000300"]);
	const cyb = nz(indexPct["sz399006"]);
	const kc = nz(indexPct["sh000688"]);
	const avg = (hs + cyb + kc) / 3;
	const base = {
		wP: .08,
		overBand: 0,
		underBand: 0
	};
	if (avg >= .7 && breadthUp >= .55 && kc > hs) return {
		label: "趋势偏多",
		tone: "up",
		style: "成长 / 科创占优",
		crowd: "中高",
		wT: .44,
		wN: .3,
		wF: .18,
		...base,
		note: "指数共振向上且科创强于沪深300，日评分提高技术与事件权重；规划因子仍约束追高。"
	};
	if (avg <= -.8 || breadthUp < .38) return {
		label: "拥挤回撤",
		tone: "down",
		style: "质量 / 低波",
		crowd: "回落",
		wT: .2,
		wN: .26,
		wF: .46,
		...base,
		note: "市场转弱，日评分提高质量与规划；观察池只做风险剔除，不因反弹追高。"
	};
	return {
		label: "震荡修复",
		tone: "flat",
		style: "大小盘均衡",
		crowd: "中性",
		wT: .28,
		wN: .23,
		wF: .41,
		...base,
		note: "趋势未完全展开，日评分偏向质量与规划兑现；成长股需要基本面确认才进入月度池。"
	};
}
function stageBonus(stage) {
	switch (stage) {
		case "加速成长": return 18;
		case "稳健成长": return 12;
		case "导入培育": return 4;
		case "成熟现金": return -2;
		case "衰退出清": return -22;
	}
}
function layerT(s, livePct) {
	const trend = (s.adx - 18) * .55 + s.mom20 * 1.15;
	const osc = (s.rsi - 50) * .22;
	const crowdPenalty = Math.abs(s.turnBias) * 7;
	const live = clamp(livePct * 3.2, -12, 12);
	return clamp(52 + trend + osc - crowdPenalty + live - Math.max(0, s.bias20) * .4, 6, 96);
}
function layerF(s) {
	const growth = s.revYoy * .55 + s.npYoy * .35;
	const quality = (s.roe - 8) * 1.15 + (s.cfoToNp - .8) * 10;
	return clamp(38 + growth + quality + stageBonus(s.stage), 4, 96);
}
function layerFShort(s) {
	return clamp(45 + s.npYoy * .5 + (s.revYoy - s.npYoy) * .15, 8, 92);
}
function layerS(s) {
	return clamp((s.industrySpace * .32 + s.elasticity * .26 + s.delivery * .26 + (100 - s.valuationDrag) * .16) * (s.pePercentile >= 90 ? .84 : s.pePercentile >= 80 ? .92 : 1), 5, 96);
}
function dayLimit(s) {
	if (s.st) return .05;
	if (s.board === "创业板" || s.board === "科创板") return .2;
	if (s.board === "港股") return .12;
	return .1;
}
function expectBands(s, quote, p5, p10, f) {
	const px = quote?.price;
	const prev = quote?.prev;
	if (!px || !Number.isFinite(px) || px <= 0) return void 0;
	const vol = clamp(s.vol20, 12, 58) / 100;
	const lim = dayLimit(s);
	const ref = Number.isFinite(prev) && prev > 0 ? prev : px;
	const quality = (f - 50) / 50;
	const planM = (p5 - 50) / 50;
	const planY = (p10 - 50) / 50;
	const muDay = clamp(planM * .003 + quality * .002, -.012, .016);
	const muMonth = clamp(planM * .045 + quality * .03 + s.mom20 / 100 * .12, -.12, .2);
	let muYear = clamp(planY * .14 + quality * .1 + s.revYoy / 100 * .22, -.3, .55);
	if (s.stage === "加速成长") muYear += .04;
	if (s.stage === "衰退出清") muYear -= .12;
	if (s.stage === "成熟现金") muYear = Math.min(muYear, .12);
	const sigD = vol / Math.sqrt(252);
	const sigM = vol * Math.sqrt(21 / 252);
	const sigY = vol;
	const capHigh = ref * (1 + lim);
	const capLow = ref * (1 - lim);
	let dayHigh = Math.min(capHigh, ref * (1 + muDay + 1.15 * sigD));
	let dayLow = Math.max(capLow, ref * (1 + muDay - 1.15 * sigD));
	if (dayHigh <= dayLow) {
		dayHigh = Math.min(capHigh, ref * 1.012);
		dayLow = Math.max(capLow, ref * .988);
	}
	const monthMid = px * Math.exp(muMonth);
	const yearMid = px * Math.exp(muYear);
	let yearHigh = px * Math.exp(muYear + 1.05 * sigY);
	let yearLow = px * Math.exp(muYear - 1.15 * sigY);
	if (s.stage === "导入培育") yearHigh *= 1.06;
	if (s.stage === "衰退出清") yearHigh = Math.min(yearHigh, px * 1.18);
	const band = (low, high, mid) => ({
		low: roundPx(low),
		high: roundPx(high),
		mid: roundPx(mid)
	});
	return {
		day: band(dayLow, dayHigh, ref * (1 + muDay)),
		month: band(px * Math.exp(muMonth - 1.15 * sigM), px * Math.exp(muMonth + 1.15 * sigM), monthMid),
		year: band(yearLow, yearHigh, yearMid)
	};
}
function bandSide(px, band) {
	if (!px || !band || !Number.isFinite(px) || !Number.isFinite(band.low) || !Number.isFinite(band.high)) return "na";
	if (px > band.high * 1.002) return "above";
	if (px < band.low * .998) return "below";
	return "inside";
}
function renormalize(w) {
	const t = Math.max(.08, w.wT);
	const n = Math.max(.08, w.wN);
	const f = Math.max(.12, w.wF);
	const p = Math.max(.05, w.wP);
	const s = t + n + f + p;
	return {
		wT: t / s,
		wN: n / s,
		wF: f / s,
		wP: p / s
	};
}
function adaptWeights(base, over, under, n) {
	const overRatio = n ? over / n : 0;
	const underRatio = n ? under / n : 0;
	let { wT, wN, wF, wP } = base;
	let note = base.note;
	if (overRatio >= .22) {
		wT -= .1;
		wN -= .03;
		wF += .06;
		wP += .07;
		note = `样本 ${over} 只升破日预期上沿，下调技术权重、上调质量与规划，抑制把涨停叙事送进月年池。`;
	} else if (underRatio >= .22) {
		wT -= .06;
		wN += .02;
		wF += .05;
		wP += .01;
		note = `样本 ${under} 只跌破日预期下沿，降低动量、提高质量。规划受益且质量高的，月度分不完全跟跌。`;
	} else if (over + under > 0) note = `${base.note} 区间偏离 ${over} 上 / ${under} 下，权重小幅跟随，不改月年结构。`;
	return {
		...base,
		...renormalize({
			wT,
			wN,
			wF,
			wP
		}),
		overBand: over,
		underBand: under,
		note
	};
}
function localDayWeights(st, side) {
	let { wT, wN, wF, wP } = st;
	if (side === "above") {
		wT *= .8;
		wF *= 1.14;
		wP *= 1.1;
	} else if (side === "below") {
		wT *= .86;
		wN *= 1.06;
		wF *= 1.1;
	}
	return renormalize({
		wT,
		wN,
		wF,
		wP
	});
}
function hint(s, t, f, space, yearCore, side) {
	if (s.veto) return `一票否决：${s.vetoReason ?? "风险项"}。不进入任何观察池。`;
	if (side === "above") return "现价升破日预期上沿，下调当日技术权重；月年结论仍看质量、空间与规划，不把冲高当加仓信号。";
	if (side === "below" && f >= 65) return "现价跌破日预期下沿，但质量仍在。短线降权，中长期观察池不因一日波动除名。";
	if (side === "below") return "现价跌破日预期下沿且质量一般，日评分与月度分同步降权。";
	if (s.stage === "衰退出清") return "成长阶段为出清，短线波动不改变中长期空间假设。";
	if (s.stage === "导入培育") return "仍处导入/培育，只进主题观察，不进年度核心池。";
	if (s.pePercentile >= 90) return "空间叙事强但估值分位过高，仅列入高预期观察。";
	if (yearCore && space >= 70 && f >= 65) return "质量、空间与规划同时靠前，优先看月年池解释，而不是日评分。";
	if (t >= 75 && f < 55) return "短线分偏高、基本面一般，警惕把热点送进中长期名单。";
	if (f >= 70 && t < 45) return "质量仍在，短线偏弱，更适合中长期对照而非追涨。";
	return "分数需拆开看：日评分描述噪声，月年池表达成长空间与规划因子。";
}
function factorsOf(s, t, n, f, space, p5, p10, st) {
	return [
		{
			key: "mom20",
			label: "20日动量",
			layer: "T",
			value: s.mom20,
			weight: st.wT * .35
		},
		{
			key: "adx",
			label: "ADX 趋势",
			layer: "T",
			value: s.adx,
			weight: st.wT * .25
		},
		{
			key: "rsi",
			label: "RSI",
			layer: "T",
			value: s.rsi,
			weight: st.wT * .2
		},
		{
			key: "turn",
			label: "换手拥挤",
			layer: "T",
			value: s.turnBias,
			weight: st.wT * .2
		},
		{
			key: "news",
			label: "事件情绪",
			layer: "N",
			value: n,
			weight: st.wN
		},
		{
			key: "rev",
			label: "收入增速",
			layer: "F",
			value: s.revYoy,
			weight: .16
		},
		{
			key: "np",
			label: "利润增速",
			layer: "F",
			value: s.npYoy,
			weight: .14
		},
		{
			key: "roe",
			label: "ROE",
			layer: "F",
			value: s.roe,
			weight: .12
		},
		{
			key: "space",
			label: "行业空间",
			layer: "S",
			value: s.industrySpace,
			weight: .16
		},
		{
			key: "el",
			label: "公司弹性",
			layer: "S",
			value: s.elasticity,
			weight: .12
		},
		{
			key: "del",
			label: "兑现能力",
			layer: "S",
			value: s.delivery,
			weight: .1
		},
		{
			key: "plan5",
			label: "规划五年",
			layer: "P",
			value: p5,
			weight: .12
		},
		{
			key: "plan10",
			label: "规划十年",
			layer: "P",
			value: p10,
			weight: .16
		},
		{
			key: "tScore",
			label: "技术综合",
			layer: "T",
			value: t,
			weight: st.wT
		},
		{
			key: "fScore",
			label: "质量综合",
			layer: "F",
			value: f,
			weight: .3
		},
		{
			key: "sScore",
			label: "空间综合",
			layer: "S",
			value: space,
			weight: .28
		}
	];
}
function scoreOne(s, quote, st) {
	const livePct = quote?.pct ?? 0;
	const t = layerT(s, livePct);
	const t20 = clamp(t - livePct * 1.2 + s.mom20 * .4, 6, 96);
	const n = clamp(s.newsScore + (livePct > 3 ? 4 : 0), 5, 95);
	const n20 = s.newsScore20;
	const f = layerF(s);
	const fShort = layerFShort(s);
	const space = layerS(s);
	const ps = planScores(s.industry);
	const bands = expectBands(s, quote, ps.p5, ps.p10, f);
	const daySide = bandSide(quote?.price, bands?.day);
	const monthSide = bandSide(quote?.price, bands?.month);
	const yearSide = bandSide(quote?.price, bands?.year);
	const w = localDayWeights(st, daySide);
	let scoreDay = clamp(w.wT * t + w.wN * n + w.wF * fShort + w.wP * ps.pDay, 5, 96);
	let scoreMonth = clamp(.12 * t20 + .12 * n20 + .3 * f + .28 * space + .18 * ps.pMonth, 5, 96);
	let scoreYear = clamp(.08 * s.trendStab + .32 * f + .38 * space + .22 * ps.pYear, 5, 96);
	if (daySide === "above") {
		scoreDay -= 3.2;
		scoreMonth -= 1.1;
	} else if (daySide === "below") {
		scoreDay -= 2.4;
		if (f >= 65 && space >= 60 && ps.p5 >= 60) scoreMonth += 1.4;
		else scoreMonth -= 2.2;
	}
	if (monthSide === "above" && s.pePercentile >= 80) scoreYear -= 2.5;
	scoreDay = clamp(scoreDay, 5, 96);
	scoreMonth = clamp(scoreMonth, 5, 96);
	scoreYear = clamp(scoreYear, 5, 96);
	const yearCore = !s.veto && !s.st && !s.newIpo && (s.stage === "加速成长" || s.stage === "稳健成长") && s.pePercentile < 90 && space >= 58 && f >= 55 && ps.p10 >= 42 && yearSide !== "above";
	return {
		...s,
		quote,
		t: round1(t),
		n: round1(n),
		f: round1(f),
		s: round1(space),
		p: round1(ps.pMonth),
		p5: round1(ps.p5),
		p10: round1(ps.p10),
		t20: round1(t20),
		n20: round1(n20),
		fShort: round1(fShort),
		scoreDay: round1(scoreDay),
		scoreMonth: round1(scoreMonth),
		scoreYear: round1(scoreYear),
		yearCore,
		hint: hint(s, t, f, space, yearCore, daySide),
		factors: factorsOf(s, t, n, f, space, ps.p5, ps.p10, st),
		bands,
		daySide,
		monthSide,
		yearSide
	};
}
function scoreUniverse(quotes) {
	const indexPct = {};
	for (const [k, q] of Object.entries(quotes)) if (k.startsWith("sh000") || k.startsWith("sz399") || k.startsWith("bj899")) indexPct[k] = q.pct;
	const breadthUp = UNIVERSE.filter((s) => (quotes[s.symbol]?.pct ?? 0) > 0).length / UNIVERSE.length;
	const base = inferMarketState(indexPct, breadthUp);
	let over = 0;
	let under = 0;
	let counted = 0;
	for (const s of UNIVERSE) {
		const q = quotes[s.symbol];
		if (!q?.price) continue;
		const f = layerF(s);
		const ps = planScores(s.industry);
		const bands = expectBands(s, q, ps.p5, ps.p10, f);
		const side = bandSide(q.price, bands?.day);
		if (side === "na") continue;
		counted += 1;
		if (side === "above") over += 1;
		if (side === "below") under += 1;
	}
	const state = adaptWeights(base, over, under, counted);
	return {
		state,
		stocks: UNIVERSE.map((s) => scoreOne(s, quotes[s.symbol], state)).sort((a, b) => b.scoreDay - a.scoreDay),
		breadthUp
	};
}
function monthlyPool(stocks, size = 28) {
	const eligible = stocks.filter((s) => !s.veto && !s.st && !s.newIpo && !s.auditIssue && (s.stage === "加速成长" || s.stage === "稳健成长") && s.s >= 58 && s.p5 >= 40);
	eligible.sort((a, b) => b.scoreMonth - a.scoreMonth);
	const picked = [];
	const industryCount = {};
	const capBucket = {
		大: 0,
		中: 0,
		小: 0
	};
	for (const s of eligible) {
		if (picked.length >= size) break;
		const ic = industryCount[s.industry] ?? 0;
		if ((ic + 1) / size > .25) continue;
		const cap = s.quote?.capYi ?? 0;
		const bucket = cap >= 5e3 ? "大" : cap >= 1500 ? "中" : "小";
		if (capBucket[bucket] / size > .5 && bucket === "小") continue;
		picked.push(s);
		industryCount[s.industry] = ic + 1;
		capBucket[bucket] += 1;
	}
	return picked;
}
function yearlyPool(stocks, size = 20) {
	return {
		core: stocks.filter((s) => s.yearCore).sort((a, b) => b.scoreYear - a.scoreYear).slice(0, size),
		watch: stocks.filter((s) => !s.yearCore && (s.stage === "加速成长" || s.stage === "导入培育") && s.s >= 70).sort((a, b) => b.scoreYear - a.scoreYear).slice(0, 8)
	};
}
var seeded = scoreUniverse({});
var seededYear = yearlyPool(seeded.stocks);
var useMarket = create((set) => ({
	loading: false,
	quotes: {},
	stocks: seeded.stocks,
	state: seeded.state,
	breadthUp: seeded.breadthUp,
	indices: INDICES.map((i) => ({ ...i })),
	month: monthlyPool(seeded.stocks),
	yearCore: seededYear.core,
	yearWatch: seededYear.watch,
	live: false,
	refresh: async () => {
		try {
			const res = await fetchQuotes();
			const scored = scoreUniverse(res.quotes);
			const month = monthlyPool(scored.stocks);
			const year = yearlyPool(scored.stocks);
			set({
				loading: false,
				error: res.ok ? void 0 : res.error,
				asOf: res.asOf,
				live: res.ok,
				quotes: res.quotes,
				stocks: scored.stocks,
				state: scored.state,
				breadthUp: scored.breadthUp,
				indices: INDICES.map((i) => ({
					...i,
					quote: res.quotes[i.symbol]
				})),
				month,
				yearCore: year.core,
				yearWatch: year.watch
			});
		} catch (e) {
			set({
				loading: false,
				live: false,
				error: e instanceof Error ? e.message : "行情同步失败"
			});
		}
	}
}));
/** 新能源产业链（车/电/锂电/光伏/电控） */
var ENERGY = /* @__PURE__ */ new Set([
	"300750",
	"002594",
	"601127",
	"300274",
	"601012",
	"300014",
	"300124",
	"01211",
	"02015"
]);
/** A+H 或港股通标的，便于对照两地 */
var CONNECT = /* @__PURE__ */ new Set([
	"600036",
	"601318",
	"000333",
	"002594",
	"300750",
	"688981",
	"603259",
	"000063",
	"01211",
	"00981"
]);
var MARKET_FILTERS = [
	"全部",
	"沪深",
	"科创板",
	"创业板",
	"港股",
	"新能源"
];
function marketLabel(board) {
	if (board === "深市主板") return "深市";
	return board;
}
function tagsOf(s) {
	const tags = [marketLabel(s.board)];
	if (s.board === "沪市" || s.board === "深市主板") tags.unshift("沪深");
	if (ENERGY.has(s.code)) tags.push("新能源");
	if (CONNECT.has(s.code)) tags.push("港股通");
	return tags;
}
function displayTags(s) {
	return tagsOf(s).filter((t) => t !== "沪深");
}
function matchesFilter(s, f) {
	if (f === "全部") return true;
	return tagsOf(s).includes(f);
}
function tagTone(tag) {
	if (tag === "科创板" || tag === "港股") return "steel";
	if (tag === "创业板" || tag === "新能源") return "warn";
	if (tag === "港股通") return "down";
	return "neutral";
}
var MODEL_VERSION = "HY-20260826-E";
var NAV = [
	{
		to: "/",
		label: "总览"
	},
	{
		to: "/quotes",
		label: "行情"
	},
	{
		to: "/rank",
		label: "日评分"
	},
	{
		to: "/pool/month",
		label: "月度池"
	},
	{
		to: "/pool/year",
		label: "年度池"
	},
	{
		to: "/news",
		label: "新闻"
	},
	{
		to: "/plan",
		label: "规划"
	},
	{
		to: "/watch",
		label: "自选"
	},
	{
		to: "/method",
		label: "方法"
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const refresh = useMarket((s) => s.refresh);
	const loading = useMarket((s) => s.loading);
	const indices = useMarket((s) => s.indices);
	const live = useMarket((s) => s.live);
	const stocks = useMarket((s) => s.stocks);
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		refresh();
		const t = window.setInterval(() => void refresh(), 6e4);
		return () => window.clearInterval(t);
	}, [refresh]);
	const hits = (0, import_react.useMemo)(() => {
		const s = q.trim();
		if (!s) return [];
		return stocks.filter((x) => x.name.includes(s) || x.code.includes(s) || x.industry.includes(s) || tagsOf(x).some((t) => t.includes(s))).slice(0, 8);
	}, [q, stocks]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh overflow-x-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "flex shrink-0 items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-lg tracking-tight text-fg",
									children: "衡砚"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-xs text-muted sm:inline",
									children: "研究台"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto lg:flex",
								children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: n.to,
									className: cn("rounded-sm px-2.5 py-1.5 text-sm transition-colors duration-150", pathname === n.to ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"),
									children: n.label
								}, n.to))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative ml-auto w-36 sm:w-52",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: q,
									onChange: (e) => setQ(e.target.value),
									placeholder: "代码 / 名称 / 科创",
									className: "h-9 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none placeholder:text-subtle focus:ring-2 focus:ring-steel/40"
								}), hits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-10 right-0 left-0 overflow-hidden rounded-md border border-border bg-bg-elevated shadow-panel",
									children: hits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/stock/$code",
										params: { code: h.code },
										onClick: () => setQ(""),
										className: "flex items-center justify-between px-3 py-2 text-sm hover:bg-surface-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											h.name,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted",
												children: h.code
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chg, { pct: h.quote?.pct })]
									}, h.code))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 gap-4 overflow-x-auto border-t border-border px-4 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("shrink-0 tabular", live ? "text-steel" : "text-warn"),
							children: loading ? "同步中" : live ? "公开快照" : "研究快照"
						}), indices.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex shrink-0 items-center gap-2 text-muted",
							children: [
								i.name,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular text-fg",
									children: i.quote ? i.quote.price.toFixed(2) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chg, { pct: i.quote?.pct })
							]
						}, i.symbol))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex min-w-0 gap-1 overflow-x-auto border-t border-border px-2 py-1 lg:hidden",
						children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: n.to,
							className: cn("flex h-11 shrink-0 items-center rounded-sm px-3 text-sm", pathname === n.to ? "bg-surface-2 text-fg" : "text-muted"),
							children: n.label
						}, n.to))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-6xl px-4 py-6",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mx-auto max-w-6xl px-4 pb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-bg-elevated px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["模型 ", MODEL_VERSION] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								className: "h-8",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/plan",
									children: "中长期规划"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								className: "h-8",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/method",
									children: "查看方法说明"
								})
							})
						]
					})]
				})
			})
		]
	});
}
var styles_default = "/assets/styles-CtXdjp8z.css";
var APP_NAME = "衡砚研究";
var Route$10 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#090b0e"
			},
			{
				name: "description",
				content: "A股数据与中长期研究评分工具。观察池不构成投资建议。"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;600&family=Noto+Serif+SC:wght@500;600&display=swap"
			}
		]
	}),
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "zh-CN",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$9 = () => import("./routes-BstykZ2i.mjs");
var Route$9 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./method-Cg5vTTr6.mjs");
var Route$8 = createFileRoute("/method")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./news-CiFVE2qx.mjs");
var Route$7 = createFileRoute("/news")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./plan-BuYotPdN.mjs");
var Route$6 = createFileRoute("/plan")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./quotes-DxgLB46E.mjs");
var Route$5 = createFileRoute("/quotes")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./rank-S4xaQPK_.mjs");
var Route$4 = createFileRoute("/rank")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./watch-DnqyJG60.mjs");
var Route$3 = createFileRoute("/watch")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./pool.month-DXc8lMrN.mjs");
var Route$2 = createFileRoute("/pool/month")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./pool.year-XMgjmPzI.mjs");
var Route$1 = createFileRoute("/pool/year")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./stock._code-C3v9_Dv0.mjs");
var Route = createFileRoute("/stock/$code")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	MethodRoute: Route$8.update({
		id: "/method",
		path: "/method",
		getParentRoute: () => Route$10
	}),
	NewsRoute: Route$7.update({
		id: "/news",
		path: "/news",
		getParentRoute: () => Route$10
	}),
	PlanRoute: Route$6.update({
		id: "/plan",
		path: "/plan",
		getParentRoute: () => Route$10
	}),
	QuotesRoute: Route$5.update({
		id: "/quotes",
		path: "/quotes",
		getParentRoute: () => Route$10
	}),
	RankRoute: Route$4.update({
		id: "/rank",
		path: "/rank",
		getParentRoute: () => Route$10
	}),
	WatchRoute: Route$3.update({
		id: "/watch",
		path: "/watch",
		getParentRoute: () => Route$10
	}),
	PoolMonthRoute: Route$2.update({
		id: "/pool/month",
		path: "/pool/month",
		getParentRoute: () => Route$10
	}),
	PoolYearRoute: Route$1.update({
		id: "/pool/year",
		path: "/pool/year",
		getParentRoute: () => Route$10
	}),
	StockCodeRoute: Route.update({
		id: "/stock/$code",
		path: "/stock/$code",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Disclaimer as C, fmtPct as D, fmtNum as E, fmtPx as O, Score as S, cn as T, impactForIndustry as _, displayTags as a, Chg as b, tagsOf as c, GOALS_5Y as d, HORIZONS as f, dirTone as g, PLAN_AS_OF as h, MARKET_FILTERS as i, fmtYi as k, useMarket as l, PILLARS as m, Route as n, matchesFilter as o, IMPACTS as p, MODEL_VERSION as r, tagTone as s, router_exports as t, GOALS_10Y as u, fetchKlines as v, clamp as w, Px as x, Button as y };
