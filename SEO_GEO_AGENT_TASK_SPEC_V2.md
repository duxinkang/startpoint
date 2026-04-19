# StartPoint SEO / GEO Agent Task Spec — Round 2

生成时间: 2026-04-19
上一轮文档: `SEO_GEO_AGENT_TASK_SPEC.md`（P0/P1/P2 均已完成并上线）
适用对象: 继续修复 `https://www.startpointagency.com/` 和本地 Next.js 代码库 SEO / GEO 问题的执行 agent

---

## 背景 / 此轮目标

第一轮修复已经落地（默认 OG 图、title/description 改写、sitemap lastmod、`/services/seo-geo` 扩写 + FAQPage、结构化数据补齐、alt 文本、heading 顺序、表单 a11y、llms.txt、安全响应头）。

这份 V2 只列**尚未覆盖**或**仍有改进空间**的问题，主要来自：
- 二次代码审计（对照 V1 清单过滤）
- 线上 6 个核心页面的 HTML 实抓（首页 / services/seo-geo / cases / pricing / /en / sitemap.xml）

不再重复 V1 里的内容。

---

## 使用说明

- 按 `P0 → P1 → P2` 顺序执行，单条 commit 便于回滚。
- 每完成一条重新抓线上 HTML 验证。
- 不改业务文案定位和视觉风格；只修 SEO / GEO / 结构化 / 性能 / a11y。

---

## P0（阻断级，必须做）

### [ ] 任务名: 压缩首页与 Showcase 的自动播放视频，修复 LCP / 带宽

- 文件:
  - `src/components/sections/Hero.tsx`（第 28–45 行左右的自动播放 `<video>`）
  - `src/components/sections/Showcase.tsx`（`/videos/miro.mp4` 点击播放源）
  - `public/videos/poly.mp4`（当前约 25 MB）
  - `public/videos/miro.mp4`（当前约 74 MB）
  - `public/videos/ava-artisan.mp4`
  - `public/videos/posters/miro.jpg`（当前约 224 KB，比同尺寸的 poly.jpg 大 6 倍）
- 修改点:
  - 首页 Hero 背景视频（desktop autoplay）即使 `preload="none"`，一旦进入 autoplay 仍会拉完整文件——**目前对每个桌面端访客都下载 25 MB**，直接拖垮 LCP / INP。
  - 全部三个 MP4 转码到 ≤ 8 MB，H.264 + AV1 双 `<source>`，`poly.mp4` 目标 ≤ 4 MB（因为它是首屏自动播放）。
  - 首页 `<video>` 外层加 `matchMedia("(min-width: 1024px) and (prefers-reduced-data: no-preference)")` 条件，在移动端 / Save-Data 用户上退化为静态海报。
  - `miro.jpg` 按 `poly.jpg` 的压缩参数重导（或转 AVIF/WebP 让 `next/image` 处理）。
- 验收标准:
  - 三个 MP4 的 HTTP Content-Length 都 < 8 MB。
  - 首页首屏 LCP（移动端模拟 Slow 4G）< 2.5s。
  - `miro.jpg` 文件大小落到 < 60 KB。
  - Chrome DevTools Network 面板在移动端模拟下不再看到自动加载 `poly.mp4`。

### [ ] 任务名: 为核心路由补齐专属 OG 图

- 文件:
  - `src/app/[locale]/opengraph-image.tsx`（保留，作为兜底）
  - 新建 `src/app/[locale]/services/[slug]/opengraph-image.tsx`（或 `generateImageMetadata`）
  - 新建 `src/app/[locale]/cases/opengraph-image.tsx`
  - 新建 `src/app/[locale]/pricing/opengraph-image.tsx`
  - `src/lib/seo.ts`（允许各页面显式传 `image`）
