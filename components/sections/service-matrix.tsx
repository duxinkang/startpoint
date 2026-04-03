"use client";

import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";
import {
  Compass,
  Clapperboard,
  Megaphone,
  Trophy,
  Search,
  Users,
} from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "市场策略",
    description: "GTM策略制定，明确核心价值主张与优先级增长路径。",
    badge: "Strategy",
  },
  {
    icon: Clapperboard,
    title: "Launch Video 制作",
    description: "从脚本、产品演示到后期剪辑，打造冷启动最高ROI内容资产。",
    badge: "Video",
  },
  {
    icon: Megaphone,
    title: "广告投放 / Paid Ads",
    description: "覆盖 Meta、Google、LinkedIn、Reddit，多渠道归因与复用。",
    badge: "Paid",
  },
  {
    icon: Trophy,
    title: "Product Hunt 冲榜",
    description: "发布前预热、发布日协同、发布后承接，冲击榜单与注册增长。",
    badge: "Launch",
  },
  {
    icon: Search,
    title: "SEO / GEO",
    description: "通过内容布局与关键词策略，持续获得高质量自然流量。",
    badge: "Organic",
  },
  {
    icon: Users,
    title: "海外 KOL/KOC + 社群曝光",
    description: "匹配高转化达人矩阵，结合社媒与社区建立可信口碑扩散。",
    badge: "Community",
  },
];

export function ServiceMatrix() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { containerRef, visibleItems } = useStaggeredAnimation(services.length, 100);

  return (
    <section id="service-matrix" className="py-24 relative scroll-mt-20">
      <div className="container mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            Full-Funnel Coverage
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            只做 AI Agent 的 0→1 增长业务覆盖
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            从品牌曝光到精准转化，构建可执行、可复盘、可规模化的增长飞轮。
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative overflow-hidden p-7 rounded-3xl bg-card border border-border hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                visibleItems[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-[#fc9918]" />
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[#fc9918] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {service.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

