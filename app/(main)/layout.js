import Navbar from "@/app/_components/layout/navbar/Navbar";
import Footer from "@/app/_components/layout/Footer";
import ScrollProgress from "@/app/_components/ui/ScrollProgress";
import ThemeWrapper from "@/app/ThemeWrapper";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function MainLayout({ children }) {
  return (
    <div className={`${inter.variable} font-sans`}>
      <ScrollProgress />
      <ThemeWrapper>
        <div className="flex min-h-screen flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
          <Navbar />
          <main className="flex-1">
            <div className="custom-w mx-auto w-full flex-1 flex-col px-4 py-4 sm:py-8">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </ThemeWrapper>
    </div>
  );
}
