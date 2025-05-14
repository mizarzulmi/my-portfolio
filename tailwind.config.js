/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary))",
        foreground: "rgb(var(--foreground))",
        background: "rgb(var(--background))",
        card: "rgb(var(--card-bg))",
        border: "rgb(var(--border-color))",
      },
    },
  },
  plugins: [],
};
