"use client";

import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const channels = [
  {
    title: "Launch Video",
    summary: "用视频讲清复杂产品，让用户在第一眼理解“为什么值得用”。",
    points: [
      "脚本策划：挖掘差异化价值，压缩认知成本",
      "产品演示：真实工作流展示，提升点击与注册",
      "后期优化：节奏、字幕、配乐与动效联动优化",
    ],
    highlight: "冷启动阶段高ROI内容资产",
  },
  {
    title: "海外达人合作（KOL/KOC）",
    summary: "通过中尾部矩阵与头部达人结合，形成可信口碑与稳定引流。",
    points: [
      "KOL精准匹配：基于受众画像和历史转化筛选",
      "KOC口碑矩阵：真实用户视角打造高信任内容",
      "效果追踪：按达人拆分ROI并持续优化",
    ],
    highlight: "高质量早期用户获取路径",
  },
  {
    title: "广告投流（Paid Ads）",
    summary: "从素材到受众建模再到再营销，建立可复用的增长系统。",
    points: [
      "创意素材工厂：持续迭代高点击素材",
      "受众分层建模：让对的人看到你的价值",
      "归因优化：聚焦转化、留存与LTV提升",
    ],
    highlight: "覆盖 Meta / Google / LinkedIn / Reddit",
  },
  {
    title: "Product Hunt + Reddit",
    summary: "围绕发布窗口与社区口碑，放大首发势能并沉淀持续流量。",
    points: [
      "PH冲榜执行：预热、时区协同、发布日冲刺",
      "流量承接：把曝光转为注册与长期留存",
      "Reddit深耕：在核心Subreddit建立真实品牌存在",
    ],
    highlight: "触达全球早期采用者与意见领袖",
  },
];

export function ChannelPlaybook() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { containerRef, visibleItems } = useStaggeredAnimation(channels.length, 120);

  return (
    <section id="channel-playbook" className="py-24 bg-card relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-primary/8 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#fc9918]/10 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            Execution Playbook
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            从发布到规模化的渠道打法
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            不做单点动作，用可复制的方法把流量、转化和品牌沉淀串成闭环。
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {channels.map((channel, index) => (
            <article
              key={channel.title}
              className={`p-7 rounded-3xl border border-border bg-background shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500 ${
                visibleItems[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-2xl font-bold text-foreground mb-3">{channel.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">{channel.summary}</p>
              <ul className="space-y-3 mb-6">
                {channel.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary">
                {channel.highlight}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

