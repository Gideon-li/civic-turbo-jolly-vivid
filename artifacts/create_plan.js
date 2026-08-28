const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
        ShadingType, LevelFormat, PageNumber, VerticalAlign } = require('docx');
const fs = require('fs');

const A4 = { width: 11906, height: 16838 };
const MARGIN = 1134; // 0.79 inch ~ 2cm
const CONTENT_W = 11906 - 1134 * 2; // 9638

const navy = "1B365D";
const teal = "0F6B6B";
const accent = "C45C26";
const gray = "4A5568";
const light = "F4F7FA";
const headerBg = "1B365D";
const rowAlt = "EEF3F8";
const borderC = "C5D0DC";

const border = { style: BorderStyle.SINGLE, size: 4, color: borderC };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function p(text, opts = {}) {
  const { bold = false, size = 21, color = "222222", italics = false, align, spacingAfter = 120, spacingBefore = 0 } = opts;
  return new Paragraph({
    alignment: align,
    spacing: { after: spacingAfter, before: spacingBefore, line: 360 },
    children: [new TextRun({ text, font: "Microsoft YaHei", size, bold, color, italics })]
  });
}

function runs(parts, opts = {}) {
  const { align, spacingAfter = 120, spacingBefore = 0 } = opts;
  return new Paragraph({
    alignment: align,
    spacing: { after: spacingAfter, before: spacingBefore, line: 360 },
    children: parts.map(x => new TextRun({
      text: x.text,
      font: "Microsoft YaHei",
      size: x.size || 21,
      bold: !!x.bold,
      color: x.color || "222222",
      italics: !!x.italics
    }))
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: navy, space: 4 } },
    children: [new TextRun({ text, font: "Microsoft YaHei", size: 32, bold: true, color: navy })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140 },
    children: [new TextRun({ text, font: "Microsoft YaHei", size: 26, bold: true, color: teal })]
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, font: "Microsoft YaHei", size: 22, bold: true, color: navy })]
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { after: 80, line: 340 },
    children: [new TextRun({ text, font: "Microsoft YaHei", size: 21, color: "222222" })]
  });
}

function bulletRich(parts, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { after: 80, line: 340 },
    children: parts.map(x => new TextRun({
      text: x.text, font: "Microsoft YaHei", size: 21, bold: !!x.bold, color: x.color || "222222"
    }))
  });
}

function numItem(text) {
  return new Paragraph({
    numbering: { reference: "numbers", level: 0 },
    spacing: { after: 80, line: 340 },
    children: [new TextRun({ text, font: "Microsoft YaHei", size: 21, color: "222222" })]
  });
}

function cell(text, opts = {}) {
  const { bold = false, fill, width, align = AlignmentType.LEFT, color = "222222", size = 18 } = opts;
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: fill ? { fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: align,
      spacing: { after: 0, line: 300 },
      children: [new TextRun({ text, font: "Microsoft YaHei", size, bold, color })]
    })]
  });
}

function headerCell(text, width) {
  return cell(text, { bold: true, fill: headerBg, width, align: AlignmentType.CENTER, color: "FFFFFF", size: 18 });
}

function makeTable(headers, rows, colWidths) {
  const headerRow = new TableRow({
    children: headers.map((h, i) => headerCell(h, colWidths[i])),
    tableHeader: true
  });
  const body = rows.map((r, ri) => new TableRow({
    children: r.map((c, i) => cell(String(c), {
      width: colWidths[i],
      fill: ri % 2 === 1 ? rowAlt : "FFFFFF",
      size: 18
    }))
  }));
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...body]
  });
}

function spacer(after = 160) {
  return new Paragraph({ spacing: { after }, children: [] });
}

