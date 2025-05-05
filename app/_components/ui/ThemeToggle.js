"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/_hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-amber-500 hover:text-amber-400 dark:text-amber-400 dark:hover:text-amber-300" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600 hover:text-indigo-700 dark:text-gray-500 dark:hover:text-white" />
      )}
    </button>
  );
}
