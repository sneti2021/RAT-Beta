import { groq } from "next-sanity";

const imageFields = groq`
  asset->{
    _id,
    url,
    metadata { dimensions }
  },
  alt
`;

const ctaFields = groq`
  _type == "reference" => @->{
    label,
    href,
    style,
    utmCampaign,
    utmContent
  },
  _type != "reference" => {
    label,
    href,
    style
  }
`;

const formFields = groq`
  form,
  formRef->{
    "provider": "hubspot",
    "title": title,
    "hubspotPortalId": portalId,
    "hubspotFormId": formId,
    region,
    thankYouPath,
    campaignName
  }
`;

const resourceFields = groq`
  resource->{
    title,
    description,
    type,
    gated,
    file {
      asset->{
        url,
        originalFilename
      }
    },
    thumbnail { ${imageFields} },
    hubspotForm->{
      "provider": "hubspot",
      "title": title,
      "hubspotPortalId": portalId,
      "hubspotFormId": formId
    }
  }
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
      noIndex,
      excludeFromSitemap,
      ogTitle,
      ogDescription,
      ogUrl,
      schemaJson,
      schemaPreset,
      ogImage { ${imageFields} }
    },
    sections[]{
      ...,
      image { ${imageFields} },
      items[]{
        ...,
        image { ${imageFields} }
      },
      ctas[]{
        ${ctaFields}
      },
      ${formFields},
      ${resourceFields},
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
      noIndex,
      excludeFromSitemap,
      ogTitle,
      ogDescription,
      ogUrl,
      schemaJson,
      schemaPreset,
      ogImage { ${imageFields} }
    },
    author->{name, role, bio, photo { ${imageFields} }},
    categoryRef->{title, "slug": slug.current},
    tags[]->{title, "slug": slug.current},
    relatedPosts[]->{
      _type,
      title,
      "slug": slug.current,
      description,
      excerpt,
      type
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
    announcement {
      enabled,
      message,
      link { label, href, style }
    },
    navigation[]{ _key, label, href },
    footerLinks[]{ _key, label, href }
  }
`;

export const publishedPathsQuery = groq`
  *[_type in ["page", "post"] && defined(slug.current) && status == "published" && seo.excludeFromSitemap != true]{
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
