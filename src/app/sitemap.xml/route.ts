import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity/client";
import { siteUrl } from "@/lib/sanity/env";
import { publishedPathsQuery } from "@/lib/sanity/queries";

export async function GET() {
  const paths = await sanityClient.fetch<Array<{ slug: string; _updatedAt: string }>>(
    publishedPathsQuery,
  );

  const urls = paths.map((path) => {
    const loc = path.slug === "home" ? siteUrl : `${siteUrl}/${path.slug}`;
    return `<url><loc>${loc}</loc><lastmod>${path._updatedAt}</lastmod></url>`;
  });

  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
