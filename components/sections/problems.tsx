"use client";

import { AlertCircle, Users, Target } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const problems = [
  {
    icon: AlertCircle,
    number: "1",
    title: "技术很强，但价值说不清",
    description: "产品技术领先，但难以向市场和资本传达核心价值",
  },
  {
    icon: Target,
    number: "2",
    title: '产品能用，但没"非你不可"',
    description: "功能完善，却缺乏让用户选择你的独特理由",
  },
  {
    icon: Users,
    number: "3",
    title: "做了增长，却碰不到对的人",
    description: "增长动作不少，却始终触达不到核心目标用户",
  },
];

export function Problems() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { containerRef, visibleItems } = useStaggeredAnimation(problems.length, 150);

  return (
    <section id="problems" className="py-24 relative scroll-mt-20">
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            AI Agent 的 0→1
          </h2>
          <p className="text-4xl md:text-6xl font-bold text-gradient-animate">
            为什么这么难？
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={problem.number}
              className={`group relative p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2 ${
                visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-[#fc9918] flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                {problem.number}
              </div>
              <div className="mt-4">
                <problem.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div 
          className={`text-center mt-16 transition-all duration-700 delay-500 ${
            visibleItems[problems.length - 1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-xl text-muted-foreground">
            覆盖 AI Agent 从 0 → 1 的关键 <span className="text-primary font-bold animate-pulse">3 个断点</span>
          </p>
        </div>
      </div>
    </section>
  );
}
