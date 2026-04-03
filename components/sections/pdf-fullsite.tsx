"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Phone } from "lucide-react";

const gtmProblems = [
  "技术导向，而非用户导向",
  "有功能，但无“刚需场景”",
  "有流量，但无精准人群",
];

const identity = [
  { title: "深度陪伴", desc: "我们直接对结果负责" },
  { title: "垂直专注", desc: "只服务 AI Agent / SaaS" },
  { title: "价值翻译", desc: "把技术变成市场和资本听得懂的语言" },
];

const sixServices = [
  "市场策略",
  "海外 KOL & KOC 营销",
  "Launch Video 制作",
  "广告投放 / Paid Ads",
  "Product Hunt",
  "SEO / GEO + 社群 / 社交媒体曝光",
];

const fourStepEngine = [
  "一 | 诊断与策略：GTM 策略制定，明确核心价值主张",
  "二 | 市场发布：Product Hunt 冲榜，Launch Video 引爆声量",
  "三 | 规模增长：达人矩阵 + SEO + 多渠道投放，持续获客",
  "四 | 品牌沉淀：IP 打造 + 社区运营，构建护城河",
];

const phGoals = [
  "冲击 Product of the Day 日榜前三",
  "获得 500+ 真实 Upvotes 与优质评论",
  "带来 2,000+ 官网访问与用户注册",
  "触达全球顶级科技媒体与投资人视野",
];

const differentiators = [
  "全链路 AI/SaaS 营销增长方案",
  "结果导向的收费模式",
  "更懂 AI 产品逻辑与用户需求",
  "本地化品牌塑造",
  "定制化方案",
  "策略创新与市场适应性",
];

