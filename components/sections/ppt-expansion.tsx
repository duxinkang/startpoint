"use client";

import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";
import { Play, Users, Target, Rocket, MessageSquare, Globe } from "lucide-react";

const identity = [
  {
    title: "深度陪伴",
    description: "我们直接对结果负责，不做只给建议的顾问式交付。",
  },
  {
    title: "垂直专注",
    description: "只服务 AI Agent / SaaS，方法和资源长期沉淀在同一赛道。",
  },
  {
    title: "价值翻译",
    description: "把技术语言翻译成市场和资本都听得懂的增长叙事。",
  },
];

const launchVideoCases = [
  "Blockit AI：发布 6 小时突破百万观看，1,214 注册，272 信用卡付费",
  "Poly.app：累计播放量 300 万+，融资 $16M",
  "Crunched：累计播放量 400 万+，快速打开欧美市场",
];

const productHuntGoals = [
  "冲击 Product of the Day 日榜前三",
  "获得 500+ 真实 Upvotes 与高质量评论",
  "带来 2,000+ 官网访问与用户注册",
  "触达全球科技媒体与投资人视野",
];

const productHuntExecution = [
  "产品页优化：标题、描述、截图、Demo 视频全链路打磨",
  "社区预热：提前激活 Hunter 网络，构建支持者社区",
  "发布日执行：按全球时区调度流量冲榜",
  "后续承接：将 PH 流量转化为注册与长期留存",
];

const redditValues = [
  "Reddit 内容在 Google 搜索中排名权重高，可持续带来免费 SEO 流量",
  "社区对营销内容极度敏感，只有真实内容才能建立信任",
  "AI/科技垂类聚集大量早期采用者、开发者与意见领袖",
];

const differentiators = [
  "全链路 AI/SaaS 营销增长方案",
  "结果导向的收费模式",
  "更懂 AI 产品逻辑与用户需求",
  "本地化品牌塑造",
  "定制化方案",
  "策略创新与市场适应性",
];

export function PptExpansion() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { containerRef, visibleItems } = useStaggeredAnimation(3, 130);

  return (
    <section id="ppt-expansion" className="py-24 relative scroll-mt-20">
      <div className="container mx-auto px-6">
        <div
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            PDF Expansion
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            宣传 PDF 新增内容直出网页
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            以下模块按你的最新宣传内容展开展示，保留原有主题色与视觉体系。
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-3 gap-6 mb-12">
          {identity.map((item, index) => (
            <article
              key={item.title}
              className={`rounded-3xl border border-border bg-card p-7 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-500 ${
                visibleItems[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <article className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-[#fc9918] text-white flex items-center justify-center">
                <Play className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Launch Video 制作</h3>
            </div>
            <p className="text-muted-foreground mb-5">
              一支高质量发布视频是冷启动期最高 ROI 资产，可同时用于 Product Hunt、官网首屏与社媒转化。
            </p>
            <ul className="space-y-3 mb-5 text-sm text-foreground">
              <li className="flex gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />脚本策划：挖掘差异化价值，构建产品故事</li>
              <li className="flex gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />产品演示：专业录屏 + 动效，降低认知门槛</li>
              <li className="flex gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />后期优化：节奏、字幕、配乐与视觉动效优化</li>
            </ul>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {launchVideoCases.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-[#fc9918] text-white flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">海外达人合作</h3>
            </div>
            <p className="text-muted-foreground mb-5">
              精准达人营销是 AI 产品获取高质量早期用户的高效路径，覆盖 AI 与生产力垂类资源网络。
            </p>
            <ul className="space-y-3 text-sm text-foreground">
              <li className="flex gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />KOL 精准匹配：按受众画像、内容调性与转化历史筛选</li>
              <li className="flex gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />KOC 口碑矩阵：中尾部达人矩阵，真实用户视角扩散</li>
              <li className="flex gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />效果追踪优化：全链路归因，动态优化 ROI</li>
            </ul>
          </article>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <article className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-[#fc9918] text-white flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">广告投流方法论</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl border border-border p-4 bg-background">
                <p className="font-semibold text-foreground mb-2">让用户愿意点进来</p>
                <p className="text-muted-foreground">创意素材工厂 + 点击率优化</p>
              </div>
              <div className="rounded-2xl border border-border p-4 bg-background">
                <p className="font-semibold text-foreground mb-2">让更多对的人看到</p>
                <p className="text-muted-foreground">受众分层建模 + 精准覆盖</p>
              </div>
              <div className="rounded-2xl border border-border p-4 bg-background">
                <p className="font-semibold text-foreground mb-2">让用户留下来并付费</p>
                <p className="text-muted-foreground">转化、留存、LTV 联动优化</p>
              </div>
              <div className="rounded-2xl border border-border p-4 bg-background">
                <p className="font-semibold text-foreground mb-2">让流量持续复用</p>
                <p className="text-muted-foreground">再营销与归因模型持续迭代</p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-[#fc9918] text-white flex items-center justify-center">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Product Hunt 冲榜执行</h3>
            </div>
            <ul className="space-y-2 text-sm text-foreground mb-5">
              {productHuntGoals.map((goal) => (
                <li key={goal} className="flex gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />{goal}</li>
              ))}
            </ul>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
              {productHuntExecution.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <article className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-[#fc9918] text-white flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Reddit 增长价值</h3>
            </div>
            <ul className="space-y-3 text-sm text-foreground">
              {redditValues.map((value) => (
                <li key={value} className="flex gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />{value}</li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              重点深耕 r/artificial、r/SaaS、r/MachineLearning 等核心社区，建立真实品牌存在。
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-[#fc9918] text-white flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">六大差异化能力</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {differentiators.map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