- 修改点:
  - 目前全站 12 条路由（6 个 service × zh/en + cases / pricing / about / contact）**共享同一张** OG 图。分享到 X / LinkedIn 时全部显示 "StartPoint Agency"，而不是页面自己的主张（例如 "SEO + GEO 优化 — 同时被 Google 和 ChatGPT 推荐"）。
  - 至少为 6 个 service detail 各做一张动态 OG（复用 Satori + `opengraph-image.tsx` 约定），用 i18n 里的 `title` 做主标题，`tagline` 做副标题。
  - cases / pricing 各做一张独立 OG。
  - about / contact / privacy 继续共用兜底图即可。
- 验收标准:
  - `/services/seo-geo` 的 `og:image` URL ≠ `/services/launch-video` 的 `og:image` URL。
  - 用 `opengraph.xyz` 或 Twitter Card Validator 验证 6 条 service URL 返回的预览卡片标题各不相同。
  - `/en` 变体的 OG 图文案也是英文。

---

## P1（重要，建议近期完成）

### [ ] 任务名: 修复中英文界面里的语言漏字（bilingual leakage）

- 文件:
  - `src/components/sections/Team.tsx`（`TEAM` 硬编码）
  - `src/components/services/ProductHuntDetail.tsx`（`KEY OUTCOMES` 等硬编码英文小标题）
  - `src/components/services/SocialDetail.tsx`（`WHY REDDIT` 等）
  - `src/components/services/PaidAdsDetail.tsx`（`CHANNELS` / `METHODOLOGY` / `OUTCOMES`）
  - `src/app/[locale]/contact/page.tsx`（`EMAIL` 硬编码）
  - `src/components/Footer.tsx`（`Menu` / `Contact` 硬编码）
  - `src/app/[locale]/pricing/page.tsx`（`MOST POPULAR` 硬编码）
  - `src/messages/zh.json` / `src/messages/en.json`
- 修改点:
  - 所有硬编码的英文 eyebrow / section label 全部走 `useTranslations`。
  - 在 zh.json 里补中文版（"团队" / "关键成果" / "为什么选 Reddit" / "方法论" 等）。
  - 语言一致性信号对 Google 的 `hreflang` 和 LLM 的语言聚类都重要。
- 验收标准:
  - 手动切到 zh 版本，全站 eyebrow / section label 全是中文。
  - `view-source:/` 搜索 `KEY OUTCOMES` / `WHY REDDIT` / `METHODOLOGY` 返回 0 结果。

### [ ] 任务名: 扩写 ProductHunt / Social 两个偏薄的 service detail

- 文件:
  - `src/components/services/ProductHuntDetail.tsx`（目前 ~66 行，可见正文很薄）
  - `src/components/services/SocialDetail.tsx`（目前 ~65 行）
  - 参考标准: `SeoGeoDetail.tsx`（~235 行）、`KolDetail.tsx`（~112 行，带 "Why AI Agents..." + 三个坑卡片）
  - `src/messages/zh.json` / `src/messages/en.json`
- 修改点:
  - 照搬 `KolDetail` 的两列 depth block 模式：左列 answer-first 长文，右列 "常见坑 / 适用边界 / FAQ 精简版"。
  - ProductHunt 扩写重点: 冷启动 vs. 回流 Launch 的差异、榜单算法要点、上榜后 72 小时节奏、数字基线。
  - Social 扩写重点: Reddit / X / LinkedIn 三个子生态的差异、vertical subreddit 策略、Reddit anti-spam 规则、"不是买赞而是种用户"的边界。
  - 正文目标 ≥ 600 中文字 / 450 英文词，提高 thin-content 抗性。
- 验收标准:
  - 两个页面可见正文都 ≥ V1 SEO/GEO 页同一数量级。
  - 页面都新增独立 FAQ 区块 + 对应 FAQPage JSON-LD。

### [ ] 任务名: 补齐 sitemap 的 x-default hreflang

- 文件:
  - `src/app/sitemap.ts`
- 修改点:
  - 线上抓到的 `sitemap.xml` 每条 URL 只输出 `hreflang="zh-CN"` + `hreflang="en"`，**缺 `x-default`**。
  - `src/lib/seo.ts` 里的 `<link rel="alternate">` HTML tag 已经有 `x-default`，但 sitemap XML 里没有，两边不一致。
  - 在 `sitemap.ts` 的 `alternates.languages` 中补 `"x-default": …` 指向 zh 根路径。
