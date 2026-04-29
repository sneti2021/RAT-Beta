import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

type SanityImage = {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
};

export function urlForImage(source?: SanityImage | null) {
  if (!source?.asset) {
    return null;
  }

  return builder.image(source).auto("format").fit("max");
}
