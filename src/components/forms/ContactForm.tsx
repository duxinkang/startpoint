"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const stageOptions = t.raw("stageOptions") as string[];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const fd = new FormData(e.currentTarget);
    // Honeypot: real humans never fill this hidden field. If it has any value
    // we silently "succeed" to avoid tipping off bots, but skip the API call.
    if ((fd.get("website") as string | null)?.trim()) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      return;
    }
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company"),
      stage: fd.get("stage"),
      message: fd.get("message"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder-ink/40 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition";
  const labelCls = "block text-sm font-semibold text-ink/80 mb-2";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={onSubmit}
      className="space-y-5 rounded-3xl bg-white border border-ink/8 p-6 md:p-10 shadow-sm"
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className={labelCls}>
            {t("name")} *
          </label>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            className={inputCls}
            placeholder={t("name")}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelCls}>
            Email *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className={labelCls}>
          {t("company")} *
        </label>
        <input
          id="contact-company"
          name="company"
          required
          autoComplete="organization"
          className={inputCls}
          placeholder={t("company")}
        />
      </div>

      <div>
        <label htmlFor="contact-stage" className={labelCls}>
          {t("stage")} *
        </label>
        <select
          id="contact-stage"
          name="stage"
          required
          className={inputCls}
          defaultValue=""
        >
          <option value="" disabled>
            {t("stage")}
          </option>
          {stageOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelCls}>
          {t("message")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className={inputCls}
          placeholder={t("message")}
        />
      </div>

      {/* Honeypot — hidden from humans, tempting to bots. Intentionally given
          a plausible field name ("website") and standard autocomplete hints
          off so password managers won't populate it. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="contact-website">
          Website (leave empty)
        </label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold tracking-wide transition-all text-base px-8 py-3.5 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
        >
          {status === "submitting" ? t("submitting") : t("submit")}
          <span className="ml-2">→</span>
        </button>
      </div>

      {status === "success" && (
        <div
          role="status"
          className="rounded-xl bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm"
        >
          ✓ {t("success")}
        </div>
      )}
      {status === "error" && (
        <div
          role="alert"
          className="rounded-xl bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm"
        >
          ✕ {t("error")}
        </div>
      )}
    </motion.form>
  );
}
