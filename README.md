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

## 🛠 Quick Start

### Prerequisites

- Node.js 18+
- Docker (optional)
- Sanity CLI (`npm install -g @sanity/cli`)

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 🐳Docker Setup

```bash
# Build the Docker image
docker-compose build

# Start the container
docker-compose up -d

# Stop the container
docker-compose down
```

# 🔧 Environment Configuration

```bash
# Next.js
NEXT_PUBLIC_SITE_URL=https://mizarzulmi.dev
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03

# Sanity (for studio)
SANITY_STUDIO_API_PROJECT_ID=your_project_id
SANITY_STUDIO_API_DATASET=production
SANITY_STUDIO_PREVIEW_SECRET=your_secret_token
```

# 🧠 Sanity CMS Commands

```bash
# Login to Sanity
sanity login

# Start Sanity Studio locally
sanity start

# Export production data
sanity dataset export production ./backup

# Import data to a dataset
sanity dataset import ./backup/backup.tar.gz nama_dataset

# Deploy Sanity Studio
sanity deploy
```
