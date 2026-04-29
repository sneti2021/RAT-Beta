import { groq } from "next-sanity";

const imageFields = groq`
  asset->{
    _id,
    url,
    metadata { dimensions }
  },
  alt
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug && status == "published"][0]{
    _id,
    title,
    "slug": slug.current,
    pageType,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogUrl,
      schemaJson,
      ogImage { ${imageFields} }
    },
    sections[]{
      ...,
      image { ${imageFields} },
      items[]{
        ...,
        image { ${imageFields} }
      },
      download {
        title,
        description,
        file {
          asset->{
            url,
            originalFilename
          }
        }
      }
    }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && status == "published"][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogUrl,
      schemaJson,
      ogImage { ${imageFields} }
    },
    "sections": [
      {
        "_type": "heroSection",
        "_key": _id + "-hero",
        "eyebrow": category,
        "title": title,
        "subtitle": excerpt,
        "image": mainImage { ${imageFields} }
      },
      {
        "_type": "richTextSection",
        "_key": _id + "-body",
        "body": body
      },
      {
        "_type": "downloadSection",
        "_key": _id + "-download",
        "title": whitepaper.title,
        "subtitle": whitepaper.description,
        "download": whitepaper
      }
    ]
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    gtmId,
    navigation[]{ _key, label, href },
    footerLinks[]{ _key, label, href }
  }
`;

export const publishedPathsQuery = groq`
  *[_type in ["page", "post"] && defined(slug.current) && status == "published"]{
    "slug": slug.current,
    _updatedAt
  }
`;

export const redirectsQuery = groq`
  *[_type == "redirect" && enabled == true]{
    source,
    destination,
    permanent
  }
`;
