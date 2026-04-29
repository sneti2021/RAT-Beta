import { defineArrayMember, defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "metaTitle", title: "Meta title", type: "string" }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "canonicalUrl", title: "Canonical URL", type: "url" }),
    defineField({ name: "ogTitle", title: "Open Graph title", type: "string" }),
    defineField({
      name: "ogDescription",
      title: "Open Graph description",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "ogUrl", title: "Open Graph URL", type: "url" }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "schemaJson",
      title: "Schema JSON-LD",
      type: "text",
      rows: 8,
      description: "Paste valid JSON-LD. It will be rendered in the page head.",
    }),
  ],
});

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
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
  ],
});

const richText = defineField({
  name: "body",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            fields: [defineField({ name: "href", type: "string" })],
          }),
        ],
      },
    }),
  ],
});

const imageField = defineField({
  name: "image",
  type: "image",
  options: { hotspot: true },
  fields: [defineField({ name: "alt", type: "string" })],
});

const sectionItem = defineArrayMember({
  name: "sectionItem",
  title: "Section item",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "value", type: "string" }),
    defineField({ name: "text", type: "text", rows: 3 }),
    defineField({ name: "href", type: "string" }),
    imageField,
  ],
  preview: {
    select: { title: "title", subtitle: "text" },
  },
});

const baseSectionFields = [
  defineField({ name: "eyebrow", type: "string" }),
  defineField({ name: "title", type: "string" }),
  defineField({ name: "subtitle", type: "text", rows: 3 }),
] as const;

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    ...baseSectionFields,
    richText,
    imageField,
    defineField({ name: "videoUrl", title: "Video URL", type: "url" }),
    defineField({ name: "ctas", title: "Buttons", type: "array", of: [{ type: "link" }] }),
  ],
  preview: { select: { title: "title", subtitle: "eyebrow" } },
});

export const richTextSection = defineType({
  name: "richTextSection",
  title: "Rich text",
  type: "object",
  fields: [
    ...baseSectionFields,
    richText,
    defineField({
      name: "alignment",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
        ],
      },
      initialValue: "left",
    }),
  ],
});

export const statsSection = defineType({
  name: "statsSection",
  title: "Stats",
  type: "object",
  fields: [
    ...baseSectionFields,
    defineField({ name: "items", type: "array", of: [sectionItem] }),
  ],
});

export const cardGridSection = defineType({
  name: "cardGridSection",
  title: "Card grid",
  type: "object",
  fields: [
    ...baseSectionFields,
    defineField({ name: "items", type: "array", of: [sectionItem] }),
  ],
});

export const mediaSection = defineType({
  name: "mediaSection",
  title: "Media",
  type: "object",
  fields: [
    ...baseSectionFields,
    richText,
    imageField,
    defineField({ name: "videoUrl", title: "Video URL", type: "url" }),
    defineField({ name: "ctas", title: "Buttons", type: "array", of: [{ type: "link" }] }),
  ],
});

export const carouselSection = defineType({
  name: "carouselSection",
  title: "Carousel",
  type: "object",
  fields: [
    ...baseSectionFields,
    defineField({ name: "items", type: "array", of: [sectionItem] }),
  ],
});

export const logoCloudSection = defineType({
  name: "logoCloudSection",
  title: "Logo cloud",
  type: "object",
  fields: [
    ...baseSectionFields,
    defineField({ name: "items", type: "array", of: [sectionItem] }),
  ],
});

export const featureTabsSection = defineType({
  name: "featureTabsSection",
  title: "Feature tabs",
  type: "object",
  fields: [
    ...baseSectionFields,
    defineField({ name: "items", type: "array", of: [sectionItem] }),
  ],
});

export const ctaSection = defineType({
  name: "ctaSection",
  title: "CTA",
  type: "object",
  fields: [
    ...baseSectionFields,
    defineField({ name: "ctas", title: "Buttons", type: "array", of: [{ type: "link" }] }),
  ],
});

export const formSection = defineType({
  name: "formSection",
  title: "Form",
  type: "object",
  fields: [
    ...baseSectionFields,
    defineField({
      name: "form",
      type: "object",
      fields: [
        defineField({
          name: "provider",
          type: "string",
          options: {
            list: [
              { title: "Native beta form", value: "native" },
              { title: "HubSpot embed", value: "hubspot" },
            ],
          },
          initialValue: "native",
        }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({ name: "hubspotPortalId", title: "HubSpot portal ID", type: "string" }),
        defineField({ name: "hubspotFormId", title: "HubSpot form ID", type: "string" }),
        defineField({
          name: "fields",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "label", type: "string" }),
                defineField({ name: "name", type: "string" }),
                defineField({
                  name: "type",
                  type: "string",
                  options: {
                    list: ["text", "email", "tel", "textarea"],
                  },
                  initialValue: "text",
                }),
                defineField({ name: "required", type: "boolean", initialValue: false }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

export const downloadSection = defineType({
  name: "downloadSection",
  title: "Download",
  type: "object",
  fields: [
    ...baseSectionFields,
    defineField({
      name: "download",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({ name: "file", type: "file" }),
      ],
    }),
  ],
});

export const sections = [
  heroSection,
  richTextSection,
  statsSection,
  cardGridSection,
  mediaSection,
  carouselSection,
  logoCloudSection,
  featureTabsSection,
  ctaSection,
  formSection,
  downloadSection,
];
