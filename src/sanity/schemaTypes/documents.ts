import { defineArrayMember, defineField, defineType } from "sanity";
import type { SlugRule } from "@sanity/types";

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
      options: { source: "title" },
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
      options: { source: "title" },
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
    defineField({ name: "seo", type: "seo" }),
  ],
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
