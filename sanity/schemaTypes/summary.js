import { defineType, defineField } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";

export const summary = defineType({
  name: "summary",
  title: "Summary",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
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
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "greeting",
      title: "Greeting Text",
      type: "string",
      initialValue: "Hi, I'm",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortBio",
      title: "Short Bio/Introduction",
      type: "text",
      rows: 3,
      description: "Brief introduction (shown in cards/headers)",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "detailedBio",
      title: "Detailed Bio",
      type: "blockContent",
      description: "Full about me content",
    }),

    defineField({
      name: "skills",
      title: "Skills & Technologies",
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
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "resume",
      title: "Resume/CV",
      type: "file",
      description: "Upload your resume file",
    }),
  ],
});
