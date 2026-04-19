"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { cardClasses } from "@/components/ui/Card";
import { getSocialFaq } from "@/lib/seo";

export function SocialDetail() {
  const t = useTranslations("serviceDetails.social");
  const locale = useLocale();
  const isZh = locale === "zh";
  const values = t.raw("values") as string[];
  const steps = t.raw("steps") as { title: string; text: string }[];
  const faq = getSocialFaq(locale);

  return (
    <>
      <Section bg="cream" spacing="tight">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            {/* Left: Values card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-ink text-white p-8 md:p-10"
            >
              <h2 className="font-bold text-xl mb-6 text-orange-300">
                {t("whyKicker")}
              </h2>
              <ul className="space-y-4">
                {values.map((v) => (
                  <li
                    key={v}
                    className="flex gap-3 text-white leading-relaxed"
                  >
                    <span className="text-orange-300 mt-1.5">•</span>
                    <span>{v}</span>
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

          {/* Depth — why Reddit community isn't advertising */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
            <div>
              <h2 className="sp-display text-2xl md:text-3xl text-ink leading-tight">
                {isZh
                  ? "为什么 Reddit 上的品牌建设，不是投广告"
                  : "Why Reddit brand-building isn't advertising"}
              </h2>
              <div className="mt-5 space-y-4 text-ink/75 leading-relaxed">
                <p>
                  {isZh
                    ? "Reddit 用户对营销内容的敏感度，在所有主流平台里排第一。一句略显卖点的开场都可能被版主直接移除；更糟的是，早期走样的账号会在整个社区里留下「又一个做号团队」的印象——之后无论发什么都没人互动。这也是为什么传统 Agency 做 Reddit 大多失败：他们在 Reddit 的评论框里写 LinkedIn 的帖子。"
                    : "Redditors have the sharpest marketing-allergy on any major platform. A mildly sales-y opener gets removed by mods; worse, a botched early presence sticks to the whole community — 'another agency account' means nothing you post later gets traction. This is why traditional agencies fail on Reddit: they write LinkedIn posts inside a Reddit comment box."}
                </p>
                <p>
                  {isZh
                    ? "我们的做法反着来：先用 3-5 个月在核心 Subreddit 里只做有价值的技术讨论、产品比较和长文分享，不带任何产品链接。账号权重起来之后，我们再以「我们正好在做这件事」的方式自然引出产品。一条被顶到高位的真实讨论帖，长尾价值远超一个月的付费投流。"
                    : "Our approach runs the opposite direction. For the first 3-5 months we only post genuine technical discussion, product comparisons, and long-form learnings inside 3-5 chosen subreddits — no product links. Once the account has real karma, we surface the product the natural way: 'we were actually building something for this.' One authentic 200-upvote thread compounds into months of long-tail traffic — worth more than a month of paid."}
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
                      "不在没有账号权重时发产品帖——会被版主直接秒删",
                      "不用假人设——所有账号绑定真实团队成员，经得起历史记录检查",
                      "不承诺具体票数——Reddit 算法会惩罚明显被组织的投票行为",
                      "不把 Reddit 当短期渠道——少于 3 个月的合作我们不接",
                    ]
                  : [
                      "No product posts before an account has real karma — mods will remove them instantly",
                      "No personas or fake identities — every account maps to a real team member with a searchable history",
                      "No promised upvote counts — Reddit's algorithms penalize any pattern that looks organized",
                      "No short-term engagements — anything under 3 months, we pass",
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
                ? "社区运营之前，founder 最常问的问题"
                : "The questions founders ask before going in"}
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
