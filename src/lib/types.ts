import type { PortableTextBlock } from "next-sanity";

export type Cta = {
  label?: string;
  href?: string;
  style?: "primary" | "secondary";
};

export type SanityImage = {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
  alt?: string;
};

export type Section = {
  _key: string;
  _type: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  body?: PortableTextBlock[];
  ctas?: Cta[];
  image?: SanityImage;
  videoUrl?: string;
  alignment?: "left" | "center";
  items?: Array<{
    _key: string;
    title?: string;
    text?: string;
    value?: string;
    image?: SanityImage;
    href?: string;
  }>;
  form?: {
    provider?: "native" | "hubspot";
    title?: string;
    description?: string;
    hubspotPortalId?: string;
    hubspotFormId?: string;
    fields?: Array<{
      _key: string;
      label?: string;
      name?: string;
      type?: "text" | "email" | "tel" | "textarea";
      required?: boolean;
    }>;
  };
  download?: {
    title?: string;
    description?: string;
    file?: {
      asset?: {
        url?: string;
        originalFilename?: string;
      };
    };
  };
};

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImage;
  ogUrl?: string;
  schemaJson?: string;
};

export type Page = {
  _id: string;
  title: string;
  slug?: string;
  pageType?: string;
  seo?: Seo;
  sections?: Section[];
};

export type SiteSettings = {
  title?: string;
  navigation?: Array<{ _key: string; label?: string; href?: string }>;
  footerLinks?: Array<{ _key: string; label?: string; href?: string }>;
  gtmId?: string;
};
