"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";

export function KolDetail() {
  const t = useTranslations("serviceDetails.kol");
  const locale = useLocale();
  const isZh = locale === "zh";
  const steps = t.raw("steps") as { title: string; text: string }[];

  return (
    <Section bg="paper" className="!pt-4">
      <Container size="full">
        <div className="mb-10">
          <h2 className="sp-display text-2xl md:text-3xl text-orange-500 max-w-2xl leading-tight">
            {t("subtitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border-2 border-orange-500 bg-white overflow-hidden flex flex-col"
            >
              <div
                aria-hidden="true"
                className="aspect-[4/3] relative"
                style={{
                  background:
                    i === 0
                      ? "linear-gradient(135deg, #FFA872, #EA4510)"
                      : i === 1
                        ? "linear-gradient(135deg, #1A1A1A, #5C4BD1)"
                        : "linear-gradient(135deg, #FFD9B8, #FFAE78)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-70">
                  {i === 0 ? "🎥" : i === 1 ? "📱" : "📊"}
                </div>
              </div>
              <div className="p-6 flex-1">
                <h3 className="font-bold text-ink text-lg">{step.title}</h3>
                <p className="mt-3 text-sm text-ink/75 leading-relaxed">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Substantive context — widens the content footprint so Google
            and AI answer engines have more to index than a 5-word hero. */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="sp-display text-2xl md:text-3xl text-ink leading-tight">
              {isZh
                ? "AI Agent 为什么比 SaaS 更依赖真人口碑"
                : "Why AI Agents depend on real-user word-of-mouth more than SaaS"}
            </h2>
            <div className="mt-5 space-y-4 text-ink/80 leading-relaxed">
              <p>
                {isZh
                  ? "AI Agent 的核心价值是代替人完成任务，但「它真的能搞定我的活吗」这句话，产品自己说没有说服力——只有另一个真人展示完整工作流才能。这就是为什么同等预算下，KOL / KOC 内容对 AI Agent 的转化贡献，通常是投信息流广告的 2-4 倍。"
                  : "An AI Agent's value prop is \u201cit does the job for you\u201d — but the product can\u2019t credibly make that claim about itself. Only another real person walking through the workflow can. That\u2019s why, at the same budget, KOL / KOC content typically converts 2-4x better for AI Agents than paid-social traffic."}
              </p>
              <p>
                {isZh
                  ? "我们的达人库不是从公开榜单抓来的。每一位候选达人都经过内容垂直度、历史转化率、账号健康度、跨平台影响力叠加度四重筛选,剩下的不到 8% 才会进入我们给你的清单。"
                  : "Our creator bench isn't scraped from public leaderboards. Each candidate is filtered on content fit, historical conversion, account health, and multi-platform amplification — the shortlist you see is the ~8% that survive that screen."}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-cream border border-ink/10 p-7">
            <h3 className="sp-display text-xl md:text-2xl text-ink">
              {isZh ? "合作里常见的三个坑" : "Three pitfalls we'll help you avoid"}
            </h3>
            <ul className="mt-5 space-y-4">
              {(isZh
                ? [
                    "只看粉丝量不看观众画像——AI 开发者类产品需要 ICP 重合度，而非漏斗顶端宽度",
                    "达人一次性发布没有后续——单条内容的长尾 SEO 与 GEO 价值需要 90 天窗口来兑现",
                    "只在一个平台投放——YouTube / X / LinkedIn / TikTok 的协同覆盖比单点更关键",
                  ]
                : [
                    "Optimizing for follower count instead of ICP overlap — dev-oriented AI products need depth, not top-of-funnel width",
                    "One-and-done creator posts — a single piece's long-tail SEO / GEO value takes ~90 days to fully surface",
                    "Single-platform reach — cross-posting to YouTube / X / LinkedIn / TikTok compounds harder than any single channel alone",
                  ]
              ).map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-ink/80 text-[15px] leading-relaxed"
                >
                  <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
