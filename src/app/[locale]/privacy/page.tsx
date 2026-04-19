import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

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
        ? "隐私政策 — StartPoint AI Agent 增长机构"
        : "Privacy Policy — StartPoint AI Agent growth agency",
    description:
      locale === "zh"
        ? "StartPoint 的隐私政策:我们收集哪些信息、如何使用、如何与第三方共享、你对自己数据享有的权利,以及 GDPR / CCPA 合规承诺。"
        : "StartPoint's privacy policy — what we collect, how we use it, who we share it with, your GDPR / CCPA rights, and how to exercise them.",
    path: "/privacy",
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === "zh";

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: isZh ? "隐私政策" : "Privacy Policy", path: "/privacy" },
        ])}
      />

      <Section bg="paper">
        <Container size="lg">
          <Pill variant="orange" size="md" className="mb-6">
            {isZh ? "隐私政策" : "Privacy Policy"}
          </Pill>
          <h1 className="sp-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
            {isZh ? "隐私政策" : "Privacy Policy"}
          </h1>
          <p className="mt-6 text-sm text-ink/55">
            {isZh
              ? "最近更新:2026 年 4 月 18 日"
              : "Last updated: April 18, 2026"}
          </p>

          {isZh ? <ZhBody /> : <EnBody />}
        </Container>
      </Section>
    </>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-ink/75 leading-relaxed text-base">
      {children}
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="sp-display text-2xl md:text-3xl text-ink mt-10 mb-3">
      {children}
    </h2>
  );
}

function ZhBody() {
  return (
    <Prose>
      <p>
        StartPoint(&ldquo;我们&rdquo;、&ldquo;本机构&rdquo;)重视每一位访问者与客户的隐私。本政策说明了我们在
        www.startpointagency.com(以下简称&ldquo;本网站&rdquo;)以及线下咨询
        / 合作过程中会收集哪些个人信息、如何使用这些信息、以及你对自己的信息享有的权利。
      </p>

      <H2>我们收集哪些信息</H2>
      <p>
        我们仅收集为开展业务所必需的最少信息:(1)你在&ldquo;联系我们&rdquo;表单中主动提交的姓名、邮箱、公司与产品阶段、留言内容;(2)标准的服务器访问日志(匿名 IP、User-Agent、访问时间戳),用于安全防护与流量分析;(3)为合规与 AI 答案引擎优化(GEO)所需的基础站点元数据。
      </p>
      <p>
        我们不会在本网站主动收集银行卡号、护照号、社会保障号码或其他敏感身份数据。也不会通过 cookie 或第三方脚本在你不知情的情况下追踪你跨站点的行为。
      </p>

      <H2>我们如何使用这些信息</H2>
      <p>
        你通过联系表单提交的信息,只用于回复你的具体咨询、安排免费 30 分钟对谈、或发送与本次咨询直接相关的资料。我们不会把你的邮箱用于未经允许的推广群发,也不会把客户名单出售或转让给任何第三方。
      </p>
      <p>
        服务器访问日志仅由核心团队成员在排查技术问题、分析流量来源或防御恶意请求时查阅,保留期限不超过 90 天。
      </p>

      <H2>我们如何与第三方共享</H2>
      <p>
        为运营必要,我们使用以下可信的第三方服务处理数据,其隐私条款均符合业界主流标准:托管与 CDN(Vercel)、邮件收发(d541449473@gmail.com 自营邮箱与相应 SMTP 提供商)、以及必要时的财务票据处理。我们不会将你的信息共享给上述范围之外的任何第三方。
      </p>

      <H2>你享有的权利(GDPR / CCPA)</H2>
      <p>
        如果你位于欧盟 / 英国 / 加州等适用隐私法律的地区,你有权:查询我们持有的关于你的信息、要求更正或删除这些信息、撤回此前授予的处理同意、以及就涉嫌违规行为向所在地数据保护机构投诉。要行使任一权利,请发送邮件至 d541449473@gmail.com,我们会在 30 天内回复。
      </p>

      <H2>Cookie 与分析</H2>
      <p>
        本网站默认不使用非必要 cookie,也不加载第三方广告追踪器。任何未来接入的匿名分析工具都会事先在本政策中披露,并为位于欧盟地区的访问者提供符合 ePrivacy 指令要求的选择机制。
      </p>

      <H2>儿童隐私</H2>
      <p>
        本网站面向企业决策者,不针对 16 岁以下儿童。如果我们发现收集到了此类信息,会立即删除。
      </p>

      <H2>变更</H2>
      <p>
        本政策可能会不定期更新。任何变更均会在本页面顶部标注&ldquo;最近更新&rdquo;日期。
      </p>

      <H2>联系方式</H2>
      <p>
        如对本政策或你的个人信息有任何疑问、或希望行使上述权利,请发送邮件至{" "}
        <a
          href="mailto:d541449473@gmail.com"
          className="text-orange-600 hover:text-orange-700 underline"
        >
          d541449473@gmail.com
        </a>
        。线下办公地址:杭州 / 上海 / 巴黎。
      </p>
    </Prose>
  );
}

