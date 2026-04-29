import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

const defaultNav = [
  { _key: "home", label: "Home", href: "/" },
  { _key: "reimburse", label: "Reimburse", href: "/solutions/reimburse" },
  { _key: "epfile", label: "ePFile", href: "/solutions/epfile" },
  { _key: "careers", label: "Careers", href: "/career" },
  { _key: "contact", label: "Contact", href: "/contact-us" },
];

export function Header({ settings }: { settings?: SiteSettings | null }) {
  const nav = settings?.navigation?.length ? settings.navigation : defaultNav;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(247,244,239,0.92)] backdrop-blur">
      <div className="container flex h-20 items-center justify-between gap-8">
        <Link href="/" className="text-lg font-black tracking-tight">
          {settings?.title || "Rolling Arrays Technologies"}
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-[var(--muted)] md:flex">
          {nav.map((item) => (
            <Link key={item._key} href={item.href || "/"}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn-primary hidden md:inline-flex" href="/contact-us">
          Schedule a Demo
        </Link>
      </div>
    </header>
  );
}
