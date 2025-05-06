// components/ScrollProgressBar.js
"use client";

import { useEffect, useState } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function ScrollProgressBar() {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 200,
      parent: "body",
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollY / scrollHeight) * 100;

      // Deteksi arah scroll
      setIsScrollingDown(scrollY > lastScrollY);
      setLastScrollY(scrollY);

      // Hanya aktif saat scroll ke bawah atau di atas halaman
      if (isScrollingDown || scrollY === 0) {
        NProgress.set(scrollProgress / 100);
      } else {
        NProgress.set(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isScrollingDown]);

  return null;
}
