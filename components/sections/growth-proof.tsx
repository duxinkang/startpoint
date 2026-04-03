"use client";

import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const proofStats = [
  { value: "315+", label: "覆盖国家和地区" },
  { value: "100%", label: "客户满意度" },
  { value: "3天", label: "最快项目启动" },
];

const caseStudies = [
  {
    title: "AI 写作 SaaS · Product Hunt",
    result: "当日榜第 2 名",
    detail: "单日 3,200+ 网站访问，800+ 新注册，发布后 7 天内付费转化提升 34%。",
  },
  {
    title: "AI Agent 平台 · SEO 增长",
    result: "月自然流量 2,000 → 18,000+",
    detail: "6 个月系统化内容与外链建设，核心关键词首页排名数量增长 420%。",
  },
  {
    title: "AI 工具 · 达人联合推广",
    result: "曝光 240 万+",
    detail: "12 位垂类科技达人联合投放，带来 5,600+ 新注册，付费转化率 18%。",
  },
];

export function GrowthProof() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { containerRef, visibleItems } = useStaggeredAnimation(caseStudies.length, 120);

  return (
    <section id="growth-proof" className="py-24 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#fc9918]/10 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-10 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            Performance Proof
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            用可量化结果证明增长能力
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          {proofStats.map((stat) => (
            <div key={stat.label} className="p-5 rounded-2xl border border-border bg-card text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div ref={containerRef} className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {caseStudies.map((item, index) => (
            <article
              key={item.title}
              className={`group p-7 rounded-3xl border border-border bg-card hover:border-primary/40 hover:-translate-y-2 shadow-sm hover:shadow-xl transition-all duration-500 ${
                visibleItems[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-sm text-muted-foreground mb-2">{item.title}</p>
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {item.result}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

