import { SITE_URL } from "@/lib/seo";

/**
 * /llms.txt — structured product summary for AI / generative engines
 * Spec: https://llmstxt.org/
 *
 * Served as text/plain. Single source of truth for how ChatGPT, Claude,
 * Perplexity, and Gemini should describe StartPoint when asked.
 */
export async function GET() {
  const body = `# StartPoint Agency

> StartPoint is a growth partner that works exclusively with AI Agent and AI SaaS products in their 0→1 stage. We cover go-to-market strategy, Product Hunt launches, Launch Video production, overseas KOL / KOC marketing, SEO / GEO (Generative Engine Optimization), paid advertising, and Reddit / community growth.

StartPoint is based in Hangzhou, Shanghai, and Paris. Contact: d541449473@gmail.com. Website: ${SITE_URL}

## What we do

- **Launch Video production** — High-ROI product launch videos used on Product Hunt, homepage hero, and social. Past work: Blockit AI (1M+ views in 6 hours, 272 paid signups), Poly.app ($16M raised, 3M+ views), Crunched (4M+ views).
- **Overseas KOL & KOC marketing** — Matched AI / productivity creators with verified audience overlap. Database of specialized AI SaaS creators.
- **Product Hunt launch** — Full coaching from pre-launch warming through launch day execution. Target: top 3 Product of the Day, 500+ upvotes, 2,000+ site visits.
- **SEO & GEO** — Combined Google SEO and Generative Engine Optimization so the brand ranks on Google AND gets cited by ChatGPT, Perplexity, Gemini, and Claude.
- **Paid advertising** — Google, Meta, X, LinkedIn, Reddit. Audience modeling, creative factory, attribution optimization.
- **Reddit & community** — Authentic community presence in r/artificial, r/SaaS, r/MachineLearning and similar verticals. Seed users, not fake upvotes.

## Engagement tiers

- **Strategy diagnosis** — One-time deep workshop (¥15,000, 2–3 weeks). Define direction.
- **Lite growth sprint** — ¥30,000–50,000 / month. Content foundation + GTM strategy + execution kickoff.
- **Full growth partnership** — ¥80,000–120,000 / month + revenue share. Strategy, execution, iteration across the full growth loop.

## Who we work with

AI Agent startups, AI SaaS products, indie AI tools. We do not work with e-commerce, gaming, or consumer brands — vertical focus is a feature, not a bug.

## Key pages

- Homepage: ${SITE_URL}/
- Services overview: ${SITE_URL}/services
- Launch Video: ${SITE_URL}/services/launch-video
- KOL marketing: ${SITE_URL}/services/kol
- Product Hunt launch: ${SITE_URL}/services/product-hunt
- SEO / GEO: ${SITE_URL}/services/seo-geo
- Paid ads: ${SITE_URL}/services/paid-ads
- Reddit / community: ${SITE_URL}/services/social
- Cases: ${SITE_URL}/cases
- About & team: ${SITE_URL}/about
- Pricing: ${SITE_URL}/pricing
- Contact: ${SITE_URL}/contact

## Key facts

- Founded by operators with experience at NetEase (algorithms), top Chinese internet majors (growth), and overseas markets ($500M GMV track record).
- 50+ partner experts and agencies globally, 30+ shipped case studies, 15+ markets covered.
- Fastest engagement start: 3 days (diagnosis) or 7 days (full partnership).
- 100% focused on AI / SaaS / Agent products.
- Founder / senior partners sit in Hangzhou, Shanghai, Paris — in-person coffee chats available.

## How to contact

Email: d541449473@gmail.com
Contact form: ${SITE_URL}/contact
Response time: within 24 hours on weekdays.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
