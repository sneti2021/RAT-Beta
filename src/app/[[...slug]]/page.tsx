import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/SectionRenderer";
import { sanityClient } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import {
  pageBySlugQuery,
  postBySlugQuery,
  publishedPathsQuery,
} from "@/lib/sanity/queries";
import type { Page, Seo } from "@/lib/types";

export const revalidate = 60;

function normalizeSlug(slug?: string[]) {
  return slug?.length ? slug.join("/") : "home";
}

async function getContent(slug: string) {
  const page = await sanityClient.fetch<Page | null>(
    pageBySlugQuery,
    { slug },
    { next: { revalidate } },
  );

  if (page) {
    return page;
  }

  return sanityClient.fetch<Page | null>(
    postBySlugQuery,
    { slug },
    { next: { revalidate } },
  );
}

function metadataFromSeo(seo?: Seo, fallbackTitle?: string): Metadata {
  const title = seo?.metaTitle || fallbackTitle || "Rolling Arrays Technologies";
  const description =
    seo?.metaDescription ||
    "AI-powered HR tech solutions and SAP SuccessFactors add-ons.";
  const ogImage = urlForImage(seo?.ogImage)?.width(1200).height(630).url();

  return {
    title,
    description,
    keywords: seo?.keywords,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: seo?.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      url: seo?.ogUrl,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent(normalizeSlug(slug));
  return metadataFromSeo(content?.seo, content?.title);
}

export async function generateStaticParams() {
  try {
    const paths = await sanityClient.fetch<Array<{ slug: string }>>(
      publishedPathsQuery,
    );

    return paths
      .filter((path) => path.slug !== "home")
      .map((path) => ({ slug: path.slug.split("/") }));
  } catch {
    return [];
  }
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const content = await getContent(normalizeSlug(slug));

  if (!content) {
    notFound();
  }

  return (
    <>
      {content.seo?.schemaJson ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: content.seo.schemaJson }}
        />
      ) : null}
      <SectionRenderer sections={content.sections} />
    </>
  );
}
