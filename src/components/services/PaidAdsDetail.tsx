"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";

export function PaidAdsDetail() {
  const t = useTranslations("serviceDetails.paid-ads");
  const locale = useLocale();
  const isZh = locale === "zh";
  const channels = t.raw("channels") as string[];
  const methodology = t.raw("methodology") as { title: string; text: string }[];
  const goals = t.raw("goals") as { title: string; text: string }[];

  return (
    <Section bg="paper" className="!pt-4">
      <Container size="full">
        {/* Channels */}
        <div className="mb-16">
          <h2 className="sr-only">{t("kicker")} · Channels</h2>
          <div className="flex items-center gap-3 mb-6">
            <Pill variant="orange" size="md">
              {t("kicker")} · CHANNELS
            </Pill>
            <div className="h-px flex-1 bg-ink/15" />
          </div>
          <div className="flex flex-wrap gap-3">
            {channels.map((ch) => (
              <span
                key={ch}
                className="rounded-full border-2 border-ink px-5 py-2.5 font-semibold text-ink bg-white"
              >
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* Methodology */}
        <div className="mb-16">
          <h2 className="sr-only">Methodology</h2>
          <div className="flex items-center gap-3 mb-6">
            <Pill variant="ink" size="md">
              METHODOLOGY
            </Pill>
            <div className="h-px flex-1 bg-ink/15" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {methodology.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl bg-white border border-ink/10 p-6 shadow-sm"
              >
                <div className="text-orange-500 font-bold text-sm mb-2">
                  0{i + 1}
                </div>
                <h3 className="font-bold text-ink text-lg">{m.title}</h3>
                <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                  {m.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div>
          <h2 className="sr-only">Outcomes</h2>
          <div className="flex items-center gap-3 mb-6">
            <Pill variant="orange" size="md">
              OUTCOMES
            </Pill>
            <div className="h-px flex-1 bg-ink/15" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {goals.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex gap-4 items-start bg-cream rounded-xl p-5"
              >
                <div className="shrink-0 w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <div className="font-bold text-ink">{g.title}</div>
                  <div className="text-sm text-ink/70 mt-1">{g.text}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why paid ads are different for AI Agents — depth content for
            SEO / GEO and for founders who compare us to generic performance
            shops. */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div>
            <h2 className="sp-display text-2xl md:text-3xl text-ink leading-tight">
              {isZh
                ? "为什么 AI Agent 的广告投放不能照搬 SaaS 打法"
                : "Why AI Agent paid playbooks differ from standard SaaS"}
            </h2>
            <div className="mt-5 space-y-4 text-ink/80 leading-relaxed">
              <p>
                {isZh
                  ? "AI Agent 的用户决策路径比传统 SaaS 长。用户既要理解「这个 Agent 能替我做什么」，也要建立「它会不会把我的数据搞乱」的信任。这意味着冷人群几乎不可能在一次点击内转化，必须通过冷 / 温 / 热三层分层把信任一点点累积起来。我们的每一条素材都针对某一层的心智障碍，而不是对所有人讲同一句话。"
                  : "AI Agents have a longer decision path than a typical SaaS. A buyer needs to grasp both \u201cwhat can this Agent actually do for me\u201d and \u201cwhat will it do with my data.\u201d That rules out one-click cold conversion. Trust has to be layered across cold / warm / hot audiences, and every creative is tuned to the specific objection of its layer instead of a single pitch repeated to everyone."}
              </p>
              <p>
                {isZh
                  ? "跨平台归因是另一个关键差异。AI Agent 用户常在 Reddit / X 看到讨论，在 Google 搜到对比评测，最后通过 LinkedIn 广告完成注册。只看最后一触会让你把预算全部压回 LinkedIn，忽视掉上游的冷启动价值。我们用跨渠道归因建模把「谁先点燃需求」纳入测算，帮你把预算分配到真正有增量的渠道。"
                  : "Cross-channel attribution is the other big one. AI Agent buyers often see a Reddit thread, read a Google comparison, and sign up via a LinkedIn ad. Last-click alone would push you to over-invest in LinkedIn while ignoring the upstream ignition. We model cross-channel contribution so budget follows incrementality, not last-touch."}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-ink text-white/90 p-7 md:p-8">
            <h3 className="sp-display text-xl md:text-2xl text-orange-300">
              {isZh ? "我们拒绝做什么" : "What we won\u2019t do"}
            </h3>
            <ul className="mt-5 space-y-4">
              {(isZh
                ? [
                    "不在没有落地页与事件埋点时启动投放——没有数据的广告就是烧钱",
                    "不买粉/刷量——只做对真实用户可归因的真实曝光",
                    "不承诺具体 CAC——提供的是迭代节奏与 A/B 节拍,结果随市场波动",
                    "不囤帐号和素材做黑盒——所有广告账户、受众、素材归属都属于你",
                  ]
                : [
                    "No campaigns without working landing pages and event tracking — ads without data are just burn",
                    "No fake traffic or follower purchases — only attributable real-human reach",
                    "No headline CAC promises — we commit to iteration cadence and A/B pace; the number fluctuates with the market",
                    "No locked-away accounts or creative — the ad accounts, audiences, and creative all belong to you",
                  ]
              ).map((line) => (
                <li key={line} className="flex gap-3 text-white/85 text-sm leading-relaxed">
                  <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400" />
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
