import { CodeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const tag = defineType({
  name: "tag",
  title: "Tech Tag", // Ubah title untuk lebih spesifik
  type: "document",
  icon: CodeIcon, // Gunakan CodeIcon untuk tech stack
  fields: [
    defineField({
      name: "title",
      title: "Technology Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon URL",
      type: "url",
      description: "URL dari icon teknologi (contoh: dari devicon)",
      initialValue:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
  ],
});
