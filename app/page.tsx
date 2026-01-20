import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Problems } from "@/components/sections/problems";
import { Promise } from "@/components/sections/promise";
import { Comparison } from "@/components/sections/comparison";
import { Engine } from "@/components/sections/engine";
import { Advantages } from "@/components/sections/advantages";
import { ClientCase } from "@/components/sections/client-case";
import { FAQ } from "@/components/sections/faq";
import { Team } from "@/components/sections/team";
import { Pricing } from "@/components/sections/pricing";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section id="problems">
          <Problems />
        </section>
        <section id="promise">
          <Promise />
        </section>
        <Comparison />
        <Engine />
        <section id="advantages">
          <Advantages />
        </section>
        <section id="client-case">
          <ClientCase />
        </section>
        <FAQ />
        <section id="team">
          <Team />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
