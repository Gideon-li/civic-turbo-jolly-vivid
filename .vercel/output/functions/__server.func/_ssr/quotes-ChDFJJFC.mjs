import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { n as UNIVERSE, t as INDICES } from "./universe-C26WLyNd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quotes-ChDFJJFC.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function num(v) {
	const n = Number(v);
	return Number.isFinite(n) ? n : NaN;
}
function parseQuotes(raw) {
	const out = {};
	for (const line of raw.split(";")) {
		const m = line.match(/v_([a-z]{2}\d+)="(.*)"/);
		if (!m) continue;
		const symbol = m[1];
		const f = m[2].split("~");
		const q = {
			symbol,
			code: f[2] ?? "",
			price: num(f[3]),
			prev: num(f[4]),
			open: num(f[5]),
			high: num(f[33]),
			low: num(f[34]),
			change: num(f[31]),
			pct: num(f[32]),
			volume: num(f[6]),
			amountWan: num(f[37]),
			turnover: num(f[38]),
			pe: num(f[39]),
			pb: num(f[46]),
			capYi: num(f[45]),
			circYi: num(f[44]),
			time: f[30] ?? ""
		};
		if (Number.isFinite(q.price)) out[symbol] = q;
	}
	return out;
}
async function fetchTencent(symbols) {
	const url = `https://qt.gtimg.cn/q=${symbols.join(",")}`;
	const res = await fetch(url, {
		headers: {
			Referer: "https://finance.qq.com/",
			"User-Agent": "Mozilla/5.0 HengyanResearch"
		},
		signal: AbortSignal.timeout(6e3)
	});
	if (!res.ok) throw new Error(`quote http ${res.status}`);
	const buf = new Uint8Array(await res.arrayBuffer());
	return new TextDecoder("latin1").decode(buf);
}
var fetchQuotes_createServerFn_handler = createServerRpc({
	id: "8e016c7e2f123b990dc2cce000b0a19e46d7ea6019eaa3ecd05246c16f996c47",
	name: "fetchQuotes",
	filename: "src/lib/research/quotes.ts"
}, (opts) => fetchQuotes.__executeServer(opts));
var fetchQuotes = createServerFn({ method: "GET" }).handler(fetchQuotes_createServerFn_handler, async () => {
	const symbols = [...INDICES.map((i) => i.symbol), ...UNIVERSE.map((s) => s.symbol)];
	try {
		return {
			ok: true,
			quotes: parseQuotes(await fetchTencent(symbols)),
			source: "tencent",
			asOf: (/* @__PURE__ */ new Date()).toISOString()
		};
	} catch (e) {
		return {
			ok: false,
			quotes: {},
			source: "none",
			asOf: (/* @__PURE__ */ new Date()).toISOString(),
			error: e instanceof Error ? e.message : "quote fail"
		};
	}
});
var fetchKlines_createServerFn_handler = createServerRpc({
	id: "e65347b9d06432aece37d17eccee06c36261edb44cdd32291d18262c4530b2fe",
	name: "fetchKlines",
	filename: "src/lib/research/quotes.ts"
}, (opts) => fetchKlines.__executeServer(opts));
var fetchKlines = createServerFn({ method: "POST" }).validator((input) => input).handler(fetchKlines_createServerFn_handler, async ({ data }) => {
	const symbol = data.symbol.replace(/[^a-z0-9]/gi, "").toLowerCase();
	const isIndex = /^(sh000|sz399|bj899)/.test(symbol);
	const isHk = symbol.startsWith("hk");
	const param = isIndex ? `${symbol},day,,,120,` : `${symbol},day,,,120,qfq`;
	const url = `https://web.ifzq.gtimg.cn/appstock/app/${isHk ? "hkfqkline" : "fqkline"}/get?param=${param}`;
	try {
		const node = (await (await fetch(url, {
			headers: { Referer: "https://finance.qq.com/" },
			signal: AbortSignal.timeout(8e3)
		})).json()).data?.[symbol];
		return {
			ok: true,
			bars: (node?.qfqday ?? node?.day ?? []).map((r) => ({
				date: r[0] ?? "",
				open: Number(r[1]),
				close: Number(r[2]),
				high: Number(r[3]),
				low: Number(r[4]),
				volume: Number(r[5])
			}))
		};
	} catch (e) {
		return {
			ok: false,
			bars: [],
			error: e instanceof Error ? e.message : "kline fail"
		};
	}
});
//#endregion
export { fetchKlines_createServerFn_handler, fetchQuotes_createServerFn_handler };