const col3 = [2800, 3419, 3419];
const col4 = [1800, 2613, 2613, 2612];
const col2 = [2800, 6838];
const col5 = [1600, 2009, 2009, 2009, 2011];

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Microsoft YaHei", size: 21 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Microsoft YaHei", color: navy },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Microsoft YaHei", color: teal },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Microsoft YaHei", color: navy },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [
        { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 420, hanging: 240 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 240 } } } }
      ]},
      { reference: "numbers", levels: [
        { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 420, hanging: 280 } } } }
      ]}
    ]
  },
  sections: [{
    properties: {
      page: {
        size: A4,
        margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: navy, space: 6 } },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: "中国股票行情与动态智能推荐平台  ·  网站规划方案", font: "Microsoft YaHei", size: 16, color: navy }),
          ]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: borderC, space: 6 } },
          alignment: AlignmentType.RIGHT,
          spacing: { before: 80 },
          children: [
            new TextRun({ text: "内部规划文档  |  第 ", font: "Microsoft YaHei", size: 16, color: gray }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Microsoft YaHei", size: 16, color: gray }),
            new TextRun({ text: " 页", font: "Microsoft YaHei", size: 16, color: gray }),
          ]
        })]
      })
    },
    children: [
      // COVER
      new Paragraph({ spacing: { before: 600, after: 80 }, children: [
        new TextRun({ text: "产品规划方案", font: "Microsoft YaHei", size: 22, color: accent, bold: true })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "中国股票行情与动态智能推荐平台", font: "Microsoft YaHei", size: 44, bold: true, color: navy })
      ]}),
      new Paragraph({ spacing: { after: 400 }, border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: accent, space: 1 } }, children: [
        new TextRun({ text: "Website Product & Technical Plan", font: "Microsoft YaHei", size: 22, color: teal })
      ]}),
      p("版本：V1.0    日期：2026年8月    密级：内部使用", { size: 20, color: gray, spacingAfter: 80 }),
      p("覆盖范围：A股行情展示 · 新闻与技术因子 · 每日动态权重训练 · 月度/年度成长空间推荐", { size: 20, color: gray, spacingAfter: 400 }),

      p("本规划用于指导产品、数据、算法与工程团队协同建设一个「行情展示 + 多源研究评分 + 中长期动态推荐」的中国股票网站。核心不是简单复刻行情终端，而是把历史行情、实时新闻、技术参数与基本面成长阶段，每日重训成可解释的涨跌权重，并按月、按年输出成长空间排序。", { spacingAfter: 200 }),

      runs([
        { text: "重要定位：", bold: true, color: accent },
        { text: "在未取得中国证监会证券投资咨询业务资质前，本站对外必须定位为「数据与研究辅助工具」，不得以投资顾问名义向公众提供具体买卖建议，不得承诺收益，不得按荐股结果收费。" }
      ], { spacingAfter: 280 }),

      h1("一、项目背景与目标"),
      h2("1.1 为什么做这个站"),
      bullet("个人投资者面对的信息过载：行情、公告、研报、短视频观点相互冲突，缺少统一、可追溯的评分框架。"),
      bullet("公开网站大多只做行情展示或静态排行，缺少「每日重训权重 + 成长阶段 + 中长期空间」的闭环。"),
      bullet("新闻情绪与技术面短期有效，但单独使用容易追涨杀跌；需要与基本面成长质量和产业空间绑定。"),
      bullet("月度、年度推荐适合中长期持有逻辑，避免把日频噪声包装成长线结论。"),

      h2("1.2 产品目标"),
      numItem("做全市场可用的中国股票行情与个股档案中心（沪深京 A 股为主，预留港股通标的）。"),
      numItem("把历史K线、财务、资金流、新闻情绪、技术指标统一成可解释的多因子评分。"),
      numItem("每日收盘后自动训练/更新涨跌权重，输出当日市场状态与个股短中期评分。"),
      numItem("按成长阶段识别公司所处生命周期，评估中长期成长空间，形成月度池与年度池。"),
      numItem("全程可追溯：每条推荐能展开到因子贡献、新闻依据、财务依据与模型版本。"),

      h2("1.3 成功标准（上线后 6 个月）"),
      makeTable(
        ["指标", "定义", "目标"],
        [
          ["日活覆盖", "独立访问用户中查看行情/个股页的人数", "稳定日活，核心页停留 > 2 分钟"],
          ["数据完整率", "交易日全市场行情、财务、新闻入库成功率", "≥ 99.5%"],
          ["模型可运行率", "交易日收盘后权重训练成功并发布", "≥ 98%"],
          ["解释完整率", "月/年推荐个股可打开因子与新闻依据", "100%"],
          ["回测披露", "月度/年度池相对基准的历史回测公开", "上线即发布，每月更新"],
          ["合规零事故", "无未授权投顾宣传、无收益承诺", "0 次"]
        ],
        [2200, 4238, 3200]
      ),
      spacer(),

      h1("二、合规边界（必须先定）"),
      p("这是本项目能否公开上线的前提，而不是附录。中国《证券法》规定，从事证券投资咨询服务业务须经国务院证券监督管理机构核准。向公众提供涉及具体证券品种的投资分析、预测、选择建议、买卖时机建议，并直接或间接获取经济利益，通常被认定为证券投资顾问业务。"),
      h2("2.1 对外话术与产品形态"),
      bulletRich([{ text: "允许：", bold: true }, { text: "行情展示、指标计算、历史回测、新闻聚合、因子得分、成长阶段标签、研究观察名单。" }]),
      bulletRich([{ text: "谨慎：", bold: true }, { text: "「推荐」「看好」「建议配置」等词必须同时出现免责声明，并改为「评分靠前 / 观察池 / 研究排序」。" }]),
      bulletRich([{ text: "禁止：", bold: true }, { text: "具体买卖价位、目标价保证、跟买协议、按荐股收费、私下微信荐股、收益承诺、内幕或传闻作为依据。" }]),
      bullet("全站页脚、推荐页、分享卡片必须有统一风险提示：市场有风险，评分不构成投资建议；过往回测不代表未来表现。"),
      bullet("如未来要做成真正的投顾/组合建议产品，需先取得证券投资咨询资质，或与持牌机构合作，由持牌人员出具意见。"),

      h2("2.2 数据与内容合规"),
      bullet("行情与财务数据需有合法授权或可公开使用的接口协议，避免长期依赖不稳定爬虫作为生产主源。"),
      bullet("新闻需保留来源链接与发布时间，不做 titlegates 式改写误导。"),
      bullet("模型不得使用未公开重大信息；公告须以交易所/指定媒体为准。"),
      bullet("用户自选、自建组合属于用户行为，平台只提供计算工具，不代客决策。"),

      h1("三、目标用户与使用场景"),
      makeTable(
        ["用户", "核心诉求", "产品怎么服务"],
        [
          ["进阶个人投资者", "看盘 + 找中长期标的，怕被短线噪声带跑", "行情 + 成长阶段 + 月/年观察池 + 解释面板"],
          ["基本面研究者", "把财务、产业、新闻放在一张图里", "个股档案、产业图谱、新闻情绪时间轴"],
          ["量化/技术爱好者", "要因子、回测、权重变化，不要黑箱", "每日权重公告、因子贡献、模型版本日志"],
          ["行业观察者", "看板块轮动与政策冲击", "板块热度、政策新闻映射、行业成长空间榜"]
        ],
        [2200, 3719, 3719]
      ),
      spacer(),
      p("第一阶段不做高频交易终端，不做 Level-2 超低延迟盘口竞赛。实时体验以「秒级快照 + 分钟K」为主，研究体验以「日频模型 + 月年池」为主。"),

      h1("四、产品功能规划"),
      h2("4.1 行情中心"),
      bullet("指数：上证综指、深证成指、创业板指、科创50、北证50、沪深300、中证500、中证1000、微盘等。"),
      bullet("市场：沪市、深市、北交所；板块：申万一级/二级、概念题材、行业 ETF 对照。"),
      bullet("列表字段：最新价、涨跌幅、成交额、换手、量比、市盈率(TTM)、市净率、总市值、流通市值、所属行业。"),
      bullet("K线：分时、5/15/30/60分钟、日/周/月；前复权/后复权/不复权；叠加均线、成交量、MACD、KDJ、RSI、BOLL。"),
      bullet("资金与情绪辅助：主力净流入（如数据源支持）、北向资金、涨跌停统计、涨跌家数、两市成交额。"),
      bullet("交易日历、停复牌、涨跌停、退市风险警示（ST/*ST）、科创/创业板特殊机制提示。"),

      h2("4.2 个股档案"),
      bullet("公司概览：主营、实控人、上市日期、所属赛道、成长阶段标签、中长期空间评级。"),
      bullet("财务：营收/净利同比、毛利率、ROE、经营现金流、资产负债、季度趋势图。"),
      bullet("估值：PE/PB/PS/PEG、历史分位点、相对行业分位。"),
      bullet("技术面板：关键均线多空、趋势强度 ADX、波动率、换手拥挤度。"),
      bullet("新闻与公告时间轴：交易所公告优先，媒体新闻次之，每条带情绪分与事件类型。"),
      bullet("评分拆解：当日短线分、月度成长分、年度空间分，以及因子贡献条形图。"),

      h2("4.3 新闻与事件中心"),
      bullet("来源分层：交易所公告 / 公司新闻 / 行业政策 / 宏观数据 / 市场评论。"),
      bullet("自动抽取：涉及股票代码、事件类型（业绩、回购、减持、订单、处罚、政策）、情感极性。"),
      bullet("去重与聚类：同一事件多源报道合并为一条事件卡片。"),
      bullet("冲击标记：对「可能改变中长期空间假设」的新闻单独打标，触发个股权重临时衰减或增强。"),

      h2("4.4 智能观察与推荐（对外名称建议）"),
      p("对内可叫「推荐引擎」，对外页面建议用「研究观察池 / 动态评分榜」，降低投顾问责风险。"),
      makeTable(
        ["产品模块", "更新频率", "用户看到什么"],
        [
          ["市场状态仪", "每个交易日", "多空倾向、拥挤度、风格（大小盘/成长价值）"],
          ["短线评分榜", "每个交易日", "技术+新闻驱动的涨跌权重排序，强调高噪声"],
          ["月度观察池", "每月第一个交易周", "成长质量 + 趋势确认后的 20–50 只名单"],
          ["年度观察池", "每季度复核，年底重做", "中长期空间为主的 15–30 只名单"],
          ["我的对照", "随时", "自选股评分变化、是否仍在月/年池、权重漂移提醒"]
        ],
        [2200, 2619, 4819]
      ),
      spacer(),

      h1("五、智能引擎：每日权重、成长阶段、月年计算"),
      p("这是本站与普通行情站的差异点。建议把引擎拆成四层，避免一个大模型包打天下、无法解释。"),

      h2("5.1 四层评分结构"),
      makeTable(
        ["层级", "解决什么问题", "主要输入", "输出"],
        [
          ["L1 技术与微观结构", "短周期强弱与拥挤", "价量、均线、动量、波动、换手", "技术分 T"],
          ["L2 新闻与事件", "增量信息与情绪冲击", "公告、新闻、政策、分析师修订", "事件分 N"],
          ["L3 基本面与成长阶段", "公司处在哪一段生命周期", "财务增速、质量、资本开支、份额", "阶段标签 + 质量分 F"],
          ["L4 中长期空间", "未来 1–3 年能长多大", "行业空间、渗透率、政策、估值约束", "空间分 S"]
        ],
        [2200, 2413, 2612, 2413]
      ),
      spacer(),
      p("合成不是简单相加。日频「涨跌权重」主要服务短中期排序；月度、年度名单必须提高 L3/L4 的权重，并限制 L1/L2 的决定权，防止把热点股直接送进年度池。"),

      h2("5.2 每日动态权重训练"),
      p("每个交易日收盘后（建议 16:00–20:00 完成）执行一次「权重更新作业」，而不是盘中频繁改长期结论。"),
      h3("训练目标"),
      bullet("短线目标：预测下一交易日 / 未来 5 日超额收益的方向与强度（用于 T、N 权重）。"),
      bullet("中线目标：预测未来 20 个交易日相对行业的超额（用于月度池预筛选）。"),
      bullet("约束目标：换手不要过高、避免过度暴露单一行业、对 ST 与财务造假风险一票否决。"),

      h3("权重更新方法（建议组合，而不是只上深度学习）"),
      numItem("因子标准化：截面 z-score 或分位数，行业内中性化，减少板块暴涨暴跌对全体权重的污染。"),
      numItem("有效性监控：滚动 60/120 日 IC、ICIR、多空分组收益。失效因子自动降权，不是人工偶尔调一次。"),
      numItem("动态加权：用滚动回归、RankIC 加权或 LightGBM 特征重要性，生成当日因子权重向量 W_d。"),
      numItem("市场状态调节：用市场级技术状态（趋势、波动、拥挤）把风格从「动量」切到「质量/低波」。"),
      numItem("新闻冲击修正：高置信度重大事件对个股施加衰减系数或增强系数，有效期 1–10 个交易日。"),
      numItem("版本固化：每天生成 model_version、W_d、样本区间、剔除规则，写入模型登记册，可供页面展示。"),

      h3("建议纳入的技术参数（L1）"),
      makeTable(
        ["类别", "参数示例", "用途"],
        [
          ["趋势", "MA5/10/20/60 多空排列、ADX、均线斜率", "判断趋势是否成立"],
          ["动量", "20日涨跌幅、价格乖离率、创新高天数", "识别惯性与超买超卖"],
          ["振荡", "MACD、KDJ、RSI、BOLL 带宽", "短线拐点与波动收缩"],
          ["量价", "换手乖离、量比、量价相关、缩量天数", "识别放量真突破或顶部拥挤"],
          ["风险", "20/60日波动率、最大回撤、涨跌停距离", "控制追高与流动性风险"]
        ],
        [1800, 4219, 3619]
      ),
      spacer(),

      h3("新闻如何进入权重（L2）"),
      bullet("文本清洗 → 公司/行业实体识别 → 事件分类 → 情感与强度打分 → 映射到代码。"),
      bullet("公告权重大于自媒体；监管处罚、业绩爆雷、实控人风险对中长期分直接降档。"),
      bullet("政策利好作用于行业层，再按公司弹性（市值、产能、在手订单）分配到个股。"),
      bullet("同一事件重复报道不叠加计分，只更新置信度与最新时间。"),

      h2("5.3 成长阶段识别（L3）"),
      p("「成长段」不要只看今年净利润同比。建议用生命周期框架给每家公司打阶段，并允许一年内最多调整两次，避免财报季标签乱跳。"),
      makeTable(
        ["阶段", "典型特征", "对推荐的含义"],
        [
          ["导入/培育", "收入基数小、持续亏损或微利、研发/资本开支高", "只进主题观察，不进年度核心池"],
          ["加速成长", "收入与利润连续高增、份额提升、现金流改善", "月度/年度池的主力候选"],
          ["稳健成长", "增速回落但仍高于行业、盈利质量好", "适合年度池的压舱标的"],
          ["成熟现金", "低增速、高分红、资本开支下降", "一般不作为成长空间推荐"],
          ["衰退/出清", "份额下滑、减值与商誉风险、主业萎缩", "默认剔除，除非重组证据充分"]
        ],
        [2000, 4219, 3419]
      ),
      spacer(),
      p("阶段判定输入建议：过去 8 个季度营收/扣非净利复合增速、ROE 与其趋势、经营现金流/净利润、资本开支占营收、毛利率稳定性、行业空间是否仍在扩张、以及分析师预期修正方向。"),

      h2("5.4 中长期成长空间（L4）"),
      p("空间分回答的是：如果公司执行顺利，未来 12–36 个月的收入与利润天花板在哪里，现在的估值有没有透支。"),
      bullet("行业层：政策方向、渗透率、进出口替代、资本开支周期、竞争格局（CR3/CR5）。"),
      bullet("公司层：产品结构、客户集中度、产能爬坡、在手订单、海外扩张、治理与商誉。"),
      bullet("估值约束：用 PEG、历史 PE 分位、相对行业溢价，避免「空间很大但价格已透支」。"),
      bullet("质量约束：扣非质量、应收账款与存货异常、经营现金流持续为负则降低空间分。"),
      p("空间分更新频率：常规每月，重大产业政策或公司战略变更时触发临时重算。不要每天改年度空间结论。"),

      h2("5.5 日、月、年三套名单如何计算"),
      h3("每日涨跌权重（短中期，不对外称「推荐」）"),
      p("Score_day = wT(state) * T + wN(state) * N + wF * F_short"),
      p("其中 wT、wN 随市场状态变化：趋势市提高技术与动量，震荡市提高质量与低拥挤。F_short 只用最近两季的基本面变化，避免把长线逻辑塞进日榜。日榜顶部应显示「高波动、高换手可能」，并默认过滤 ST、次新过热、财务异常。"),

      h3("月度观察池（核心对外产品之一）"),
      numItem("股票池：剔除 ST、上市不足 6 个月（可配置）、日均成交过低、审计意见异常、数据缺失严重。"),
      numItem("硬条件：成长阶段属于加速成长或稳健成长；L4 空间分不低于阈值；最近一期没有重大违法违规。"),
      numItem("综合分：Score_month = 0.15*T_20d + 0.15*N_20d + 0.35*F + 0.35*S（系数由回测校准，页面展示当前版本）。"),
      numItem("组合约束：单一申万一级行业不超过 25%；市值分层（大/中/小）都有上限，避免全是微盘主题。"),
      numItem("容量：20–50 只。每月第一个完整交易周发布，月中只做「风险剔除」，不做大规模换血。"),
      numItem("跟踪：公布月初名单、月末收益、相对沪深300与中证800的超额、最大回撤、换手。"),

      h3("年度观察池（中长期主产品）"),
      numItem("以 L3+L4 为主：Score_year = 0.10*趋势稳定性 + 0.40*F + 0.50*S。"),
      numItem("要求连续成长证据：至少 2 年收入或利润质量可验证，或赛道渗透率仍处早期且公司已有份额。"),
      numItem("估值纪律：空间分再高，若 PE 处于自身 10 年 90% 分位以上，只能进「高预期观察」子榜，不进核心池。"),
      numItem("容量：15–30 只。每年 12 月重做，每季度复核一次，只剔除逻辑破坏项（造假、主业出售、政策反转）。"),
      numItem("年度计算不是把 12 个月日榜平均，而是用年度基本面路径 + 空间假设的情景分析（基准/乐观/悲观）。"),

      h2("5.6 可解释性（必须做成产品，而不是技术附录）"),
      bullet("每只入池个股提供「三句话结论 + 因子贡献图 + 关键新闻/财报条目」。"),
      bullet("展示权重相对上月的变化：哪些因子升权、哪些降权、市场状态如何切换。"),
      bullet("失败案例复盘区：上月观察池中亏损最多的标的，写清模型看错了什么。这能建立信任。"),

      h1("六、数据体系"),
      h2("6.1 数据分层"),
      makeTable(
        ["层级", "内容", "建议来源策略"],
        [
          ["主行情", "日K、分钟K、分时快照、指数、停复牌", "生产环境用稳定商业/正规 API；开发期可用 Tushare/AkShare"],
          ["基本面", "财报、指标、股本、分红、公告", "Tushare Pro / 商业财务库 + 交易所披露"],
          ["资金", "北向、两融、大单资金流", "正规数据商，免费源仅作对照"],
          ["新闻事件", "公告、财经新闻、政策稿", "交易所、央企媒体、持牌财经媒体 RSS/API"],
          ["衍生", "技术指标、情绪分、阶段标签、空间分", "自建计算层，结果落库可复现"]
        ],
        [1800, 3619, 4219]
      ),
      spacer(),
      p("工程原则：开发与演示可用 AkShare、Tushare、Baostock、新浪/腾讯公共接口；正式生产不要把网页爬虫当唯一主源。东方财富等站点反爬趋严，免费源适合研究，不适合对用户承诺的实时服务。实时行情以秒级快照即可，真正的 Level-2 成本高且牌照要求更复杂。"),

      h2("6.2 核心数据表（逻辑模型）"),
      bullet("sec_master：代码、名称、市场、行业、上市日、状态、是否 ST。"),
      bullet("md_daily / md_min：OHLCV、复权因子、换手、量比。"),
      bullet("fin_period：报告期财务与质量指标。"),
      bullet("news_raw / news_event：原文、来源、实体、情绪、事件类型。"),
      bullet("factor_daily：标准化后的全部因子值。"),
      bullet("weight_daily：当日因子权重向量与市场状态。"),
      bullet("score_daily / pool_month / pool_year：对外展示用的固化结果。"),
      bullet("model_registry：版本、样本、特征、回测摘要、上线人。"),

      h2("6.3 数据质量"),
      bullet("复权正确、分红送转日校验、停牌日不参与训练。"),
      bullet("财务用最新公告更正后的数据，追溯调整要保留版本。"),
      bullet("新闻延迟监控：公告入库超过 15 分钟告警。"),
      bullet("交叉校验：同一标的两家数据源价格偏差超阈值则冻结该标的评分。"),

      h1("七、网站信息架构"),
      h2("7.1 页面结构"),
      numItem("首页：指数条、市场状态仪、成交与涨跌统计、今日评分变化最大个股、月度池摘要、风险提示。"),
      numItem("行情：市场列表、板块、指数、排行（涨跌幅/成交额/换手/评分）。"),
      numItem("个股页：报价 + K线 + 四层评分 + 财务 + 新闻时间轴 + 是否在月/年池。"),
      numItem("观察池：月度池、年度池、历史期次、回测曲线、调入调出记录。"),
      numItem("方法说明：因子定义、权重更新规则、回测假设、免责声明。这是信任页，不能藏。"),
      numItem("新闻：按股票/行业/事件类型筛选。"),
      numItem("用户中心：自选、对比、评分订阅（邮件/站内），不做代客下单。"),

      h2("7.2 交互原则"),
      bullet("先给结论，再给拆解。个股页顶部 3 秒内能看懂：阶段、月分、年分、主要风险。"),
      bullet("红色绿色遵循内地习惯，但无障碍模式提供图案区分。"),
      bullet("移动端优先个股与观察池；复杂回测放在桌面端。"),
      bullet("所有「池」页面默认展开免责声明折叠条，分享卡片自带同样声明。"),

      h1("八、技术架构建议"),
      h2("8.1 总体分层"),
      bullet("接入层：行情/财务/新闻采集 Worker，按源隔离，失败可降级。"),
      bullet("存储层：关系库（元数据、财务、评分）+ 时序库（K线）+ 对象存储（公告原文）+ 缓存。"),
      bullet("计算层：指标计算、NLP、日终训练、回测。建议与 Web 服务隔离，用任务队列。"),
      bullet("服务层：行情 API、个股 API、评分 API、用户 API。"),
      bullet("展示层：Web（Next.js 或同等 SSR）+ 可选小程序后期再做。"),

      h2("8.2 技术选型参考"),
      makeTable(
        ["模块", "建议", "说明"],
        [
          ["前端", "Next.js + ECharts/TradingView轻量图表", "SSR 利于个股 SEO 与分享"],
          ["后端", "Python FastAPI + Node BFF（可选）", "研究与训练以 Python 为主"],
          ["任务", "Airflow 或 Prefect", "日终训练、月年换仓必须可编排"],
          ["数据库", "PostgreSQL + Timescale/ClickHouse", "点查用 PG，海量K线可用分析库"],
          ["缓存/推送", "Redis + WebSocket", "首页指数与自选快照"],
          ["模型", "先线性/树模型，后深度学习", "可解释优先于刷分"],
          ["NLP", "中文金融领域模型 + 规则词典", "公告分类先做准，再做情感"],
          ["部署", "容器 + 对象存储 + 国内云", "行情作业与 Web 分集群"]
        ],
        [1800, 3419, 4419]
      ),
      spacer(),

      h2("8.3 日终作业时间表（交易日）"),
      makeTable(
        ["时间", "作业"],
        [
          ["15:05–15:30", "收盘行情与停复牌核对入库"],
          ["15:30–16:30", "计算技术因子、资金因子，生成市场状态"],
          ["16:30–18:00", "新闻/公告增量处理，更新事件分"],
          ["18:00–19:30", "滚动训练日权重，生成 Score_day 与解释"],
          ["19:30–20:30", "质量检查、回测快照、发布到生产缓存"],
          ["20:30 后", "推送自选异动与模型版本日志"],
          ["每月首周", "重算月度池，生成调仓说明"],
          ["每季末月", "复核年度池，只做逻辑破坏项剔除"]
        ],
        [2800, 6838]
      ),
      spacer(),

      h1("九、模型治理与回测规范"),
      bullet("所有对外名单必须能复现：同一版本号 + 同一数据切片 = 同一结果。"),
      bullet("回测要扣除近似交易成本（印花税、佣金、冲击成本简化假设），并写明假设。"),
      bullet("避免未来函数：财务用实际披露日对齐，不能用报告期结束后立刻知道的终值。"),
      bullet("样本外验证：至少留出最近 1 年不参与调参，作为发布前检验。"),
      bullet("失效熔断：月度池相对基准连续 3 个月显著落后且回撤超阈值，自动降为「研究观察」，并在首页提示。"),
      bullet("人工覆盖：允许研究同事否决某只入池，但必须写原因并留下审计日志。"),

      h1("十、非功能需求"),
      bullet("性能：首页首屏 < 2s；个股行情接口 P95 < 300ms；K线切换流畅。"),
      bullet("可用：交易日采集成功率 ≥ 99.5%；模型发布失败自动沿用上一有效版本并告警。"),
      bullet("安全：接口鉴权、防爬、用户数据加密、操作审计。"),
      bullet("合规展示：任何评分接口返回都带 disclaimer 字段，前端强制渲染。"),
      bullet("可观测：采集延迟、因子空值率、IC 漂移、新闻实体识别准确率看板。"),

      h1("十一、实施路线图"),
      makeTable(
        ["阶段", "周期", "交付"],
        [
          ["P0 骨架", "4–6 周", "行情列表、个股K线、基础财务、用户自选、免责声明体系"],
          ["P1 研究层", "6–8 周", "技术因子、新闻入库与情绪、个股四层评分雏形、方法说明页"],
          ["P2 日权重", "4–6 周", "日终训练流水线、权重公告、短线评分榜、模型版本"],
          ["P3 月年池", "6 周", "成长阶段、空间分、月度/年度观察池、回测与调入调出"],
          ["P4 打磨", "持续", "解释卡片、失败复盘、移动端、告警、数据源升级为生产级"]
        ],
        [1800, 1800, 6038]
      ),
      spacer(),
      p("建议先上「可解释的研究站」，再上「自动名单」。没有方法说明和回测披露的推荐页，不要公开发布。"),

      h1("十二、团队与分工（最小配置）"),
      makeTable(
        ["角色", "职责"],
        [
          ["产品/合规各 1", "信息架构、话术、免责、观察池规则"],
          ["数据工程 1–2", "采集、清洗、复权、任务调度"],
          ["量化研究 1–2", "因子、权重、成长阶段、回测"],
          ["NLP 0.5–1", "公告新闻事件抽取（前期可兼职）"],
          ["全栈 2", "网站、个股页、图表、账户"],
          ["运维/值班（兼）", "交易日作业监控"]
        ],
        [2800, 6838]
      ),
      spacer(),

      h1("十三、商业模式建议"),
      p("在无投顾牌照前，变现必须与「具体荐股收费」隔离。"),
      bullet("免费：行情、基础K线、延迟评分、方法说明。"),
      bullet("会员：完整因子拆解、历史观察池、回测下载、自选预警、年度空间报告。"),
      bullet("B 端：把数据 API 与评分 API 卖给研究团队，合同写明不构成投资建议。"),
      bullet("不要做：跟单、模拟盘升级实盘导流到地下工作室、按收益分成。"),

      h1("十四、主要风险与对策"),
      makeTable(
        ["风险", "对策"],
        [
          ["无资质被认定为非法荐股", "对外命名去投顾化；不按个股建议收费；显著免责；必要时与持牌机构合作"],
          ["免费数据源被封导致停摆", "主备双源；生产切到授权 API；缓存上一份有效行情"],
          ["模型过拟合热点", "行业/市值约束；样本外检验；月年池限制短线因子权重"],
          ["新闻误判导致错误加减分", "公告优先；多源交叉；低置信度不入权；人工抽检"],
          ["用户把观察池当成保本名单", "展示历史回撤与失败案例；禁止收益承诺话术"],
          ["财务未来函数", "按披露日对齐；财报更正保留版本"]
        ],
        [3219, 6419]
      ),
      spacer(),

      h1("十五、上线清单（发布门禁）"),
      numItem("全站免责声明、观察池页声明、分享卡片声明三处一致。"),
      numItem("方法说明页上线，包含因子、权重、回测假设。"),
      numItem("至少一个完整交易月的日终作业演练成功。"),
      numItem("月度池有历史回测图，不是只有当前名单。"),
      numItem("ST、停牌、数据缺失个股不会进入对外名单。"),
      numItem("模型版本号可在页面查到。"),
      numItem("投诉与内容纠错入口可用。"),

      h1("十六、建议的对外文案框架"),
      p("首页主标题示例：中国股票数据与中长期研究评分工具。"),
      p("副标题示例：把行情、财务、新闻与技术指标，变成可拆解的每日权重和月年观察池。"),
      p("观察池按钮示例：查看本月研究观察池（不构成投资建议）。"),
      p("避免使用：稳赚、必涨、内幕、跟庄、老师带单、今日买入。"),

      h1("附录 A  日 / 月 / 年 计算对照"),
      makeTable(
        ["项目", "日评分", "月度观察池", "年度观察池"],
        [
          ["目的", "描述短中期相对强弱", "1 个月研究关注名单", "12 个月成长空间名单"],
          ["主驱动", "技术 + 新闻", "成长质量 + 空间 + 趋势确认", "空间 + 成长阶段"],
          ["更新", "每个交易日", "每月一次，月中只剔除", "每年重做，季度复核"],
          ["容量", "全市场排序", "20–50 只", "15–30 只"],
          ["短线因子权", "高", "低", "极低"],
          ["对外称呼", "动态评分", "月度观察池", "年度观察池"]
        ],
        [1800, 2613, 2613, 2612]
      ),
      spacer(),

      h1("附录 B  成长空间评分的简化口径"),
      p("可先用可计算代理，再逐步引入人工产业研究："),
      bullet("行业空间代理：过去 3 年行业收入复合增速 + 政策方向分 + 竞争格局分。"),
      bullet("公司弹性代理：份额变化、资本开支增速、研发占收比、海外收入占比变化。"),
      bullet("兑现能力代理：经营现金流、应收账款周转、存货周转、扣非净利质量。"),
      bullet("估值约束：PE/PB 历史分位、PEG、相对行业溢价。"),
      bullet("一票否决：财务造假线索、实控人重大风险、主业丧失、连续审计问题。"),

      spacer(200),
      p("—— 文档结束 ——", { align: AlignmentType.CENTER, color: gray, spacingBefore: 200 }),
      p("下一步可将本规划拆成：产品原型图、数据字典、因子说明书、日终任务 DAG 四份执行文档。", { align: AlignmentType.CENTER, color: gray, size: 19 }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/workdir/artifacts/中国股票智能推荐平台_网站规划方案.docx", buffer);
  console.log("OK", buffer.length);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
