import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      type: "string",
      title: "Site name",
      initialValue: "StartPoint Agency",
    }),
    defineField({
      name: "tagline",
      type: "object",
      title: "Tagline",
      fields: [
        defineField({ name: "zh", type: "string", title: "Chinese" }),
        defineField({ name: "en", type: "string", title: "English" }),
      ],
    }),
    defineField({
      name: "description",
      type: "object",
      title: "Meta description",
      fields: [
        defineField({ name: "zh", type: "text", title: "Chinese" }),
        defineField({ name: "en", type: "text", title: "English" }),
      ],
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      title: "Contact email",
      initialValue: "d541449473@gmail.com",
    }),
    defineField({
      name: "locations",
      type: "array",
      title: "Office / coffee-chat locations",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      title: "Social links",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "url", type: "url" }),
          ],
        },
      ],
    }),
    defineField({
      name: "defaultOgImage",
      type: "image",
      title: "Default OG image",
      options: { hotspot: true },
    }),
  ],
});
