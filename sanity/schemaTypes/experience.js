import { defineType, defineField } from "sanity";
import { CaseIcon } from "@sanity/icons";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "company",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "string",
      description: "e.g. Nov 2021 – Present",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration Type",
      type: "string",
      description: "e.g. Full-time, Part-time, Contract",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "skills",
      title: "Technologies Used",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
          options: {
            filter: '_type == "tag"',
          },
        },
      ],
    }),
    defineField({
      name: "current",
      title: "Current Job?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Most Recent First",
      name: "dateDesc",
      by: [{ field: "period", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "company",
      subtitle: "position",
      media: "logo",
    },
  },
});
