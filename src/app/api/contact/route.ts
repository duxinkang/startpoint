import { NextResponse } from "next/server";

/**
 * Contact form POST handler.
 *
 * Delivery priority (tries each in order, succeeds if ANY works):
 *   1. Resend transactional email (if RESEND_API_KEY set)
 *   2. Webhook (if CONTACT_FORWARD_URL set — Zapier / Make / custom)
 *   3. Console log (always — visible in Vercel function logs)
 *
 * Env vars expected on Vercel:
 *   RESEND_API_KEY       — get one free at resend.com/api-keys (3k/mo free tier)
 *   CONTACT_NOTIFY_EMAIL — where submissions land (default: contact@startpoint.ai)
 *   CONTACT_FROM_EMAIL   — sender (default: onboarding@resend.dev for testing;
 *                         after you verify startpointagency.com on Resend, switch
 *                         to contact@startpointagency.com for better deliverability)
 *   CONTACT_FORWARD_URL  — optional webhook as a secondary/backup sink
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
  // Lightweight spam defence: reject messages over 5k chars, reject if any
  // submitted field contains the sequence "http" more than 4 times (classic
  // spam bot pattern) or contains bare script tags.
  const combined = `${name} ${email} ${company} ${message ?? ""}`;
  if (combined.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "too_long" },
      { status: 400 },
    );
  }
  if (/<script/i.test(combined) || (combined.match(/https?:\/\//g) ?? []).length > 4) {
    return NextResponse.json(
      { ok: false, error: "spam_detected" },
      { status: 400 },
    );
  }

  // --- Delivery -----------------------------------------------------
  const deliveries: string[] = [];
  const failures: string[] = [];

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
    `Received: ${new Date().toISOString()}`,
  ].join("\n");

  // 1. Resend ---------------------------------------------------------
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const to = process.env.CONTACT_NOTIFY_EMAIL || "contact@startpoint.ai";
    const from =
      process.env.CONTACT_FROM_EMAIL ||
      // Resend's universal testing sender — works before your domain is verified.
      "StartPoint <onboarding@resend.dev>";

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

  // 2. Webhook --------------------------------------------------------
  const forwardUrl = process.env.CONTACT_FORWARD_URL;
  if (forwardUrl) {
    try {
      const r = await fetch(forwardUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "startpointagency.com/contact",
          ...data,
          receivedAt: new Date().toISOString(),
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

  // 3. Always log — visible in Vercel > Logs even if Resend/webhook are down.
  console.log("[contact] new submission", {
    name,
    email,
    company,
    stage,
    message,
    deliveries,
    failures,
  });

  // Consider it successful as long as validation passed. Even without any
  // delivery env set, the submission is persisted in logs — the user still
  // sees success and the founder can recover from the log history.
  return NextResponse.json({ ok: true, deliveries });
}