function EnBody() {
  return (
    <Prose>
      <p>
        StartPoint (&ldquo;we&rdquo;, &ldquo;us&rdquo;) takes the privacy of
        every visitor and client seriously. This policy explains what personal
        information we collect through{" "}
        <span className="whitespace-nowrap">www.startpointagency.com</span>{" "}
        (the &ldquo;Site&rdquo;) and in the course of our consulting work, how
        we use that information, and the rights you have over your data.
      </p>

      <H2>Information we collect</H2>
      <p>
        We collect only the minimum information needed to run the business:
        (1) the name, email, company, product stage and message you submit
        through the contact form; (2) standard server access logs (anonymized
        IP, user agent, timestamps) used for security and basic traffic
        analysis; and (3) baseline site metadata required for compliance and
        for AI-answer-engine optimization (GEO).
      </p>
      <p>
        We do not collect bank card numbers, passport numbers, social-security
        numbers, or other sensitive identifiers through this site. We also do
        not use third-party tracking scripts that follow you across the web.
      </p>

      <H2>How we use it</H2>
      <p>
        Information you submit via the contact form is used only to respond to
        your inquiry, to schedule a free 30-minute consultation, or to send
        materials directly relevant to that conversation. We never add your
        email to a marketing blast without explicit opt-in, and we never sell
        or lease client lists.
      </p>
      <p>
        Access logs are viewed only by core team members when investigating
        technical issues, diagnosing traffic sources, or defending against
        malicious requests. Logs are retained for no more than 90 days.
      </p>

      <H2>Third-party sharing</H2>
      <p>
        For operational necessity we rely on these trusted vendors, each of
        which meets industry-standard privacy and security requirements:
        hosting and CDN (Vercel), email delivery
        (d541449473@gmail.com backed by a compliant SMTP provider), and — when
        invoiced — our financial records processor. We do not share your
        information with any party outside that scope.
      </p>

      <H2>Your rights (GDPR / CCPA)</H2>
      <p>
        If you are in the EU, UK, California, or another jurisdiction with
        comparable privacy laws, you have the right to request a copy of the
        data we hold about you, ask us to correct or delete it, withdraw any
        consent you previously gave, and file a complaint with your local data
        protection authority. To exercise any of these rights, email{" "}
        <a
          href="mailto:d541449473@gmail.com"
          className="text-orange-600 hover:text-orange-700 underline"
        >
          d541449473@gmail.com
        </a>
        . We will respond within 30 days.
      </p>

      <H2>Cookies &amp; analytics</H2>
      <p>
        The Site does not set non-essential cookies by default and does not
        load third-party ad trackers. If we add anonymized analytics in the
        future, we will disclose it here first and offer EU visitors an
        ePrivacy-compliant choice.
      </p>

      <H2>Children&rsquo;s privacy</H2>
      <p>
        This site is aimed at business decision-makers and is not directed at
        anyone under 16. If we ever learn we have collected data from a child,
        we will delete it immediately.
      </p>

      <H2>Changes</H2>
      <p>
        We may update this policy from time to time. Any change will be
        reflected in the &ldquo;Last updated&rdquo; date at the top of this
        page.
      </p>

      <H2>Contact</H2>
      <p>
        Questions about this policy or your data? Email{" "}
        <a
          href="mailto:d541449473@gmail.com"
          className="text-orange-600 hover:text-orange-700 underline"
        >
          d541449473@gmail.com
        </a>
        . Offices: Hangzhou / Shanghai / Paris.
      </p>
    </Prose>
  );
}
