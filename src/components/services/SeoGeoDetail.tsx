"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { Card } from "@/components/ui/Card";
import { getSeoGeoFaq } from "@/lib/seo";

type Step = { title: string; text: string };

const GEO_FACTS = {
  zh: [
    "用户搜 Google，是在找页面；用户问 ChatGPT，是在找答案。",
    "如果页面没有清晰定义、案例数据和 FAQ，AI 很难稳定引用你。",
    "SEO 负责持续流量入口，GEO 负责在答案引擎里拿到品牌提及。",
  ],
  en: [
    "A Google user is looking for pages. A ChatGPT user is looking for an answer.",
    "If a page lacks definitions, evidence, and FAQ structure, AI engines are less likely to cite it.",
    "SEO builds the durable traffic layer; GEO wins the answer-engine mention.",
  ],
} as const;

const FIT_STAGES = {
  zh: [
    "Demo ready: 开始形成用户问题和核心价值主张",
    "0-1k 用户: 需要稳定放大自然流量与品牌词曝光",
    "Product Hunt 后: 需要把短期声量沉淀成长期搜索资产",
  ],
  en: [
    "Demo ready: the product story and ICP are finally becoming clear",
    "0-1k users: the team needs compounding demand capture, not only launches",
    "Post-Product Hunt: short-term attention needs to become durable search equity",
  ],
} as const;

const DELIVERABLES = {
  zh: [
    "关键词与意图建模: 锁定商业价值最高的词与问题",
    "核心页面改写: 用 answer-first 结构重写首页、服务页、案例页",
    "FAQ + JSON-LD: 让 Google 和 AI crawler 更容易抽取事实",
    "llms.txt + 实体清晰化: 让品牌定义、服务边界和证据页更明确",
    "持续监控: 同时跟 Google 排名、品牌提及与 AI 引用率",
  ],
  en: [
    "Keyword + intent modeling: map the highest-value commercial searches and questions",
    "Core-page rewrites: rebuild homepage, service, and case pages in answer-first form",
    "FAQ + JSON-LD: make extractable facts easier for Google and AI crawlers to parse",
    "llms.txt + entity clarity: sharpen the brand definition, service boundaries, and proof pages",
    "Ongoing tracking: monitor rankings, branded demand, and answer-engine citations together",
  ],
} as const;

const PROOF_POINTS = {
  zh: [
    "SEO 案例: 6 个月内月自然流量从 2,000 提升到 18,000+，首页词数量增长 420%，CAC 下降 65%。",
    "Launch Video / Product Hunt 案例: 单次发布能带来数千访问与注册，但如果没有 SEO/GEO 承接，声量会快速衰减。",
    "我们做的是把“短期爆发”转成“可被搜索、可被引用、可持续复利”的长期资产。",
  ],
  en: [
    "SEO case proof: in six months, monthly organic traffic grew from 2,000 to 18,000+, first-page keyword count rose 420%, and CAC dropped 65%.",
    "Launch Video and Product Hunt create short-term spikes, but without SEO/GEO infrastructure that attention decays quickly.",
    "The goal is to convert short-lived launch momentum into search-visible, citation-ready, long-term compounding assets.",
  ],
} as const;

