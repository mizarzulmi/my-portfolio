import { PortableText } from "@portabletext/react";
import React from "react";

export const PortableTextComponents = {
  block: {
    h1: ({ children }) => {
      return React.createElement(
        "h1",
        { className: "text-3xl font-bold mt-6 mb-4" },
        children
      );
    },
    h2: ({ children }) => {
      return React.createElement(
        "h2",
        { className: "text-2xl font-semibold mt-6 mb-3" },
        children
      );
    },
    h3: ({ children }) => {
      return React.createElement(
        "h3",
        { className: "text-xl font-semibold mt-5 mb-3" },
        children
      );
    },
    h4: ({ children }) => {
      return React.createElement(
        "h4",
        { className: "text-lg font-semibold mt-4 mb-2" },
        children
      );
    },
    blockquote: ({ children }) => {
      return React.createElement(
        "blockquote",
        { className: "border-l-4 border-gray-400 pl-4 italic my-4" },
        children
      );
    },
    normal: ({ children }) => {
      return React.createElement("p", { className: "mb-4" }, children);
    },
  },
  list: {
    bullet: ({ children }) => {
      return React.createElement(
        "ul",
        { className: "list-disc pl-6 mb-4" },
        children
      );
    },
  },
  listItem: {
    bullet: ({ children }) => {
      return React.createElement("li", { className: "mb-1" }, children);
    },
  },
  marks: {
    strong: ({ children }) => {
      return React.createElement(
        "strong",
        { className: "font-semibold" },
        children
      );
    },
    em: ({ children }) => {
      return React.createElement("em", { className: "italic" }, children);
    },
    link: ({ value, children }) => {
      return React.createElement(
        "a",
        {
          href: value?.href,
          className: "text-blue-600 underline hover:text-blue-800",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        children
      );
    },
  },
  types: {
    image: ({ value }) => {
      return React.createElement("img", {
        src: value.asset?.url,
        alt: value.alt || "Image",
        className: "my-4 rounded-md shadow",
      });
    },
  },
};
