import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./brand/Logo";
import { Container } from "./ui/Container";

export function Footer() {
  const t = useTranslations();

  const links = [
    { href: "/services", label: t("nav.services") },
    { href: "/cases", label: t("nav.cases") },
    { href: "/about", label: t("nav.about") },
    { href: "/pricing", label: t("nav.pricing") },
    { href: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <footer className="bg-ink text-white/75 py-16">
      <Container>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div className="max-w-sm space-y-4">
            <Logo variant="light" size="md" />
            <p className="text-sm text-white/55 leading-relaxed">
              {t("site.description")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-white/40">
                {t("footer.menu")}
              </div>
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-sm hover:text-orange-300 transition"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-white/40">
                {t("footer.contact")}
              </div>
              <a
                href="mailto:d541449473@gmail.com"
                className="block text-sm hover:text-orange-300 transition"
              >
                d541449473@gmail.com
              </a>
              <div className="text-sm text-white/55">
                {t("contact.locations")}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-white/40 flex flex-col sm:flex-row justify-between gap-2">
          <span>{t("footer.rights")}</span>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-white/75"
            >
              {t("footer.privacy")}
            </Link>
            {/* Self-referential link dropped — site linking to its own root
                footer offered zero internal-link value and inflated the
                canonical signal. Kept as plain text. */}
            <span>www.startpointagency.com</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
