import { defineType, defineField } from "sanity";

export const projectSection = defineType({
  name: "projectSection",
  title: "Projects Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Projects",
      readOnly: true,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      initialValue: "Showcase of my recent projects and works.",
    }),
    defineField({
      name: "projects",
      title: "Featured Projects",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
