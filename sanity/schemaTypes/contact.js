import { defineType, defineField } from "sanity";
import {
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Github,
  Instagram,
} from "lucide-react";

export const contact = defineType({
  name: "contact",
  title: "Contact Information",
  type: "document",
  icon: Mail,
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Contact me",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      initialValue:
        "Feel free to reach out to me for any queries or collaborations.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [
        defineField({
          name: "socialLink",
          title: "Social Link",
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Gmail", value: "gmail", icon: Mail },
                  { title: "WhatsApp", value: "whatsapp", icon: Phone },
                  { title: "LinkedIn", value: "linkedin", icon: Linkedin },
                  { title: "Twitter", value: "twitter", icon: Twitter },
                  { title: "GitHub", value: "github", icon: Github },
                  { title: "Instagram", value: "instagram", icon: Instagram },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Display Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Username/Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Custom URL",
              type: "string",
              description: "Override the default URL pattern for this platform",
              validation: (Rule) =>
                Rule.custom((value) => {
                  if (!value) return true;
                  const pattern = /^(https?:\/\/|mailto:|tel:|whatsapp:|\/|#)/i;
                  return pattern.test(value)
                    ? true
                    : "URL must start with http://, https://, mailto:, tel:, whatsapp:, /, or #";
                }),
            }),
          ],
          preview: {
            select: {
              platform: "platform",
              label: "label",
              value: "value",
            },
            prepare({ platform, label, value }) {
              const icons = {
                gmail: Mail,
                whatsapp: Phone,
                linkedin: Linkedin,
                twitter: Twitter,
                github: Github,
                instagram: Instagram,
              };
              return {
                title: label || platform,
                subtitle: value,
                media: icons[platform] || Mail,
              };
            },
          },
        }),
      ],
    }),
  ],
});
