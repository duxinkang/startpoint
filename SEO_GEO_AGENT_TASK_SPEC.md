# StartPoint SEO / GEO Agent Task Spec

更新时间: 2026-04-19
适用对象: 负责修复 `https://www.startpointagency.com/` 及本地 Next.js 代码库 SEO / GEO 问题的执行 agent

## 使用说明

- 按优先级从 `P0` 到 `P2` 执行。
- 每完成一项后，重新检查对应页面线上 HTML 输出与本地实现是否一致。
- 除非任务明确要求，否则不要改动站点视觉风格或业务文案定位，只修复 SEO / GEO / 结构化数据 / 可访问性 / 性能相关问题。
- 完成一批后建议重新运行网站审计，确认 warning / fail 是否下降。

---

## P0

### [ ] 任务名: 补齐核心页面的 OG/Twitter 图片输出

- 文件:
  - `src/lib/seo.ts`
  - `src/app/[locale]/cases/page.tsx`
  - `src/app/[locale]/about/page.tsx`
  - `src/app/[locale]/pricing/page.tsx`
  - `src/app/[locale]/contact/page.tsx`
  - `src/app/[locale]/privacy/page.tsx`
  - `src/app/[locale]/opengraph-image.tsx`
- 修改点:
  - 解决 `buildMetadata()` 只有显式传入 `image` 才输出 `og:image` / `twitter:image` 的问题。
  - 为全站提供稳定的默认 OG 图策略，不要让 `about`、`cases`、`pricing`、`contact`、`privacy` 等页面缺图。
  - 如有必要，在 `buildMetadata()` 内自动生成默认图片 URL，或让各页面显式传入同一张站点级图片。
  - 确保中英文页面都能输出对应的 OG/Twitter 图片。
- 验收标准:
  - 以下页面线上 HTML 都含有 `og:image` 和 `twitter:image`:
    - `/about`
    - `/cases`
    - `/pricing`
    - `/contact`
    - `/privacy`
    - 对应 `/en/*` 页面
  - 社交分享卡片不再出现无图情况。

### [ ] 任务名: 重写过短或过长的 title / meta description

- 文件:
  - `src/app/[locale]/services/page.tsx`
  - `src/app/[locale]/cases/page.tsx`
  - `src/app/[locale]/services/[slug]/page.tsx`
  - `src/app/[locale]/page.tsx`
  - `src/app/[locale]/about/page.tsx`
  - `src/app/[locale]/pricing/page.tsx`
  - `src/app/[locale]/contact/page.tsx`
  - `src/messages/zh.json`
  - `src/messages/en.json`
- 修改点:
  - 重写 `/services`、`/cases` 的过短 title。
  - 缩短 `/services/paid-ads` 的过长 title。
  - 扩写首页、about、cases、contact、pricing 等页面 description，使其更完整、更可点击。
  - 优化原则:
    - title 避免过短或过长
    - description 不要只是概述，应包含差异化价值和结果导向表达
    - 中英文分别优化，不做机械直译
- 验收标准:
  - 线上审计不再提示这些核心页面 title 过短/过长。
  - 线上审计不再提示首页、about、cases、contact、pricing description 过短。
  - 手动抓取页面 HTML 时可看到新的 title / description 已生效。

### [ ] 任务名: 修复 sitemap 的伪更新时间问题

- 文件:
  - `src/app/sitemap.ts`
- 修改点:
  - 移除 `lastModified: new Date()` 这种每次请求都变化的做法。
  - 为静态页面提供稳定且可信的 `lastModified` 来源。
  - 如果当前没有 CMS 真实更新时间，至少使用人工维护的稳定时间映射，不要每次请求都刷新。
- 验收标准:
  - 连续两次请求 `sitemap.xml`，在页面内容未变化时，`lastmod` 不应每次都变。
  - `sitemap.xml` 中的更新时间能代表真实内容更新，而不是请求时间。

### [ ] 任务名: 提升 SEO/GEO 服务页的可引用性

- 文件:
  - `src/components/services/SeoGeoDetail.tsx`
  - `src/app/[locale]/services/[slug]/page.tsx`
  - `src/messages/zh.json`
  - `src/messages/en.json`
  - `src/lib/seo.ts`
- 修改点:
  - 把当前偏短的卡片式内容扩展成可被搜索引擎和 AI 抽取的正文结构。
  - 增加 answer-first 内容块，至少覆盖:
    - 什么是 GEO
    - GEO 与传统 SEO 的区别
    - 适合什么阶段的 AI 产品
    - StartPoint 具体怎么做
    - 交付结果和衡量方式
  - 增加 FAQ 区块，并输出 FAQPage schema。
  - 增加更具体的案例数字、流程、术语定义和适用边界。
- 验收标准:
  - `/services/seo-geo` 页面正文显著扩展，不再只有简短步骤卡片。
  - 页面包含明确 FAQ 区块。
  - 页面输出 FAQPage JSON-LD。
  - 页面更适合被 ChatGPT / Perplexity / Google AI Overview 直接抽取答案。

### [ ] 任务名: 扩展高价值页面的结构化数据覆盖

- 文件:
  - `src/lib/seo.ts`
  - `src/app/[locale]/cases/page.tsx`
  - `src/app/[locale]/pricing/page.tsx`
  - `src/app/[locale]/contact/page.tsx`
  - `src/app/[locale]/about/page.tsx`
  - `src/app/[locale]/services/[slug]/page.tsx`
  - `src/components/JsonLd.tsx`
- 修改点:
  - 保持现有 `Organization` / `Service` / `Breadcrumb` 基础上，给高意图页面增加更匹配的 schema。
  - 建议方向:
    - `cases`: case-study / project / creative work 类 schema
    - `pricing`: FAQPage 或 Offer 相关结构化数据
    - `contact`: ContactPoint / FAQPage
    - `about`: Organization 补充字段或团队相关实体信息
    - 各 service detail: FAQPage，必要时补 Offer / ItemList / HowTo 风格结构
