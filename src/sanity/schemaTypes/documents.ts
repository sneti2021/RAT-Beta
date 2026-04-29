import { defineArrayMember, defineField, defineType } from "sanity";
import type { SlugIsUniqueValidator, SlugRule } from "@sanity/types";

const isUniqueAcrossPagesAndPosts: SlugIsUniqueValidator = async (
  slug,
  context,
) => {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: "2026-04-29" });
  const id = document?._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };
  const query = `!defined(*[
    _type in ["page", "post"] &&
    slug.current == $slug &&
    !(_id in [$draft, $published])
  ][0]._id)`;

  return client.fetch(query, params);
};

const slugValidation = (Rule: SlugRule) =>
  Rule.required().custom((slug: { current?: string } | undefined) => {
    if (!slug?.current) {
      return "Slug is required";
    }
    return slug.current.startsWith("/")
      ? "Do not start slugs with a slash"
      : true;
  });

export const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", isUnique: isUniqueAcrossPagesAndPosts },
      validation: slugValidation,
      description: "Use home for the homepage.",
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
      },
      initialValue: "draft",
    }),
    defineField({
      name: "pageType",
      type: "string",
      options: {
        list: ["standard", "product", "career", "contact"],
      },
      initialValue: "standard",
    }),
    defineField({ name: "seo", type: "seo" }),
    defineField({
      name: "sections",
      type: "array",
      of: [
        defineArrayMember({ type: "heroSection" }),
        defineArrayMember({ type: "statsSection" }),
        defineArrayMember({ type: "featureTabsSection" }),
        defineArrayMember({ type: "cardGridSection" }),
        defineArrayMember({ type: "mediaSection" }),
        defineArrayMember({ type: "carouselSection" }),
        defineArrayMember({ type: "logoCloudSection" }),
        defineArrayMember({ type: "richTextSection" }),
        defineArrayMember({ type: "downloadSection" }),
        defineArrayMember({ type: "formSection" }),
        defineArrayMember({ type: "ctaSection" }),
        defineArrayMember({ type: "faqSection" }),
        defineArrayMember({ type: "testimonialSection" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});

export const post = defineType({
  name: "post",
  title: "Blog posts",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", isUnique: isUniqueAcrossPagesAndPosts },
      validation: slugValidation,
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
      },
      initialValue: "draft",
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categoryRef",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
    }),
    defineField({ name: "category", type: "string", initialValue: "Blog" }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({
      name: "mainImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "whitepaper",
      title: "Whitepaper download",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({ name: "file", type: "file" }),
      ],
    }),
    defineField({
      name: "relatedPosts",
      title: "Related content",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }, { type: "resource" }] })],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const author = defineType({
  name: "author",
  title: "Authors",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({ name: "bio", type: "text", rows: 3 }),
  ],
});

export const category = defineType({
  name: "category",
  title: "Categories",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: slugValidation,
    }),
  ],
});

export const tag = defineType({
  name: "tag",
  title: "Tags",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: slugValidation,
    }),
  ],
});

export const resource = defineType({
  name: "resource",
  title: "Resource library",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: ["Whitepaper", "Brochure", "Case study", "Checklist", "Report"],
      },
      initialValue: "Whitepaper",
    }),
    defineField({ name: "file", type: "file", validation: (Rule) => Rule.required() }),
    defineField({
      name: "thumbnail",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({ name: "gated", type: "boolean", initialValue: false }),
    defineField({
      name: "hubspotForm",
      type: "reference",
      to: [{ type: "hubspotForm" }],
      hidden: ({ parent }) => !parent?.gated,
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const reusableCta = defineType({
  name: "reusableCta",
  title: "Reusable CTAs",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "href", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "style",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
        ],
      },
      initialValue: "primary",
    }),
    defineField({ name: "utmCampaign", title: "UTM campaign", type: "string" }),
    defineField({ name: "utmContent", title: "UTM content", type: "string" }),
  ],
  preview: {
    select: { title: "title", subtitle: "href" },
  },
});

export const hubspotForm = defineType({
  name: "hubspotForm",
  title: "HubSpot forms",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "portalId", title: "Portal ID", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "formId", title: "Form ID", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "region", type: "string", initialValue: "na1" }),
    defineField({ name: "thankYouPath", title: "Thank-you page path", type: "string" }),
    defineField({ name: "campaignName", title: "Campaign name", type: "string" }),
  ],
  preview: {
    select: { title: "title", subtitle: "formId" },
  },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", initialValue: "Rolling Arrays Technologies" }),
    defineField({
      name: "gtmId",
      title: "Google Tag Manager ID",
      type: "string",
      description: "Example: GTM-XXXXXXX",
    }),
    defineField({
      name: "announcement",
      title: "Announcement bar",
      type: "object",
      fields: [
        defineField({ name: "enabled", type: "boolean", initialValue: false }),
        defineField({ name: "message", type: "string" }),
        defineField({ name: "link", type: "link" }),
      ],
    }),
    defineField({
      name: "navigation",
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "footerLinks",
      type: "array",
      of: [{ type: "link" }],
    }),
  ],
});

export const redirect = defineType({
  name: "redirect",
  title: "301 redirects",
  type: "document",
  fields: [
    defineField({ name: "source", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "destination", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "permanent", type: "boolean", initialValue: true }),
    defineField({ name: "enabled", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "source", subtitle: "destination" },
  },
});
