import Link from "next/link";
import { Download } from "lucide-react";
import type { Section } from "@/lib/types";
import { HubSpotForm } from "./HubSpotForm";
import { NativeForm } from "./NativeForm";
import { PortableBody } from "./PortableBody";
import { SanityImage } from "./SanityImage";

function Buttons({ ctas }: { ctas?: Section["ctas"] }) {
  if (!ctas?.length) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {ctas.map((cta) => (
        <Link
          key={`${cta.label}-${cta.href}`}
          className={`btn ${cta.style === "secondary" ? "btn-secondary" : "btn-primary"}`}
          href={cta.href || "#"}
        >
          {cta.label}
        </Link>
      ))}
    </div>
  );
}

function SectionIntro({ section }: { section: Section }) {
  if (!section.eyebrow && !section.title && !section.subtitle) {
    return null;
  }

  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
      {section.title ? (
        <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
          {section.title}
        </h2>
      ) : null}
      {section.subtitle ? (
        <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
          {section.subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Hero({ section }: { section: Section }) {
  return (
    <section className="border-b border-[var(--line)] bg-[var(--surface)] py-16 md:py-24">
      <div className="container grid items-center gap-12 md:grid-cols-[1.04fr_0.96fr]">
        <div>
          {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
          <h1 className="mt-4 text-5xl font-black leading-[0.98] md:text-7xl">
            {section.title}
          </h1>
          {section.subtitle ? (
            <p className="mt-6 max-w-2xl text-xl leading-8 text-[var(--muted)]">
              {section.subtitle}
            </p>
          ) : null}
          <PortableBody value={section.body} />
          <Buttons ctas={section.ctas} />
        </div>
        <SanityImage
          image={section.image}
          priority
          className="aspect-[4/3] rounded-lg object-cover shadow-xl"
        />
      </div>
    </section>
  );
}

function Cards({ section }: { section: Section }) {
  return (
    <section className="section">
      <div className="container">
        <SectionIntro section={section} />
        <div className="grid gap-5 md:grid-cols-3">
          {section.items?.map((item) => (
            <article key={item._key} className="rounded-lg bg-white p-6 shadow-sm">
              {item.image ? (
                <SanityImage image={item.image} className="mb-5 aspect-[16/10] rounded-md object-cover" />
              ) : null}
              {item.value ? (
                <p className="text-4xl font-black text-[var(--accent)]">{item.value}</p>
              ) : null}
              <h3 className="mt-3 text-xl font-black">{item.title}</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats({ section }: { section: Section }) {
  return (
    <section className="section bg-[var(--ink)] text-white">
      <div className="container">
        <SectionIntro section={section} />
        <div className="grid gap-4 md:grid-cols-3">
          {section.items?.map((item) => (
            <div key={item._key} className="border-t border-white/20 pt-6">
              <p className="text-5xl font-black text-white">{item.value}</p>
              <p className="mt-3 max-w-xs text-white/70">{item.text || item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Media({ section }: { section: Section }) {
  return (
    <section className="section bg-white">
      <div className="container grid items-center gap-10 md:grid-cols-2">
        <SanityImage image={section.image} className="aspect-[4/3] rounded-lg object-cover" />
        <div>
          {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
          {section.title ? <h2 className="mt-3 text-4xl font-black">{section.title}</h2> : null}
          {section.subtitle ? (
            <p className="mt-4 text-lg leading-8 text-[var(--muted)]">{section.subtitle}</p>
          ) : null}
          <PortableBody value={section.body} />
          <Buttons ctas={section.ctas} />
        </div>
      </div>
    </section>
  );
}

function RichText({ section }: { section: Section }) {
  return (
    <section className="section">
      <div className={`container ${section.alignment === "center" ? "text-center" : ""}`}>
        <div className="mx-auto max-w-3xl">
          <SectionIntro section={section} />
          <PortableBody value={section.body} />
        </div>
      </div>
    </section>
  );
}

function LogoCloud({ section }: { section: Section }) {
  return (
    <section className="section bg-white">
      <div className="container">
        <SectionIntro section={section} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {section.items?.map((item) => (
            <div key={item._key} className="flex min-h-24 items-center justify-center rounded-lg border border-[var(--line)] p-5">
              {item.image ? (
                <SanityImage image={item.image} className="max-h-12 w-auto object-contain" />
              ) : (
                <span className="font-bold text-[var(--muted)]">{item.title}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadSection({ section }: { section: Section }) {
  const fileUrl = section.download?.file?.asset?.url;

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="rounded-lg border border-[var(--line)] p-8 md:flex md:items-center md:justify-between">
          <div>
            <p className="eyebrow">{section.eyebrow || "Download"}</p>
            <h2 className="mt-3 text-3xl font-black">
              {section.title || section.download?.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">
              {section.subtitle || section.download?.description}
            </p>
          </div>
          <a className="btn btn-primary mt-6 gap-2 md:mt-0" href={fileUrl || "#"}>
            <Download size={18} />
            Download
          </a>
        </div>
      </div>
    </section>
  );
}

function FormSection({ section }: { section: Section }) {
  return (
    <section className="section">
      <div className="container grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
          {section.title ? <h2 className="mt-3 text-4xl font-black">{section.title}</h2> : null}
          {section.subtitle ? <p className="mt-4 text-lg leading-8 text-[var(--muted)]">{section.subtitle}</p> : null}
        </div>
        {section.form?.provider === "hubspot" ? (
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <HubSpotForm
              portalId={section.form.hubspotPortalId}
              formId={section.form.hubspotFormId}
            />
          </div>
        ) : (
          <NativeForm form={section.form} />
        )}
      </div>
    </section>
  );
}

function CTA({ section }: { section: Section }) {
  return (
    <section className="section bg-[var(--accent)] text-white">
      <div className="container max-w-4xl text-center">
        {section.eyebrow ? <p className="text-sm font-bold uppercase">{section.eyebrow}</p> : null}
        <h2 className="mt-3 text-4xl font-black md:text-5xl">{section.title}</h2>
        {section.subtitle ? <p className="mt-4 text-lg text-white/78">{section.subtitle}</p> : null}
        <Buttons ctas={section.ctas} />
      </div>
    </section>
  );
}

export function SectionRenderer({ sections }: { sections?: Section[] }) {
  return (
    <>
      {sections?.map((section) => {
        switch (section._type) {
          case "heroSection":
            return <Hero key={section._key} section={section} />;
          case "statsSection":
            return <Stats key={section._key} section={section} />;
          case "cardGridSection":
          case "featureTabsSection":
          case "carouselSection":
            return <Cards key={section._key} section={section} />;
          case "mediaSection":
            return <Media key={section._key} section={section} />;
          case "richTextSection":
            return <RichText key={section._key} section={section} />;
          case "logoCloudSection":
            return <LogoCloud key={section._key} section={section} />;
          case "downloadSection":
            return <DownloadSection key={section._key} section={section} />;
          case "formSection":
            return <FormSection key={section._key} section={section} />;
          case "ctaSection":
            return <CTA key={section._key} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
