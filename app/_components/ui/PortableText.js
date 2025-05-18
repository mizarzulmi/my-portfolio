// app/_components/PortableTextComponents.js
import React from "react";
import { urlFor } from "@/app/_utils/sanity.client";
import Link from "next/link";
import Image from "next/image";

export const PortableTextComponents = {
  types: {
    image: ({ value }) => {
      console.log("Image data:", value); // Debug log

      // Jika asset menggunakan url langsung (seperti pada debug Anda)
      if (value?.asset?.url) {
        return (
          <div className="my-8">
            <img
              src={value.asset.url}
              alt={value.alt || "Post image"}
              className="rounded-lg shadow-lg w-full h-auto mx-auto"
              loading="lazy"
              width={value.asset.metadata?.dimensions?.width || 800}
              height={value.asset.metadata?.dimensions?.height || 600}
            />
            {value.alt && (
              <figcaption className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                {value.alt}
              </figcaption>
            )}
          </div>
        );
      }

      // Jika asset menggunakan _ref (standard Sanity)
      if (value?.asset?._ref) {
        const imageUrl = urlFor(value).width(1200).quality(80).url();

        return (
          <div className="my-8">
            <img
              src={imageUrl}
              alt={value.alt || "Post image"}
              className="rounded-lg shadow-lg w-full h-auto mx-auto"
              loading="lazy"
              width={value.asset.metadata?.dimensions?.width || 800}
              height={value.asset.metadata?.dimensions?.height || 600}
            />
          </div>
        );
      }

      console.error("Unsupported image format:", value);
      return (
        <div className="bg-red-100 p-4 my-4">Unsupported image format</div>
      );
    },
    codeBlock: ({ value }) => (
      <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
        <code>{value.code}</code>
      </pre>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-10 mb-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-9 mb-7">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-8 mb-6">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mt-7 mb-5">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-400 pl-4 italic my-6 text-gray-600 dark:text-gray-300">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-8 mb-6 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-8 mb-6 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const isInternal = value?.href?.startsWith("/");
      return isInternal ? (
        <Link
          href={value.href}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          {children}
        </Link>
      ) : (
        <a
          href={value?.href}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">
        {children}
      </code>
    ),
  },
};
