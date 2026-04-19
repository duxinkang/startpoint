import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { ContactForm } from "@/components/forms/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title:
      locale === "zh"
        ? "联系我们 — StartPoint AI Agent 增长 30 分钟免费咨询"
        : "Contact StartPoint — Book a free 30-min AI growth consultation",
    description:
      locale === "zh"
        ? "预约 StartPoint 30 分钟免费咨询，帮你判断 AI Agent 增长策略是否成立。邮箱 d541449473@gmail.com；线下 coffee chat 覆盖杭州 / 上海 / 巴黎；工作日 24 小时内回复。"
        : "Book a free 30-minute consultation to pressure-test your AI Agent growth plan. Email d541449473@gmail.com — in-person coffee chats in Hangzhou / Shanghai / Paris. Reply within 24 hours on weekdays.",
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: nav("contact"), path: "/contact" },
        ])}
      />

      {/* Hero */}
      <Section bg="paper">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
            {/* Left: intro */}
            <div>
              <Pill variant="orange" size="md" className="mb-6">
                {nav("contact")}
              </Pill>
              <h1 className="sp-display text-[15vw] sm:text-[11vw] lg:text-[7.5vw] xl:text-[120px] leading-[1.05] text-ink">
                {t("title")}
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-ink/80 leading-relaxed">
                {t("subtitle")}
              </p>

              {/* Contact meta */}
              <div className="mt-10 space-y-5">
                <div>
                  <div className="text-xs font-bold tracking-[0.2em] text-ink/60 mb-2">
                    EMAIL
                  </div>
                  <a
                    href={`mailto:${t("email")}`}
                    className="sp-display text-2xl md:text-3xl text-orange-600 hover:text-orange-700 transition"
                  >
                    {t("email")}
                  </a>
                </div>

                <div>
                  <div className="text-xs font-bold tracking-[0.2em] text-ink/60 mb-2">
                    {locale === "zh" ? "线下" : "IN-PERSON"}
                  </div>
                  <div className="text-ink/70 leading-relaxed">
                    {t("locations")}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold tracking-[0.2em] text-ink/60 mb-2">
                    {locale === "zh" ? "响应时间" : "RESPONSE TIME"}
                  </div>
                  <div className="text-ink/70 leading-relaxed">
                    {locale === "zh"
                      ? "通常在 24 小时内回复（工作日）"
                      : "Usually within 24 hours on weekdays"}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* Pre-call FAQ — answers the questions every founder asks before a
          first call, and brings this page past the 300-word content threshold
          that Google and AI answer engines reward. */}
      <Section bg="cream">
        <Container size="lg">
          <div className="max-w-3xl">
            <Pill variant="orange" size="md" className="mb-5">
              {locale === "zh" ? "咨询前的常见问题" : "Before we hop on a call"}
            </Pill>
            <h2 className="sp-display text-3xl md:text-4xl lg:text-5xl leading-[1.08] text-ink">
              {locale === "zh"
                ? "这 30 分钟我们会聊什么？"
                : "What we'll cover in 30 minutes"}
            </h2>
            <p className="mt-5 text-ink/70 leading-relaxed text-lg">
              {locale === "zh"
                ? "免费咨询不是销售电话，而是对你当前 AI Agent 产品增长路径的一次快速压力测试。提前把下面几个问题想清楚，我们聊起来会更有效率。"
                : "The free consultation isn't a sales call — it's a fast pressure-test of your AI Agent product's growth plan. Give the questions below a quick think and we'll move faster."}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PRE_CALL_FAQ[locale === "zh" ? "zh" : "en"].map((item) => (
              <article
                key={item.q}
                className="rounded-2xl bg-white border border-ink/10 p-7 shadow-sm"
              >
                <h3 className="sp-display text-xl md:text-2xl text-ink leading-snug">
                  {item.q}
                </h3>
                <p className="mt-3 text-ink/70 leading-relaxed text-sm">
                  {item.a}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 max-w-3xl rounded-2xl bg-ink text-white/90 p-8 md:p-10">
            <h3 className="sp-display text-xl md:text-2xl text-orange-300 mb-3">
              {locale === "zh"
                ? "不想填表？直接发邮件"
                : "Prefer email? Just write us"}
            </h3>
            <p className="leading-relaxed text-white/80">
              {locale === "zh"
                ? "发邮件到 d541449473@gmail.com，一句话介绍你的产品 + 目前最想解决的增长问题就可以。我们承诺在 24 小时内（工作日）亲自回复一条具体的建议——而不是群发模板。"
                : "Drop a line to d541449473@gmail.com — one sentence about your product plus the one growth question you most want answered is enough. We'll reply personally within 24 hours on weekdays with a concrete suggestion, not a templated form letter."}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

type FaqItem = { q: string; a: string };
const PRE_CALL_FAQ: Record<"zh" | "en", FaqItem[]> = {
  zh: [
    {
      q: "我还在 demo 阶段适合聊吗？",
      a: "适合。AI Agent 产品的增长节奏取决于你在 0→1 路径上具体卡在哪一步。Pre-MVP 到第一批 1000 用户之间的任何阶段，我们都能帮你判断下一步最值得投入的是哪条渠道。",
    },
    {
      q: "这个对谈会推销合作方案吗？",
      a: "不会主动推销。如果 30 分钟结束你觉得我们是合适的合伙人，可以接着聊合作；如果不合适，我们会直接告诉你该怎么自己推进，以及推荐其他更合适的团队。",
    },
    {
      q: "我需要准备什么材料？",
      a: "不需要正式 deck。能把产品 demo 链接（或 screen recording）、目标用户画像的一两句描述、以及现在最卡的一个增长数字（注册率、付费转化、留存等）准备好就够了。",
    },
    {
      q: "你们接中国产品还是出海产品？",
      a: "两种都接，但我们最擅长的是从中国团队做的 AI Agent / AI SaaS 向美国、欧洲、日本等海外市场做 0→1。巴黎办公室处理欧盟线的 GTM 与合规。",
    },
    {
      q: "签约后多久能启动？",
      a: "战略问诊档位 3 个工作日内启动；轻量与完整陪跑档位最快签约后 7 天启动第一场执行动作（例如 Launch Video 脚本会议、KOL 清单 review 或 PH 时间轴排期）。",
    },
    {
      q: "合作信息会保密吗？",
      a: "会。除非你明确授权，否则我们不会在任何对外案例、社交媒体或会议中披露你产品的名称、数据或合作细节。巴黎团队同时遵循 GDPR 的最小必要原则。",
    },
  ],
  en: [
    {
      q: "Should I book if I'm still at demo stage?",
      a: "Yes. The right 0→1 moves depend on exactly where you are on the path — anywhere between pre-MVP and your first 1,000 users is a useful moment to pressure-test the next channel to invest in.",
    },
    {
      q: "Will you try to sell me on an engagement?",
      a: "Not proactively. If it fits, we'll keep talking. If it doesn't, we'll tell you plainly how to push this yourself and, where we can, recommend teams better suited to your stage.",
    },
    {
      q: "What should I bring to the call?",
      a: "No formal deck needed. A demo link or screen-recording, a one-sentence ICP description, and the one growth number that most frustrates you right now (signup rate, paid conversion, retention, etc.) are enough.",
    },
    {
      q: "Do you work with China-based or overseas teams?",
      a: "Both — but our sweet spot is helping China-built AI Agents and AI SaaS reach 0→1 in the US, EU, and Japan. Our Paris office handles EU-line GTM and GDPR-aware launches.",
    },
    {
      q: "How fast can we actually start?",
      a: "Strategy Diagnosis tier kicks off within 3 working days. Lite and Full tiers can get the first executable step (Launch Video script kickoff, KOL shortlist review, or PH run-of-show) running within 7 days of signing.",
    },
    {
      q: "Is this conversation confidential?",
      a: "Yes. We don't disclose your product name, metrics, or partnership details in case studies, social posts, or talks without your explicit written consent. Our Paris team also follows GDPR data-minimization defaults by default.",
    },
  ],
};
