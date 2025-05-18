# 🧑‍💻 My Portfolio – Built with Next.js 15 + Tailwind CSS

Welcome to my personal portfolio! This project showcases my work, experiences, and articles, built using the latest technologies.

## 🌐 Live Demo

👉 [View Live Portfolio](https://mizarzulmi.dev)

## 🚀 Features

- ⚡ Fast and optimized with **Next.js 15**
- 🎨 Fully responsive design using **Tailwind CSS**
- 🌙 Dark Mode & Theme Toggle
- 🌍 Language Switcher
- 📄 Dynamic content via local JSON data
- 🔗 Modular component structure

## 🗂 Project Structure

```text
my-portfolio/
├── app/
│   ├── (main)/                  # Main route group
│   │   ├── about/               # About page
│   │   ├── blog/                # Blog pages
│   │   ├── contact/             # Contact page
│   │   ├── experience/          # Experience page
│   │   ├── project/             # Projects page
│   │   ├── tags/                # Tags page
│   │   └── page.js              # Home page
│   ├── _components/             # Shared components
│   │   ├── layout/              # Layout components
│   │   │   ├── Footer.js
│   │   │   ├── MobileMenu.js
│   │   │   ├── Navbar.js
│   │   │   └── NavLink.js
│   │   └── sections/            # Page sections
│   │       ├── AboutSections.js
│   │       ├── ExperiencesSections.js
│   │       └── SummarySections.js
│   ├── _utils/                  # Utility functions
│   │   ├── api-client.js        # API client
│   │   └── sanity.client.js     # Sanity client
│   ├── ui/                      # UI components
│   │   ├── Button.js
│   │   ├── CustomHandBuggerIcon.js
│   │   ├── LanguageSwitcher.js
│   │   ├── LoadingSpinner.js
│   │   └── ThemeToggle.js
│   ├── api/                     # API routes
│   │   ├── blog/                # Blog API routes
│   │   │   ├── [slug]/
│   │   │   │   ├── page.js
│   │   │   │   └── views/
│   │   │   │       └── route.js
│   │   ├── project/             # Project API routes
│   │   │   └── [slug]/
│   │   │       └── page.js
│   │   └── tags/                # Tags API routes
│   │       └── [slug]/
│   │           └── page.js
│   ├── layout.js                # Root layout
│   └── ThemeWrapper.js          # Theme provider
├── public/                      # Static assets
│   ├── assets/                  # General assets
│   ├── images/                  # Image files
│   └── studio/                  # Sanity studio assets
├── sanity/                      # Sanity configuration
│   ├── schemas/                 # Sanity schemas
│   └── studio/                  # Studio customization
├── styles/                      # Global styles
│   ├── globals.scss             # Global SCSS
│   └── tailwind/                # Tailwind configurations
├── .env.local                   # Environment variables
├── next.config.js               # Next.js config
├── package.json                 # Project dependencies
├── sanity.config.js             # Sanity config
└── tailwind.config.js           # Tailwind config
```

Catatan :
backup data : sanity dataset export production ./backup
import data : sanity dataset import ./backup/ nama_dataset
