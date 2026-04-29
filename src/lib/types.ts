import type { PortableTextBlock } from "next-sanity";

export type Cta = {
  label?: string;
  href?: string;
  style?: "primary" | "secondary";
  utmCampaign?: string;
  utmContent?: string;
};

export type SanityImage = {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
  alt?: string;
};

export type FormConfig = {
  provider?: "native" | "hubspot";
  title?: string;
  description?: string;
  hubspotPortalId?: string;
  hubspotFormId?: string;
  region?: string;
  thankYouPath?: string;
  campaignName?: string;
  fields?: Array<{
    _key: string;
    label?: string;
    name?: string;
    type?: "text" | "email" | "tel" | "textarea";
    required?: boolean;
  }>;
};

export type DownloadConfig = {
  title?: string;
  description?: string;
  type?: string;
  gated?: boolean;
  thumbnail?: SanityImage;
  hubspotForm?: FormConfig;
  file?: {
    asset?: {
      url?: string;
      originalFilename?: string;
    };
  };
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
    question?: string;
    answer?: string;
    quote?: string;
    person?: string;
    role?: string;
    company?: string;
    image?: SanityImage;
    href?: string;
  }>;
  form?: FormConfig;
  formRef?: FormConfig;
  resource?: DownloadConfig;
  download?: DownloadConfig;
};

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
  excludeFromSitemap?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImage;
  ogUrl?: string;
  schemaPreset?: string;
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
  announcement?: {
    enabled?: boolean;
    message?: string;
    link?: Cta;
  };
};