- 验收标准:
  - 线上 `curl https://www.startpointagency.com/sitemap.xml | grep x-default` 每条 URL 都有一条命中。
  - Google Search Console > International Targeting 不再提示 "x-default not found"。

### [ ] 任务名: 补齐 Organization schema 的 `sameAs` 与 `contactPoint`

- 文件:
  - `src/lib/seo.ts`（`organizationSchema` 函数）
- 修改点:
  - 当前 `ProfessionalService` 没有 `sameAs`，Google Knowledge Graph 无法把 StartPoint 的 LinkedIn / X / YouTube / 小红书 / 即刻 合并成一个实体。
  - 没有嵌套的 `contactPoint`，只有顶层 `email`，不是 Google 推荐的结构。
  - 加上:
    ```ts
    sameAs: [
      "https://www.linkedin.com/company/startpoint-agency",
      "https://x.com/startpoint_ai",
      "https://www.youtube.com/@startpointagency",
      // 真实的媒体账号 URL 以实际账号为准
    ],
    contactPoint: [{
      "@type": "ContactPoint",
      contactType: "sales",
      email: "d541449473@gmail.com",
      availableLanguage: ["zh-CN", "en"],
      areaServed: ["CN", "US", "EU", "JP", "SG"],
    }],
    ```
- 验收标准:
  - Rich Results Test 对首页 Organization schema 显示 `sameAs` 和 `contactPoint` 字段都有效。
  - 至少 3 条真实的自有渠道 URL 写入（空的社媒占位别写）。

### [ ] 任务名: 首页补 `WebSite` schema（为 sitelinks search box 与实体聚合留位）

- 文件:
  - `src/lib/seo.ts`（新增 `websiteSchema`）
  - `src/app/[locale]/page.tsx`（emit 到 JSON-LD）
- 修改点:
  - 加 `WebSite` 基础 schema，`url` + `name` + `inLanguage`。
  - 若站点有搜索页（当前没有）就加 `potentialAction.SearchAction`；没有就只输出基础 `WebSite` 帮助实体 consolidation。
- 验收标准:
  - 首页 JSON-LD 里出现 `"@type": "WebSite"` 条目。
  - Rich Results Test 无 error。

### [ ] 任务名: /about 补 Person schema，让 3 位 founder 成为独立实体

- 文件:
  - `src/lib/seo.ts`（新增 `personSchema` helper）
  - `src/app/[locale]/about/page.tsx`
  - `src/components/sections/Team.tsx`（现成的 name / role / title 数据）
  - `src/messages/zh.json` / `src/messages/en.json`（每位 founder 的简介已经在 `team.members`）
- 修改点:
  - 为每位团队成员输出 `Person` schema，字段: `name` / `jobTitle` / `image`（`/team/<slug>.jpg`）/ `worksFor: { "@id": "${SITE_URL}#organization" }` / `sameAs`（LinkedIn 链接，若有）。
  - `@id` 用 `${SITE_URL}/about#person-<slug>`，便于跨站复用。
- 验收标准:
  - `/about` JSON-LD 出现 3 条 `Person` 条目。
  - Rich Results Test 通过。

### [ ] 任务名: 为 Showcase 的另外两条视频补 VideoObject schema

- 文件:
  - `src/app/[locale]/page.tsx`（首页 Showcase 下方 JSON-LD）或迁到 `/services/launch-video`
  - `src/lib/seo.ts`（已有 `videoObjectSchema` helper，可复用）
  - `public/videos/posters/miro.jpg` / `public/videos/posters/ava-artisan.jpg`（确认可用作 thumbnailUrl）
