"use client";

import { useState } from "react";
import { X } from "lucide-react";
import ThemeToggle from "@/app/_components/ui/ThemeToggle";
import CustomHamburgerIcon from "@/app/_components/ui/CustomHamburgerIcon";
import MobileMenu from "./MobileMenu";
import NavLink from "./NavLink";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMobileMenu = () => setIsOpen(false);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/articles", label: "Articles" },
  ];

  return (
    <header className="sticky top-0 z-50 navbar-bg border-b border-custom">
      <div className="custom-w mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Nama */}
          <Link
            href="/"
            className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400"
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          {/* Container untuk Menu Kanan */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  onClick={closeMobileMenu}
                />
              ))}
            </nav>

            {/* Theme Toggle dan Mobile Button */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 md:hidden"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-gray-800 dark:text-white" />
                ) : (
                  <CustomHamburgerIcon />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          links={navLinks}
          isOpen={isOpen}
          closeMenu={closeMobileMenu}
        />
      </div>
    </header>
  );
}