function Slide({
  id,
  index,
  title,
  subtitle,
  children,
  tone = "plain",
}: {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  tone?: "plain" | "card";
}) {
  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 ${tone === "card" ? "bg-card" : ""}`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-[8%] w-24 h-24 rounded-full border border-foreground/15" />
        <div className="absolute bottom-14 left-[6%] w-16 h-16 rounded-full bg-primary/10" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mb-10 md:mb-14">
          <p className="text-xs tracking-[0.24em] uppercase text-primary font-semibold mb-4">
            Slide {index}
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export function PdfFullSite() {
  return (
    <div className="pt-20">
      <section id="pdf-hero" className="relative min-h-[88vh] flex items-center py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-14 right-[10%] w-56 h-56 rounded-full bg-gradient-to-br from-[#fc9918] to-[#f14a16] opacity-80" />
          <div className="absolute top-28 right-[14%] w-44 h-44 rounded-full border border-foreground/20" />
          <div className="absolute bottom-16 left-[5%] w-52 h-52 rounded-full bg-primary/10 blur-xl" />
          <div className="absolute right-[28%] bottom-1/3 grid grid-cols-4 gap-2 opacity-35">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="w-2 h-2 rounded-full bg-foreground" />
            ))}
          </div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <p className="text-sm uppercase tracking-[0.25em] text-primary mb-6">Let&apos;s Start</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 leading-[0.95]">
            起始点
            <br />
            <span className="text-gradient-animate">StartPoint</span>
          </h1>
          <p className="text-2xl md:text-3xl text-foreground font-medium">
            只做 AI Agent 的 0→1 增长
          </p>
        </div>
      </section>

      <Slide
        id="problems"
        index="02"
        title="AI Agent 的问题，不在技术，在 GTM"
        subtitle="从技术能力到市场结果之间，常见卡点并非“做不出来”，而是“讲不清、卖不动、找不到对的人”。"
        tone="card"
      >
        <div className="grid md:grid-cols-3 gap-5">
          {gtmProblems.map((item, idx) => (
            <article key={item} className="rounded-3xl border border-border bg-background p-7 min-h-[180px] flex flex-col">
              <p className="text-sm text-primary font-semibold mb-3">0{idx + 1}</p>
              <p className="text-xl font-semibold leading-snug">{item}</p>
            </article>
          ))}
        </div>
      </Slide>

      <Slide
        id="who-we-are"
        index="03"
        title="我们是谁"
        subtitle="覆盖 AI Agent 从 0→1 的关键断点，定位为你的增长合伙人。"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {identity.map((item) => (
            <article key={item.title} className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h3 className="text-3xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </Slide>

      <Slide
        id="service-matrix"
        index="04"
        title="只做 AI Agent 的 0→1 增长业务覆盖"
        subtitle="StartPoint 提供覆盖 AI 产品全生命周期的六大核心营销服务。"
        tone="card"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sixServices.map((service) => (
            <div key={service} className="rounded-2xl border border-border bg-background px-5 py-5 text-lg font-medium min-h-[96px] flex items-center">
              {service}
            </div>
          ))}
        </div>
      </Slide>

      <Slide
        id="growth-engine"
        index="05"
        title="我们的四步增长引擎"
        subtitle="从 GTM 产品发布到品牌打造，匹配冷启动、成长期和规模化阶段。"
      >
        <div className="space-y-4">
          {fourStepEngine.map((step) => (
            <div key={step} className="rounded-2xl border border-border bg-card p-6 text-lg leading-relaxed">
              {step}
            </div>
          ))}
        </div>
      </Slide>

      <Slide
        id="launch-video"
        index="06"
        title="Launch Video 制作"
        subtitle="把复杂产品讲成一句话能懂、一个视频能转化。"
        tone="card"
      >
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <article className="rounded-3xl border border-border bg-background p-6">
            <h3 className="text-xl font-bold mb-4">Ava - Artisan V3.4</h3>
            <video
              src="/Ava - Artisan V3.4.mp4"
              controls
              className="w-full rounded-xl"
              poster="/logo.jpg"
            />
          </article>
          <article className="rounded-3xl border border-border bg-background p-6">
            <h3 className="text-xl font-bold mb-4">Poly Final</h3>
            <video
              src="/Poly Final.mp4"
              controls
              className="w-full rounded-xl"
              poster="/logo.jpg"
            />
          </article>
        </div>
        <div className="rounded-3xl border border-border bg-background p-6">
          <p className="font-semibold mb-3">PDF 案例成果（原文）</p>
          <ul className="space-y-2 text-muted-foreground leading-relaxed">
            <li>Blockit AI：发布 6 小时突破百万观看量，1,214 注册，272 信用卡付费</li>
            <li>Poly.app：累计播放量 300 万+，融资 $16M</li>
            <li>Crunched：累计播放量 400 万+，迅速打开欧美市场</li>
          </ul>
        </div>
      </Slide>

      <Slide id="creator" index="07" title="海外达人合作" subtitle="精准达人营销是 AI 产品获取高质量早期用户的高效路径。">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-card p-6">KOL 精准匹配：按受众画像、调性与转化数据筛选</div>
          <div className="rounded-2xl border border-border bg-card p-6">KOC 口碑矩阵：中尾部达人真实体验，形成社区扩散</div>
          <div className="rounded-2xl border border-border bg-card p-6">效果追踪优化：全链路归因分析，动态优化 ROI</div>
        </div>
      </Slide>

      <Slide id="paid-ads" index="08" title="广告投流方法论" subtitle="覆盖点击、转化、留存、复用全流程。" tone="card">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-background p-6">让用户愿意点进来：创意素材工厂，优化点击率与注册转化</div>
          <div className="rounded-2xl border border-border bg-background p-6">让更多对的人看到你：受众分层建模，精准覆盖目标人群</div>
          <div className="rounded-2xl border border-border bg-background p-6">让用户留下来并付费：围绕转化、留存、LTV 持续迭代</div>
          <div className="rounded-2xl border border-border bg-background p-6">让流量持续复用：再营销机制 + 归因模型优化</div>
        </div>
      </Slide>

      <Slide id="product-hunt" index="09" title="Product Hunt 冲榜" subtitle="单次成功冲榜可获得注册增长、媒体曝光与投资人关注。">
        <div className="grid lg:grid-cols-2 gap-6">
          <article className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-bold mb-3">核心成果目标</h3>
            <ul className="space-y-2 text-muted-foreground">
              {phGoals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-bold mb-3">执行路径</h3>
            <ol className="space-y-2 text-muted-foreground list-decimal pl-5">
              <li>产品页面优化：标题、描述、截图、Demo 视频打磨</li>
              <li>社区资源预热：激活 Hunter 网络与早期支持者</li>
              <li>发布日精准执行：全球时区流量协同冲榜</li>
              <li>后续流量承接：转化为注册用户与长期留存</li>
            </ol>
          </article>
        </div>
      </Slide>

      <Slide id="reddit" index="10" title="Reddit 营销的独特价值" subtitle="在核心 Subreddit 建立真实品牌存在，获取高质量种子用户。" tone="card">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-background p-6">帖子在 Google 搜索排名高，可持续带来免费 SEO 流量</div>
          <div className="rounded-2xl border border-border bg-background p-6">社区对营销内容敏感，真实价值内容才能赢得信任</div>
          <div className="rounded-2xl border border-border bg-background p-6">AI/科技垂类聚集早期采用者、开发者与意见领袖</div>
        </div>
      </Slide>

      <Slide id="growth-proof" index="11" title="用户案例与增长结果" subtitle="结果导向：访问、注册、付费与长期增长。">
        <div className="grid md:grid-cols-3 gap-4">
          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-bold mb-2">AI 写作工具 · Product Hunt</h3>
            <p className="text-muted-foreground text-sm">当日榜第 2 名，单日 3,200+ 访问，800+ 新注册，7 天付费转化提升 34%</p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-bold mb-2">AI Agent 平台 · SEO</h3>
            <p className="text-muted-foreground text-sm">6 个月自然流量 2,000 提升至 18,000+，核心词首页排名数量增长 420%</p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-bold mb-2">AI 工具 · 达人联合推广</h3>
            <p className="text-muted-foreground text-sm">12 位达人，累计曝光 240 万+，带来 5,600+ 注册，付费转化率 18%</p>
          </article>
        </div>
      </Slide>

      <Slide id="comparison" index="12" title="自建市场团队 vs StartPoint" subtitle="更理性、更敏捷、更确定的增长路径。" tone="card">
        <div className="grid lg:grid-cols-2 gap-6">
          <article className="rounded-3xl border border-border bg-background p-6">
            <h3 className="text-xl font-bold mb-3">自建市场团队</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>启动慢：4–6 个月招聘 + 磨合周期</li>
              <li>成本高：人力成本持续 + 隐性试错支出</li>
              <li>无经验：AI 新领域方向不确定</li>
              <li>独自担风险：方向失误与执行风险自担</li>
            </ul>
          </article>
          <article className="rounded-3xl border-2 border-primary bg-background p-6">
            <h3 className="text-xl font-bold mb-3">与 StartPoint 合作</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>高效启动：最快 3 天进入验证</li>
              <li>单一可控：单一合同价覆盖策略内容执行</li>
              <li>成熟方法：复用验证过的增长路径</li>
              <li>风险共担：收益与增长结果深度绑定</li>
            </ul>
          </article>
        </div>
      </Slide>

      <Slide id="stats" index="13" title="助力 AI 产品实现突破性营销增长">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <div className="text-5xl font-bold text-primary">315+</div>
            <div className="text-muted-foreground mt-1">覆盖国家和地区</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <div className="text-5xl font-bold text-primary">100%</div>
            <div className="text-muted-foreground mt-1">客户满意度</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <div className="text-5xl font-bold text-primary">3天</div>
            <div className="text-muted-foreground mt-1">最快启动</div>
          </div>
        </div>
      </Slide>

      <Slide id="advantages" index="14" title="六大差异化能力" subtitle="让 StartPoint 成为 AI 产品营销增长的最优合作伙伴。" tone="card">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {differentiators.map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-background p-6">
              {item}
            </div>
          ))}
        </div>
      </Slide>

      <Slide id="team" index="15" title="是谁在陪你走 0→1">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-bold text-2xl">Frank（技术）</p>
            <p className="text-muted-foreground mt-2">前网易算法专家，懂代码，翻译技术价值</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-bold text-2xl">Simy（品牌）</p>
            <p className="text-muted-foreground mt-2">海外市场专家，5亿美金操盘手</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-bold text-2xl">Elaine（流量）</p>
            <p className="text-muted-foreground mt-2">头部大厂市场专家，懂流量，洞察用户</p>
          </div>
        </div>
      </Slide>

      <Slide id="promise" index="16" title="核心承诺" subtitle="我们不是给建议，而是陪你把 0→1 跑通。重点攻坚 3–6 个月关键窗口。" tone="card">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-background p-6">找准市场：定义定位、用户画像、核心痛点</div>
          <div className="rounded-2xl border border-border bg-background p-6">打通渠道：建立 1-2 条有效初始获客路径并验证转化</div>
          <div className="rounded-2xl border border-border bg-background p-6">夯实故事：梳理商业模式，准备用户与投资人叙事</div>
          <div className="rounded-2xl border border-border bg-background p-6">落地执行：用真实反馈和数据快速验证路径</div>
        </div>
      </Slide>

      <Slide id="pricing" index="18" title="我们的合作模式">
        <div className="grid lg:grid-cols-3 gap-5">
          <article className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-bold">战略问诊</h3>
            <p className="text-primary font-semibold mt-2">¥15,000 / 2-3 周</p>
            <p className="text-muted-foreground mt-3 text-sm">3 次深度工作坊（共 6 小时），完成诊断与策略定义</p>
          </article>
          <article className="rounded-3xl border-2 border-primary bg-card p-6">
            <h3 className="text-xl font-bold">策略与启动陪跑（轻量版）</h3>
            <p className="text-primary font-semibold mt-2">¥30,000 – ¥50,000 / 月（&lt;3个月）</p>
            <p className="text-muted-foreground mt-3 text-sm">主导启动执行与路径验证，提供策略、内容与投放指导</p>
          </article>
          <article className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-bold">全链路增长陪跑（完整版）</h3>
            <p className="text-primary font-semibold mt-2">¥80,000 – ¥120,000 / 月（&gt;3个月）</p>
            <p className="text-muted-foreground mt-3 text-sm">全面负责策略-执行-优化闭环，基础月费 + 利润分成</p>
          </article>
        </div>
      </Slide>

      <section id="contact" className="relative py-24 md:py-28 bg-card">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.24em] uppercase text-primary font-semibold mb-4">Slide 19</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">联系我们</h2>
          <p className="text-lg text-muted-foreground mb-8">获得免费 30 分钟咨询</p>
          <Button
            size="lg"
            className="group text-lg px-8 py-6 bg-gradient-to-r from-primary to-[#fc9918] text-white hover:opacity-90 rounded-full shadow-lg"
          >
            预约咨询
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              <span>+86 15622153144</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>杭州 / 上海 / 巴黎可线下 coffee chat</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