- 修改点:
  - 目前只 Poly.app 一条有 VideoObject。Blockit AI 与 Crunched **有播放数据、有 poster、有 contentUrl**，但没进结构化数据——Google Video 索引直接漏了。
  - 三条都各自 emit `VideoObject`，独立的 `name` / `description` / `contentUrl` / `uploadDate` / `duration`。
  - 同一 schema 同一页 emit 多条没问题。
- 验收标准:
  - 首页 source 里出现 3 条 `"@type": "VideoObject"`。
  - 每条都有独立的 `contentUrl`（别都指向 poly.mp4）。

### [ ] 任务名: 为 service detail 页面加兄弟服务交叉链接

- 文件:
  - `src/app/[locale]/services/[slug]/page.tsx`（底部 CTA 区域）
  - 或新建 `src/components/services/RelatedServices.tsx`
  - `src/i18n` 配置
- 修改点:
  - 访客在 `/services/seo-geo` 页面底部看不到任何指向 `/services/product-hunt` 或 `/services/launch-video` 的链接，尽管正文里反复提到这两个服务。
  - 建 `COMPLEMENTARY_SERVICES: Record<slug, [slug, slug]>` 映射，每个 detail 页底部 CTA 上方插入 2 张 "相关服务" 卡片。
  - 例如: `seo-geo → [product-hunt, launch-video]` / `launch-video → [kol, product-hunt]` / `kol → [launch-video, social]` 等。
- 验收标准:
  - 6 个 service detail 页每页底部都能看到 2 个相关服务链接。
  - Screaming Frog / squirrel 爬行深度：从首页到任一 service detail ≤ 2 跳，相邻 service 之间 ≤ 1 跳。

### [ ] 任务名: /cases 页面里每条 case 反向链到涉及的 service

- 文件:
  - `src/components/sections/CasesGrid.tsx`
  - `src/components/sections/FeaturedCaseStudy.tsx`
  - `src/messages/zh.json` / `src/messages/en.json`（给每条 case 加一个 `services: ["launch-video", "product-hunt"]` 数组）
- 修改点:
  - 目前 `/cases` 的每张卡片都是 pure content card，没有任何 outlink。
  - 在每张卡片下方（或 Featured Case 底部）加一行 "Services used: Launch Video · Product Hunt"，每个标签是一个 `<Link>` 指向对应 `/services/<slug>`。
- 验收标准:
  - 每条 case 至少 1 条指向 `/services/*` 的内部链接。
  - 不破坏现有视觉。

### [ ] 任务名: PaidAdsDetail 的 sr-only H2 改成可见并带意图关键词

- 文件:
  - `src/components/services/PaidAdsDetail.tsx`（当前有 3 个 `h2.sr-only`: "Channels" / "Methodology" / "Outcomes"）
- 修改点:
  - 屏幕阅读器可以，但 Google 看到 3 个英文 sr-only H2 + 1 个可见 H2，会稀释意图关键词信号。
  - 改成可见的 section heading，并带业务关键词：
    - "AI 产品投放的 4 个主渠道" / "4 channels we run for AI products"
    - "我们的投放方法论" / "Our paid-ads methodology for AI startups"
    - "客户拿到的结果" / "Paid-ads outcomes we ship"
- 验收标准:
  - 页面源码搜索 `sr-only` 对 H2 返回 0 命中。
  - 视觉上相应 section 顶部出现新的小标题。

### [ ] 任务名: Nav logo 链接加 aria-label + Footer 自引链接移除

- 文件:
  - `src/components/Nav.tsx`（logo `<Link>` 只有 `focus:outline-none`，没有 aria-label）
  - `src/components/Footer.tsx`（底部有一条 `<a href="https://www.startpointagency.com/">www.startpointagency.com</a>` 自引链接）
- 修改点:
  - `<Link href="/" aria-label={t("site.name")}>` 给 logo 链接一个无障碍名称。
  - Footer 里自引的整条 `<a>` 改成纯文本 `<span>`——自己链自己既 clutter 又对内链价值为 0。
- 验收标准:
  - Lighthouse a11y 不再提示 "Links do not have discernible names"。
  - 站点内 `grep www.startpointagency.com` 的自链删干净。

