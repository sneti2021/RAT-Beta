import { NextResponse } from "next/server";
import { siteUrl } from "@/lib/sanity/env";

export function GET() {
  return new NextResponse(
    `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain" } },
  );
}
