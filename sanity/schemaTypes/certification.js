import { defineType, defineField } from "sanity";
import { BadgeCheck } from "lucide-react";

export const certification = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  icon: () => <BadgeCheck className="w-5 h-5" />,
  fields: [
    defineField({
      name: "title",
      title: "Certification Title",
      type: "string",
      description:
        "e.g., 'C++ Code Like you are in MATRIX: Mastering C++ in 12 Hours'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Issuer",
      type: "string",
      description: "e.g., Udemy, Coursera, etc.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "credentialId",
      title: "Credential ID / Certificate Number",
      type: "string",
      description: "Optional: Unique ID of the certificate (e.g., UC-12345678)",
    }),
    defineField({
      name: "credentialUrl",
      title: "Credential URL",
      type: "url",
      description:
        "Link to verify the certificate (e.g., Udemy/Coursera certificate URL)",
    }),
    defineField({
      name: "certificateFile",
      title: "Certificate File (PDF/Image)",
      type: "file",
      description: "Upload the certificate document (PDF or image)",
      options: {
        accept: ".pdf,.jpg,.jpeg,.png", // Format file yang diterima
      },
    }),
    defineField({
      name: "instructor",
      title: "Instructor",
      type: "string",
      description: "e.g., Mizar Zulmi Ramadhan",
    }),
    defineField({
      name: "completionDate",
      title: "Completion Date",
      type: "date",
      options: {
        dateFormat: "MMM YYYY",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "e.g., 'A tutorial for fast learners'",
    }),
    defineField({
      name: "logo",
      title: "Issuer Logo",
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
      name: "skills",
      title: "Skills/Languages",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "completionDateDesc",
      by: [{ field: "completionDate", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "issuer",
      date: "completionDate",
      credentialId: "credentialId",
      media: "logo",
      hasFile: "certificateFile.asset", // Menambahkan indikator file
    },
    prepare(selection) {
      const { title, subtitle, date, credentialId, media, hasFile } = selection;
      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "No date";
      return {
        title: `${title}`,
        subtitle: `${subtitle}${credentialId ? ` · ID: ${credentialId}` : ""} · Completed: ${formattedDate}${hasFile ? " 📄" : ""}`,
        media,
      };
    },
  },
});
