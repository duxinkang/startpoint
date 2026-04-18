"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";

export function SeoGeoDetail() {
  const t = useTranslations("serviceDetails.seo-geo");
  const steps = t.raw("steps") as { title: string; text: string }[];

  return (
    <Section bg="paper" className="!pt-4">
      <Container size="full">
        <h2 className="sr-only">SEO + GEO pillars</h2>
        <div className="flex flex-wrap gap-3 mb-12">
          <Pill variant="orange" size="md">
            SEO (Google)
          </Pill>
          <Pill variant="ink" size="md">
            GEO (ChatGPT / Perplexity / Gemini / Claude)
          </Pill>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl bg-white border border-ink/10 p-8 shadow-sm"
            >
              <div className="text-orange-500 font-bold text-lg mb-3">
                0{i + 1}
              </div>
              <h3 className="sp-display text-2xl text-ink">{step.title}</h3>
              <p className="mt-4 text-ink/75 leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
