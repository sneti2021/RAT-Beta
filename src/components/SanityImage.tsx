import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import type { SanityImage as SanityImageType } from "@/lib/types";

export function SanityImage({
  image,
  className,
  priority,
}: {
  image?: SanityImageType;
  className?: string;
  priority?: boolean;
}) {
  const url = urlForImage(image)?.width(1400).height(920).url();

  if (!url) {
    return (
      <div
        className={`flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-[var(--line)] bg-white text-sm text-[var(--muted)] ${className || ""}`}
      >
        CMS image
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={image?.alt || ""}
      width={1400}
      height={920}
      priority={priority}
      className={className}
    />
  );
}
