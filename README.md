# 🧑‍💻 My Portfolio – Built with Next.js 15 + Tailwind CSS

Welcome to my personal portfolio! This project showcases my work, experiences, and articles, built using the latest technologies.

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
├── app/                   # App directory (Next.js 15)
│   ├── _components/        # Reusable UI sections
│   │   ├── layout/
│   │   │   ├── navbar/
│   │   │   │   ├── MobileMenu.js
│   │   │   │   ├── Navbar.js
│   │   │   │   └── NavLink.js
│   │   │   └── Footer.js
│   │   └── sections/
│   │       ├── AboutSections.js
│   │       ├── ExperiencesSettings.js
│   │       └── SummarySections.js
│   ├── ui/                # UI elements like buttons, toggles
│   │   ├── Button.js
│   │   ├── CustomHandBuggerIcon.js
│   │   ├── LanguageSwitches.js
│   │   ├── LoadingSpinner.js
│   │   └── ThemeToggle.js
│   ├── hooks/             # Custom React hooks
│   │   └── useTheme.js
│   ├── config/            # API configuration
│   │   └── api.js
│   ├── (main)/            # Page routes (about, projects, etc)
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── experience/
│   │   ├── projects/
│   │   └── page.js
│   ├── api/               # API route handlers
│   │   ├── [type]/...
│   ├── layout.js          # Main layout
│   └── ThemeWrapper.js    # Theme context provider
├── data/                  # JSON content
│   ├── about.json
│   ├── experience.json
│   └── summary.json
├── public/                # Public assets (images, files)
│   ├── assets/
│   ├── file/
│   └── images/
├── sanity/                # sanity
├── .env.local             # Environment config (ignored)
├── next.config.js
└── package.json
```
