"use client";

import { Target, Route, BookOpen, Rocket } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  {
    icon: Target,
    number: "一",
    title: "找准市场",
    description: "明确产品定位与差异化价值，定义清晰的用户画像、核心痛点与需求",
  },
  {
    icon: Route,
    number: "二",
    title: "打通渠道",
    description: "建立2-3条有效的初始获客路径，并验证转化",
  },
  {
    icon: BookOpen,
    number: "三",
    title: "夯实故事",
    description: "梳理商业模式，精心准备打动用户与投资人的核心叙事与融资材料",
  },
  {
    icon: Rocket,
    number: "四",
    title: "落地执行",
    description: "通过真实用户反馈与数据，快速验证市场、渠道与叙事是否成立",
  },
];

export function Promise() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { containerRef, visibleItems } = useStaggeredAnimation(steps.length, 150);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  return (
    <section id="promise" className="py-24 bg-card relative overflow-hidden scroll-mt-20">
      {/* Animated background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fc9918]/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />

      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            核心承诺
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground">
            我们不是给建议，而是<span className="text-primary font-semibold">陪你把 0→1 跑通</span>
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative group transition-all duration-500 ${
                visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {/* Animated connection line */}
              {index < steps.length - 1 && (
                <div 
                  className={`hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary to-[#fc9918] z-0 origin-left transition-transform duration-700 ${
                    visibleItems[index + 1] ? 'scale-x-100' : 'scale-x-0'
                  }`} 
                />
              )}
              
              <div className="relative p-6 rounded-3xl bg-background border border-border hover:border-primary/50 transition-all duration-300 h-full shadow-sm hover:shadow-xl hover:-translate-y-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-[#fc9918] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-sm text-primary font-medium mb-2">{step.number}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div 
          ref={ctaRef}
          className={`text-center mt-16 transition-all duration-700 ${
            ctaVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors cursor-pointer group">
            <span className="text-lg text-foreground">最关键的</span>
            <span className="text-2xl font-bold text-gradient-animate">3–6 个月</span>
            <span className="text-lg text-foreground">0→1 跑通阶段</span>
          </div>
        </div>
      </div>
    </section>
  );
}
