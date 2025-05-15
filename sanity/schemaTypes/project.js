import { defineType, defineField } from "sanity";
import { FolderIcon } from "@sanity/icons";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: FolderIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tech_stack",
      title: "Tech Stack",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
          options: {
            filter: () => {
              return {
                filter: '_type == "tag"',
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "project_url",
      title: "Project URL",
      type: "url",
    }),
    defineField({
      name: "github_url",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "content",
      title: "Detailed Content",
      type: "blockContent", // Jika ingin konten lengkap dengan rich text
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      tech: "tech_stack",
    },
    prepare({ title, media, tech }) {
      const techTitles =
        tech?.map((t) => t.title).join(", ") || "No tech specified";
      return {
        title,
        media,
        subtitle: techTitles,
      };
    },
  },
});
