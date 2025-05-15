import { defineType, defineField } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
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
    }),
    defineField({
      name: "bio",
      title: "Detailed Bio",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "skills",
      title: "Skills",
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
  ],
});
