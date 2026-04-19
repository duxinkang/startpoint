"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { cardClasses } from "@/components/ui/Card";
import { getProductHuntFaq } from "@/lib/seo";

export function ProductHuntDetail() {
  const t = useTranslations("serviceDetails.product-hunt");
  const locale = useLocale();
  const isZh = locale === "zh";
  const targets = t.raw("targets") as string[];
  const steps = t.raw("steps") as { title: string; text: string }[];
  const faq = getProductHuntFaq(locale);

  return (
    <>
      <Section bg="cream" spacing="tight">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            {/* Left: Targets card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-ink text-white p-8 md:p-10"
            >
              <h2 className="font-bold text-xl mb-6 text-orange-300">
                {t("targetsKicker")}
              </h2>
              <ul className="space-y-4">
                {targets.map((tg) => (
                  <li
                    key={tg}
                    className="flex gap-3 text-white leading-relaxed"
                  >
                    <span className="text-orange-300 mt-1.5">•</span>
                    <span>{tg}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Steps */}
            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-5 items-start"
                >
                  <div className="shrink-0 w-14 h-14 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xl">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-ink text-lg">{step.title}</h3>
                    <p className="mt-2 text-ink/75 leading-relaxed">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Depth — why AI PH isn't standard SaaS PH */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
            <div>
              <h2 className="sp-display text-2xl md:text-3xl text-ink leading-tight">
                {isZh
                  ? "为什么 AI Agent 的 PH 冲榜需要更长的预热"
                  : "Why AI Agent PH launches need a longer runway"}
              </h2>
              <div className="mt-5 space-y-4 text-ink/75 leading-relaxed">
                <p>
                  {isZh
                    ? "传统 SaaS 在 Product Hunt 上的胜利逻辑是短期爆发——一次好的开场 + 24 小时内的持续上票 + 日榜前三带来的曝光复利。AI Agent 不完全一样：你的真实目标用户大多分布在 Reddit、X 和垂直 Discord 社区里，对「又一个 AI Demo」的疲劳度极高。不提前建立信任、不让他们知道你为什么值得关注，发布当天单靠 Hunter 网络拉不动真正有留存价值的票。"
                    : "The classic SaaS Product Hunt win is a burst — a strong opening, steady upvotes across 24 hours, and the compounding that comes from day-page top-3 exposure. AI Agent launches don't quite work that way. Your real buyers live in Reddit, X, and vertical Discords, and they're saturated with \u201cyet another AI demo.\u201d Without pre-built trust, the Hunter network alone can't push you high enough to earn upvotes that actually stick."}
                </p>
                <p>
                  {isZh
                    ? "所以我们的 PH 陪跑从 4-6 周开始，而不是发布前 3 天。这段时间里我们把 Reddit 铺垫、KOL 预告、Launch Video 素材和 Hunter 推荐摆在同一条时间线上，确保发布日到来时关注你的人已经知道自己在等什么。这也是为什么我们的客户能稳定进日榜前三——不是运气，是节奏。"
                    : "That's why our PH engagement starts 4-6 weeks out, not 3 days. In that window we line up the Reddit lead-in, KOL teases, Launch Video assets, and Hunter sponsorship on a single timeline — so by launch day the people paying attention already know what they're waiting for. Our clients land top-3 consistently because of cadence, not luck."}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-ink text-white p-7 md:p-8">
              <h3 className="sp-display text-xl md:text-2xl text-orange-300">
                {isZh ? "我们拒绝做什么" : "What we won't do"}
              </h3>
              <ul className="mt-5 space-y-4">
                {(isZh
                  ? [
                      "不买 Upvotes——虚假流量在 PH 算法下会被稀释，且破坏后续搜索权重",
                      "不承诺具体名次——目标是前三，但结果取决于当天竞争产品的质量",
                      "不替你做创始人叙事——我们打磨 comment thread 与回复策略，但发声的必须是你",
                      "不把流量当结果——PH 成功的真正标尺是注册与留存，不是日榜名次",
                    ]
                  : [
                      "No bought upvotes — fake activity gets diluted by the PH algorithm and wrecks downstream search weight",
                      "No guaranteed ranking — we aim for top 3, but the outcome depends on the launch-day competitive set",
                      "No founder ghostwriting — we coach the comment and reply strategy, but your voice has to be yours",
                      "No treating traffic as the win — the real PH scoreboard is signups and retention, not day-page position",
                    ]
                ).map((line) => (
                  <li key={line} className="flex gap-3 text-white/75 text-sm leading-relaxed">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section bg="paper" spacing="tight">
        <Container size="full">
          <div className="max-w-3xl">
            <Pill variant="orange" size="md" className="mb-5">
              {t("faqKicker")}
            </Pill>
            <h2 className="sp-display text-3xl md:text-4xl lg:text-5xl leading-[1.08] text-ink">
              {isZh
                ? "发布前，founder 最常问我们的几个问题"
                : "The questions founders ask us most"}
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {faq.map((item) => (
              <article key={item.q} className={cardClasses("subtle")}>
                <h3 className="sp-display text-xl md:text-2xl text-ink leading-snug">
                  {item.q}
                </h3>
                <p className="mt-3 text-ink/75 leading-relaxed text-sm">
                  {item.a}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
