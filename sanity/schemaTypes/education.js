import { defineType, defineField } from "sanity";
import { GraduationCap } from "lucide-react";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  icon: GraduationCap,
  fields: [
    defineField({
      name: "degree",
      title: "Degree/Diploma",
      type: "string",
      description: "e.g. Bachelor of Science in Computer Science",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
      description: "e.g. FPT Taroudant, Ofppt ISTA Mirleft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "string",
      description: "e.g. Sep 2022 – Jul 2024",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Institution Logo",
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
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Optional description of your studies",
    }),
    defineField({
      name: "courses",
      title: "Relevant Courses",
      type: "array",
      of: [{ type: "string" }],
      description: "List of relevant courses you took",
    }),
    defineField({
      name: "skills",
      title: "Skills Learned",
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
      title: "degree",
      subtitle: "institution",
      media: "logo",
    },
  },
});
