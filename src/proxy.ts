import { NextResponse, type NextRequest } from "next/server";
import { sanityProjectId, sanityDataset, sanityApiVersion } from "@/lib/sanity/env";

type RedirectRule = {
  source: string;
  destination: string;
  permanent?: boolean;
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const query = encodeURIComponent(
    '*[_type == "redirect" && enabled == true && source == $source][0]{source,destination,permanent}',
  );
  const url = `https://${sanityProjectId}.api.sanity.io/v${sanityApiVersion}/data/query/${sanityDataset}?query=${query}&%24source=${encodeURIComponent(JSON.stringify(pathname))}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });
    const data = (await response.json()) as { result?: RedirectRule };

    if (data.result?.destination) {
      return NextResponse.redirect(
        new URL(data.result.destination, request.url),
        data.result.permanent === false ? 302 : 301,
      );
    }
  } catch {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