### [ ] 任务名: llms.txt 动态化日期 + 抽离价格到共享常量

- 文件:
  - `src/app/llms.txt/route.ts`（当前 `Last updated: 2026-04-19` 和 ¥15,000 / ¥30,000-50,000 / ¥80,000-120,000 硬编码）
  - 新建 `src/lib/pricing.ts`（或 `src/lib/brand-constants.ts`）
  - `src/app/[locale]/pricing/page.tsx`（目前从 i18n JSON 读价格，改成从 `pricing.ts` 读）
- 修改点:
  - `Last updated` 改为 `new Date().toISOString().slice(0, 10)` 或从 sitemap 的 LAST_MODIFIED 映射里取最大值。
  - 价格抽一个 `PRICING_TIERS` 常量，llms.txt 和 pricing 页面共同消费。
  - 避免人肉改价格时漏掉 llms.txt 导致 LLM 回答给出过时数字。
- 验收标准:
  - 改 `PRICING_TIERS` 里的数字，llms.txt 和 pricing 页同步变化。
  - 两次 `curl /llms.txt` 的 Last updated 值反映真实最近更新（不是请求时间但也不是 1 个月前的常量）。

### [ ] 任务名: 明确 trailingSlash 策略

- 文件:
  - `next.config.ts`
- 修改点:
  - 没设 `trailingSlash`，默认 `false`。加 `trailingSlash: false` 显式表态。
  - （可选）加一个 `redirects()` 把 `/services/` 301 到 `/services`。
- 验收标准:
  - `curl -I https://www.startpointagency.com/services/` 要么 301 要么稳定 200；两次请求行为一致。
  - 无 "canonical conflict" 类告警。

### [ ] 任务名: Service schema 的 areaServed 与 Organization 对齐

- 文件:
  - `src/lib/seo.ts`（`serviceSchema` 的 `areaServed: "Global"` 硬编码）
- 修改点:
  - `organizationSchema` 声明 `["CN","US","EU","JP","SG","Global"]`，`serviceSchema` 只写 `"Global"`，两边不一致。
  - 改成和 Organization 一致，或明确语义上只在 Global 提供。
- 验收标准:
  - 两处 schema 的 areaServed 数组相同。

### [ ] 任务名: /en/pricing 的 OfferCatalog 能正确抽取 USD 价格

- 文件:
  - `src/lib/seo.ts`（`offerCatalogSchema`）
  - `src/app/[locale]/pricing/page.tsx`
- 修改点:
  - 当前价格抽取应该只匹配 `¥`，en 页面的 `$` 价没进 schema，导致 `/en/pricing` 的 Offer schema 全是无价格条目。
  - 改成兼容 `[¥$€]` 或从上面第 10 条提到的 `PRICING_TIERS` 常量直接拿。
- 验收标准:
  - `/en/pricing` 源码的 Offer JSON-LD 每条都有 `priceSpecification`。

---

## P2（锦上添花）

### [ ] 任务名: /cases 把 llms.txt 里声称的 SEO 增长数字落到页面上

- 文件:
  - `src/messages/zh.json` / `src/messages/en.json`（`cases.items`）
  - `src/components/sections/CasesGrid.tsx`（视觉上加一个 metric 小字段）
- 修改点:
  - llms.txt 声称 "monthly organic traffic grew from 2,000 to 18,000+ in 6 months, first-page keyword count rose 420%, CAC fell 65%"。
  - 如果 `/cases` 可见正文里没这些数字，LLM 引用时就没有对应 on-page 佐证。
  - 在 SEO case 条目里补上这三个数字。
- 验收标准:
  - `/cases` 页面能看到 "2k→18k / +420% / -65% CAC" 三个数字。

### [ ] 任务名: Footer 加 6 个 service slug 深链

- 文件:
  - `src/components/Footer.tsx`
  - `src/messages/zh.json` / `src/messages/en.json`
