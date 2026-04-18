import { NextResponse } from "next/server";

/**
 * Contact form POST handler.
 *
 * Delivery priority (tries each in order, succeeds if ANY works):
 *   1. Feishu / Lark custom bot webhook (if FEISHU_WEBHOOK_URL set)
 *   2. Resend transactional email       (if RESEND_API_KEY set)
 *   3. Generic webhook                  (if CONTACT_FORWARD_URL set)
 *   4. Console log                      (always — visible in Vercel logs)
 *
 * ─────────────────────────────────────────────────────────────
 * 飞书机器人配置步骤
 * ─────────────────────────────────────────────────────────────
 * 1. 飞书 → 目标群组 → 右上角 "⋯" → 设置 → 机器人 → 添加机器人 → 自定义机器人
 * 2. 复制 Webhook URL（格式：https://open.feishu.cn/open-apis/bot/v2/hook/xxxx）
 * 3. Vercel Dashboard → 项目 Settings → Environment Variables → 添加：
 *      FEISHU_WEBHOOK_URL = https://open.feishu.cn/open-apis/bot/v2/hook/xxxx
 * 4. Redeploy（改完 env 后点 Vercel 里的 Redeploy）
 *
 * 如果飞书群开了「签名校验」，还需加：
 *      FEISHU_WEBHOOK_SECRET = 飞书机器人配置页的 secret
 * ─────────────────────────────────────────────────────────────
 *
 * Env vars:
 *   FEISHU_WEBHOOK_URL    — 飞书 / Lark 自定义机器人 Webhook 地址
 *   FEISHU_WEBHOOK_SECRET — （可选）签名密钥
 *   RESEND_API_KEY        — resend.com/api-keys (3k/mo free)
 *   CONTACT_NOTIFY_EMAIL  — Resend 收件人 (default: d541449473@gmail.com)
 *   CONTACT_FROM_EMAIL    — Resend 发件人 (default: onboarding@resend.dev)
 *   CONTACT_FORWARD_URL   — 备用 generic webhook
 */

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  stage?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const { name, email, company, stage, message } = data;

  // --- Validation ---------------------------------------------------
  if (!name || !email || !company || !stage) {
    return NextResponse.json(
      { ok: false, error: "missing_fields" },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 },
    );
  }
  const combined = `${name} ${email} ${company} ${message ?? ""}`;
  if (combined.length > 5000) {
    return NextResponse.json({ ok: false, error: "too_long" }, { status: 400 });
  }
  if (
    /<script/i.test(combined) ||
    (combined.match(/https?:\/\//g) ?? []).length > 4
  ) {
    return NextResponse.json(
      { ok: false, error: "spam_detected" },
      { status: 400 },
    );
  }

  // --- Delivery -----------------------------------------------------
  const deliveries: string[] = [];
  const failures: string[] = [];
  const receivedAt = new Date().toISOString();

  const subject = `[StartPoint] ${name} · ${company} (${stage})`;
  const plainBody = [
    `New inquiry from startpointagency.com/contact`,
    ``,
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Company:  ${company}`,
    `Stage:    ${stage}`,
    ``,
    `Message:`,
    message?.trim() || "(none)",
    ``,
    `---`,
    `Received: ${receivedAt}`,
  ].join("\n");

  // 1. Feishu / Lark ------------------------------------------------
  const feishuUrl = process.env.FEISHU_WEBHOOK_URL;
  if (feishuUrl) {
    try {
      // Interactive card — readable at a glance in the Feishu group.
      const card = {
        config: { wide_screen_mode: true },
        header: {
          title: { tag: "plain_text", content: "📋 StartPoint 新咨询" },
          template: "orange",
        },
        elements: [
          {
            tag: "div",
            fields: [
              {
                is_short: true,
                text: { tag: "lark_md", content: `**👤 姓名**\n${name}` },
              },
              {
                is_short: true,
                text: { tag: "lark_md", content: `**📧 邮箱**\n${email}` },
              },
            ],
          },
          {
            tag: "div",
            fields: [
              {
                is_short: true,
                text: {
                  tag: "lark_md",
                  content: `**🏢 公司 / 产品**\n${company}`,
                },
              },
              {
                is_short: true,
                text: { tag: "lark_md", content: `**🚀 产品阶段**\n${stage}` },
              },
            ],
          },
          ...(message?.trim()
            ? [
                {
                  tag: "div",
                  text: {
                    tag: "lark_md",
                    content: `**💬 留言**\n${message.trim()}`,
                  },
                },
              ]
            : []),
          { tag: "hr" },
          {
            tag: "div",
            text: { tag: "lark_md", content: `⏰ ${receivedAt}` },
          },
          {
            tag: "action",
            actions: [
              {
                tag: "button",
                text: { tag: "plain_text", content: "📧 回复邮件" },
                url: `mailto:${email}?subject=Re: StartPoint 咨询 — ${name}`,
                type: "primary",
              },
            ],
          },
        ],
      };

      // Optional HMAC-SHA256 signature if FEISHU_WEBHOOK_SECRET is configured.
      const feishuHeaders: Record<string, string> = {
        "Content-Type": "application/json",
      };
      const secret = process.env.FEISHU_WEBHOOK_SECRET;
      if (secret) {
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const strToSign = `${timestamp}\n${secret}`;
        const enc = new TextEncoder();
        const key = await crypto.subtle.importKey(
          "raw",
          enc.encode(secret),
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"],
        );
        const sig = await crypto.subtle.sign(
          "HMAC",
          key,
          enc.encode(strToSign),
        );
        feishuHeaders["X-Lark-Request-Timestamp"] = timestamp;
        feishuHeaders["X-Lark-Signature"] = Buffer.from(sig).toString("base64");
      }

      const r = await fetch(feishuUrl, {
        method: "POST",
        headers: feishuHeaders,
        body: JSON.stringify({ msg_type: "interactive", card }),
      });

      if (r.ok) {
        const json = (await r.json()) as { code?: number };
        if (json.code === 0) {
          deliveries.push("feishu");
        } else {
          console.error("[contact] feishu non-zero code", json);
          failures.push(`feishu:code=${json.code}`);
        }
      } else {
        const body = await r.text();
        console.error("[contact] feishu http error", r.status, body);
        failures.push(`feishu:${r.status}`);
      }
    } catch (err) {
      console.error("[contact] feishu threw", err);
      failures.push("feishu:throw");
    }
  }

  // 2. Resend -------------------------------------------------------
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const to = process.env.CONTACT_NOTIFY_EMAIL || "d541449473@gmail.com";
    const from =
      process.env.CONTACT_FROM_EMAIL || "StartPoint <onboarding@resend.dev>";
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject,
          text: plainBody,
        }),
      });
      if (r.ok) {
        deliveries.push("resend");
      } else {
        const body = await r.text();
        console.error("[contact] resend failed", r.status, body);
        failures.push(`resend:${r.status}`);
      }
    } catch (err) {
      console.error("[contact] resend threw", err);
      failures.push("resend:throw");
    }
  }

  // 3. Generic webhook ----------------------------------------------
  const forwardUrl = process.env.CONTACT_FORWARD_URL;
  if (forwardUrl) {
    try {
      const r = await fetch(forwardUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "startpointagency.com/contact",
          ...data,
          receivedAt,
        }),
      });
      if (r.ok) {
        deliveries.push("webhook");
      } else {
        console.error("[contact] webhook failed", r.status);
        failures.push(`webhook:${r.status}`);
      }
    } catch (err) {
      console.error("[contact] webhook threw", err);
      failures.push("webhook:throw");
    }
  }

  // 4. Always log ---------------------------------------------------
  console.log("[contact] new submission", {
    name,
    email,
    company,
    stage,
    message,
    deliveries,
    failures,
  });

  return NextResponse.json({ ok: true, deliveries });
}
