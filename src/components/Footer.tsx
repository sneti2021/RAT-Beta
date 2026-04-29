import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const links = settings?.footerLinks?.length
    ? settings.footerLinks
    : [
        { _key: "privacy", label: "Privacy", href: "/privacy" },
        { _key: "contact", label: "Contact", href: "/contact-us" },
      ];

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] py-12 text-white">
      <div className="container grid gap-8 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-xl font-black">
            {settings?.title || "Rolling Arrays Technologies"}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/68">
            AI-powered HR tech solutions and SAP SuccessFactors add-ons built
            for speed, adoption, and better employee experiences.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-white/72 md:justify-end">
          {links.map((link) => (
            <Link key={link._key} href={link.href || "/"}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