- 修改点:
  - 现在 Footer 只有顶层导航（Services / Cases / About / Pricing / Contact）。
  - 加一列 "Services" 展开列出 6 个 slug 的链接，站内爬行深度从 2 降到 1，footer 内链权重也能更均匀传递给每个 service detail。
- 验收标准:
  - Footer 里能看到 6 条独立的 `/services/<slug>` 链接。

### [ ] 任务名: 首页加 Sanity CDN 的 preconnect（若 Sanity 图片真的被使用）

- 文件:
  - `src/app/[locale]/layout.tsx`（或 `<Head>` 注入点）
- 修改点:
  - CSP 允许 `cdn.sanity.io`，但 `<head>` 没 `<link rel="preconnect" href="https://cdn.sanity.io">`。如果 Sanity 图片真出现在首屏，preconnect 能省 100-200ms。
  - 先确认 Sanity 图片确实在生产用（否则直接跳过）。
- 验收标准:
  - Lighthouse "Preconnect to required origins" 不再提示 Sanity CDN。

### [ ] 任务名: 清理 robots.ts 里的死规则

- 文件:
  - `src/app/robots.ts`（`disallow: [..., "/studio/"]`）
- 修改点:
  - 代码树里没看到 `/studio` 路由。删这条 disallow，或者如果确实留着做 Sanity Studio 入口但没上线，保留但加注释解释。
- 验收标准:
  - `/robots.txt` 要么不再出现 `/studio/`，要么有对应的真实路由。

### [ ] 任务名: 把 /llms.txt 放进 sitemap（可选）

- 文件:
  - `src/app/sitemap.ts`
- 修改点:
  - 不是硬性规范，但把 `/llms.txt` 以低优先级（0.1）放进 sitemap，有助于 AI crawler 发现。
- 验收标准:
  - sitemap.xml 多一条 `/llms.txt` URL。

### [ ] 任务名: SeoGeoDetail 里重复的 H2 下调为 H3（结构清理）

- 文件:
  - `src/components/services/SeoGeoDetail.tsx`（大约第 130、161 行的重复 H2）
- 修改点:
  - 同一个 section 里两个 H2 容易相互稀释，把"附加论点"那条降级为 H3。
- 验收标准:
  - 页面只有一个主 H1 + 每个 section 一个 H2 + 内部细分 H3。

---

## 建议执行顺序

1. **本周**: P0（两条）—— 视频压缩 + 专属 OG 图。性能和分享质量直接影响投放转化，回报最大。
2. **两周内**: P1 里的内容/schema 类（bilingual leakage、ProductHunt/Social 扩写、sitemap x-default、Organization sameAs、WebSite、Person、VideoObject、兄弟服务交叉链、cases→services 反链）。这些是 GEO/实体识别的地基。
3. **有余力时**: P1 尾部 + P2（trailingSlash、Service areaServed、USD Offer、案例数字落页、Footer 深链、Sanity preconnect、robots 清理、llms.txt 入 sitemap、SeoGeoDetail H2→H3）。

---

## 完成定义

- 首页三条视频文件均 < 8 MB，移动端不再自动拉 `poly.mp4`。
- 6 个 service detail 各有独立 OG 图。
- `/en` 子树全英文、zh 子树全中文，无 bilingual leakage。
- ProductHunt / Social 页面正文深度与 `/services/seo-geo` / `/services/kol` 对齐，带独立 FAQ + FAQPage JSON-LD。
- sitemap.xml 每条 URL 都含 `x-default`。
- 首页源码能看到 `Organization`（带 sameAs + contactPoint）/ `WebSite` / 3 条 `VideoObject`。
- `/about` 源码能看到 3 条 `Person`。
- 任一 `/services/<slug>` 底部有 2 条兄弟服务卡片。
- `/cases` 每条 case 至少 1 条指向 `/services/<slug>`。
- llms.txt 的日期 / 价格与代码其他位置同步，不再漂移。
- Lighthouse SEO & a11y 分数 ≥ 95；Rich Results Test 所有核心页面 0 error。
