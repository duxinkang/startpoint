"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { Card } from "@/components/ui/Card";

/**
 * P15 — 团队 (Team)
 * 3 founder/partner cards with real photos.
 * Drop JPG/PNG under /public/team/<firstname>.jpg — falls back to gradient+initial if missing.
 */
export function Team() {
  const t = useTranslations("team");
  const members = t.raw("members") as {
    name: string;
    role: string;
    title: string;
    text: string;
  }[];

  return (
    <Section bg="paper">
      <Container size="full">
        <div className="max-w-3xl mb-14">
          <Pill variant="orange" size="md" className="mb-5">
            TEAM
          </Pill>
          <h2 className="sp-display text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg text-ink/70 leading-relaxed">
            {t("subtitle")}
          </p>
          <p className="mt-3 text-ink/60 leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card variant="feature" className="group overflow-hidden flex flex-col h-full">
                <MemberPhoto name={m.name} role={m.role} />

                {/* Info */}
                <div className="p-6 md:p-7 flex-1">
                  <h3 className="sp-display text-2xl text-ink">{m.name}</h3>
                  <div className="mt-1 text-sm font-semibold text-orange-600">
                    {m.title}
                  </div>
                  <p className="mt-4 text-ink/70 leading-relaxed text-[15px]">
                    {m.text}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function MemberPhoto({ name, role }: { name: string; role: string }) {
  const src = `/team/${name.toLowerCase().replace(/\s+/g, "-")}.jpg`;
  const [failed, setFailed] = useState(false);
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="relative aspect-[4/5] bg-gradient-to-br from-orange-300 via-orange-400 to-amber-500 overflow-hidden">
      {!failed && (
        // Explicit width/height (instead of `fill`) so Next.js emits concrete
        // width/height attributes on the <img> — helps CLS and satisfies the
        // SEO audit that flagged missing intrinsic dimensions on /about.
        <Image
          src={src}
          alt={`${name} — ${role}, StartPoint`}
          width={400}
          height={500}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-[1.03]"
          onError={() => setFailed(true)}
        />
      )}

      {failed && (
        <>
          {/* Decorative dot matrix for texture when no photo */}
          <div className="sp-dot-matrix absolute inset-0 opacity-25" />
          <div className="sp-ball absolute -right-10 -bottom-10 w-48 h-48 opacity-50 mix-blend-overlay" />
          {/* Big initial */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="sp-display text-[180px] leading-none text-white/90 drop-shadow-xl">
              {initial}
            </span>
          </div>
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-5">
        <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {role}
        </span>
      </div>
    </div>
  );
}