- 验收标准:
  - 不再只有首页拥有较完整 schema。
  - 各核心页面都输出与页面意图匹配的 JSON-LD。
  - 结构化数据内容与页面正文一致，不出现虚构字段。

---

## P1

### [ ] 任务名: 修复案例与视频模块缺失 alt 文本

- 文件:
  - `src/components/sections/Showcase.tsx`
  - `src/components/services/LaunchVideoDetail.tsx`
- 修改点:
  - 修复 poster 图 `alt=""` 的问题。
  - 如果这些图承载案例信息，应补充描述性 alt。
  - 如果某些图确实是纯装饰，则应确认不会被审计误判为信息图。
- 验收标准:
  - 首页 Showcase 与 `/services/launch-video` 不再出现 missing alt text warning。
  - alt 文案能描述具体案例内容，而不是泛泛写成 “image” 或 “poster”。

### [ ] 任务名: 修复 heading 层级跳跃

- 文件:
  - `src/app/[locale]/pricing/page.tsx`
  - `src/components/services/LaunchVideoDetail.tsx`
  - 如修复中发现其他页面也有跳级，一并处理
- 修改点:
  - 让页面 heading 结构按语义顺序展开。
  - 避免 `h1` 后直接进入 `h3`，或 `h2` 后直接进入 `h4`。
  - 不要只为了样式保留错误 heading。
- 验收标准:
  - `/pricing` 与 `/services/launch-video` 不再触发 heading-order warning。
  - 页面文档结构符合 `h1 -> h2 -> h3` 语义层级。

### [ ] 任务名: 修复联系表单的可访问性和防垃圾实现

- 文件:
  - `src/components/forms/ContactForm.tsx`
  - 如有需要:
    - `src/app/api/contact/route.ts`
- 修改点:
  - 解决 honeypot input 位于 `aria-hidden` 容器中导致的可访问性错误。
  - 保留反垃圾思路，但采用不会触发 a11y fail 的隐藏方式。
  - 为公开表单增加更可靠的防滥发机制，至少比纯 honeypot 更稳。
- 验收标准:
  - `/contact` 不再触发 `focusable element inside aria-hidden`。
  - 表单仍能正常提交。
  - 站点具备基本 anti-spam 保护，不是完全裸露。

### [ ] 任务名: 优化首页和视频模块的性能信号

- 文件:
  - `src/components/sections/Hero.tsx`
  - `src/components/sections/Showcase.tsx`
  - `src/components/services/LaunchVideoDetail.tsx`
  - `src/components/sections/Team.tsx`
  - `src/app/globals.css`
  - 其他导致大 CSS / 阻塞资源的文件
- 修改点:
  - 检查首页首屏视频背景是否对首屏性能有负担。
  - 优化 LCP 资源的加载顺序。
  - 处理 above-the-fold 图片懒加载、poster 压缩、图片尺寸声明、非必要资源阻塞。
  - 调查并收缩过大的 CSS 输出。
- 验收标准:
  - 重新审计后，Performance warning 明显减少。
  - 首页首屏关键资源更少，LCP 信号改善。
  - 不再出现首屏关键图片错误懒加载的提示。

---

## P2

### [ ] 任务名: 修复语言切换按钮的 accessible name mismatch

- 文件:
  - `src/components/Nav.tsx`
- 修改点:
  - 处理语言切换按钮 visible text 与 `aria-label` 不一致的问题。
  - 让按钮的可访问名称与真实显示语义一致。
- 验收标准:
  - 审计不再报 language toggle 的 accessible name mismatch。

### [ ] 任务名: 强化 llms.txt 内容质量

- 文件:
  - `src/app/llms.txt/route.ts`
  - 如有需要，可新增相关辅助文本路由
- 修改点:
  - 保留现有品牌摘要，但补充更适合 AI crawler 使用的事实组织方式。
  - 增加更清晰的证据页映射、案例页映射、服务页映射、更新时间、可信事实块。
  - 可考虑增加更完整的机器可读补充文档，但不要破坏现有 `llms.txt` 可访问性。
- 验收标准:
  - `llms.txt` 不只是 brochure 式介绍，而是更像机器摘要和导航文件。
  - AI agent 能更容易从中定位高价值页面和可信事实。

### [ ] 任务名: 补齐安全响应头

- 文件:
  - `next.config.ts`
  - 如项目采用 middleware / headers 方案，也可修改相关实现
- 修改点:
  - 增加基础 `Content-Security-Policy`
  - 增加点击劫持防护，如 `X-Frame-Options`
  - 保证新增响应头不会误伤现有站点功能
- 验收标准:
  - 线上响应头中出现基础 CSP 与 clickjacking protection。
  - 页面核心功能、资源加载、表单提交不受影响。

---

## 建议执行顺序

1. 先完成:
   - OG/Twitter 图片
   - title / description
   - sitemap lastmod
   - SEO/GEO 服务页扩写
   - 结构化数据补齐
2. 再完成:
   - alt 文本
   - heading 语义
   - 联系表单
   - 首页性能
3. 最后完成:
   - Nav a11y
   - llms.txt 强化
   - 安全响应头

## 完成定义

- 线上核心页面 HTML 已反映修复结果。
- `squirrel audit` 或同类审计工具中的 fail 显著下降。
- 核心页面:
  - `/`
  - `/services`
  - `/services/seo-geo`
  - `/cases`
  - `/about`
  - `/pricing`
  - `/contact`
  - `/privacy`
  - 对应 `/en/*`
  都完成 metadata、schema、内容深度、可访问性和基础性能收口。
