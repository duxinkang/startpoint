"use client";

import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";
import React from "react";

const cases = [
  {
    id: "ava",
    videoSrc: "/Ava - Artisan V3.4.mp4",
    title: "Ava - Artisan V3.4",
    description: "我们帮助Ava团队实现了AI Agent从0到1的增长，通过精准的市场定位和全渠道推广，使产品在短时间内获得了大量用户关注和使用。"
  },
  {
    id: "miro",
    videoSrc: "/Miro V3.2.mp4",
    title: "Miro V3.2",
    description: "通过与Miro团队的深度合作，我们帮助他们优化了AI Agent的用户体验和市场策略，实现了产品的快速增长和用户留存。"
  },
  {
    id: "poly",
    videoSrc: "/Poly Final.mp4",
    title: "Poly Final",
    description: "我们为Poly团队提供了全面的AI Agent增长解决方案，包括产品定位、市场推广和用户运营，助力产品取得了显著的市场成绩。"
  }
];

export function ClientCase() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { containerRef, visibleItems } = useStaggeredAnimation(cases.length, 100);

  return (
    <section id="client-case" className="py-24 relative scroll-mt-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            客户案例
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            我们帮助客户实现AI Agent的0→1增长，以下是成功案例展示
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cases.map((caseItem, index) => (
            <div 
              key={caseItem.id}
              className={`flex flex-col items-center justify-center transition-all duration-700 ${visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="w-full max-w-full rounded-2xl overflow-hidden shadow-xl">
                <video
                  src={caseItem.videoSrc}
                  title={`客户案例：${caseItem.title}`}
                  width={1280}
                  height={720}
                  controls
                  className="w-full h-auto"
                  poster="/logo.jpg"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">{caseItem.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {caseItem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