export function SeoGeoDetail() {
  const t = useTranslations("serviceDetails.seo-geo");
  const locale = useLocale();
  const isZh = locale === "zh";
  const steps = t.raw("steps") as Step[];
  const faqItems = getSeoGeoFaq(locale);
  const geoFacts = GEO_FACTS[isZh ? "zh" : "en"];
  const fitStages = FIT_STAGES[isZh ? "zh" : "en"];
  const deliverables = DELIVERABLES[isZh ? "zh" : "en"];
  const proofPoints = PROOF_POINTS[isZh ? "zh" : "en"];

  return (
    <>
      <Section bg="paper" className="!pt-4">
        <Container size="full">
          <div className="max-w-4xl">
            <h2 className="sp-display text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.08]">
              {isZh
                ? "如果你希望品牌既能被搜到，也能被 AI 回答引用，就必须同时做 SEO 和 GEO。"
                : "If you want the brand to be found in search and cited in AI answers, you need SEO and GEO running as one system."}
            </h2>
            <p className="mt-6 text-lg md:text-xl text-ink/75 leading-relaxed max-w-3xl">
              {isZh
                ? "传统 SEO 的目标是让高意图用户在 Google 上找到你。GEO 的目标是让 ChatGPT、Perplexity、Gemini、Claude 在回答“谁做这个最好”“有哪些靠谱方案”时，把你当成可信来源。对 AI Agent 来说，这两条线应该共用同一套内容资产、结构化数据和案例证明。"
                : "Traditional SEO helps high-intent buyers find you in Google. GEO helps ChatGPT, Perplexity, Gemini, and Claude treat you as a credible source when users ask who does this best or which tools are worth considering. For AI products, both should be powered by the same content, entity signals, and proof assets."}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {geoFacts.map((item) => (
              <Card key={item} variant="subtle" className="bg-cream">
                <p className="text-ink/75 leading-relaxed">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="cream">
        <Container size="full">
          <div className="flex flex-wrap gap-3 mb-8">
            <Pill variant="orange" size="md">
              SEO (Google)
            </Pill>
            <Pill variant="ink" size="md">
              GEO (ChatGPT / Perplexity / Gemini / Claude)
            </Pill>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl bg-white border border-ink/10 p-8 shadow-sm"
              >
                <div className="text-orange-500 font-bold text-lg mb-3">
                  0{i + 1}
                </div>
                <h2 className="sp-display text-2xl text-ink">{step.title}</h2>
                <p className="mt-4 text-ink/75 leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="paper">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14">
            <div>
              <Pill variant="orange" size="md" className="mb-5">
                {isZh ? "适合什么阶段" : "When this fits best"}
              </Pill>
              <h2 className="sp-display text-3xl md:text-4xl lg:text-5xl leading-[1.08] text-ink">
                {isZh
                  ? "最适合已经证明“产品值得被看见”，但还没有建立长期自然获客系统的团队"
                  : "Best for teams that have proven the product deserves attention, but not yet built a durable organic-demand system"}
              </h2>
              <ul className="mt-8 space-y-4">
                {fitStages.map((item) => (
                  <li key={item} className="flex gap-3 text-ink/75 leading-relaxed">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card variant="feature">
              <h2 className="sp-display text-2xl md:text-3xl text-ink leading-tight">
                {isZh ? "你最终拿到的不是“写几篇文章”" : "The deliverable is not just a few blog posts"}
              </h2>
              <ul className="mt-6 space-y-4">
                {deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-ink/75 leading-relaxed">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      <Section bg="ink">
        <Container size="full">
          <div className="max-w-4xl">
            <Pill variant="orange" size="md" className="mb-5">
              {isZh ? "为什么这套方法能持续见效" : "Why this compounds"}
            </Pill>
            <h2 className="sp-display text-3xl md:text-4xl lg:text-5xl text-white leading-[1.08]">
              {isZh
                ? "短期声量会过期，能被搜索和引用的页面资产不会"
                : "Launch buzz expires. Search-visible and citation-ready pages do not."}
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {proofPoints.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/75 leading-relaxed"
              >
                {item}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="cream">
        <Container size="full">
          <div className="max-w-3xl">
            <Pill variant="orange" size="md" className="mb-5">
              FAQ
            </Pill>
            <h2 className="sp-display text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.08]">
              {isZh
                ? "关于 SEO / GEO，创始人最常问的四个问题"
                : "The four SEO/GEO questions founders ask most"}
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item) => (
              <article
                key={item.q}
                className="rounded-2xl bg-white border border-ink/10 p-7 shadow-sm"
              >
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
