// app/_components/sections/SummarySection.js
"use client";

import LoadingSpinner from "@/app/_components/ui/LoadingSpinner";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/app/_components/ui/Button";

export default function SummarySection({ data, loading, error }) {
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (!data || !data.name || !data.description) {
    return (
      <div className="text-center text-gray-500 py-8">
        Profile data is incomplete. Received: {JSON.stringify(data, null, 2)}
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-10">
      <div className="hidden sm:block h-48 w-48">
        <img
          src={data.profileImage}
          alt={data.name}
          width={180}
          height={180}
          className="h-full w-full rounded object-cover object-top bg-neutral-300 dark:bg-neutral-800"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 text-3xl font-bold tracking-wide text-[--text-primary] dark:text-[--text-primary-dark]">
          <span className="text-inherit">
            {data.greeting} {data.name}
          </span>
          <span className="inline-block origin-[70%_70%] animate-wave text-inherit">
            👋🏼
          </span>
        </div>
        <div className="mt-2 space-y-3 text-gray-600 dark:text-gray-400">
          <p className="text-lg">{data.description}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-4 opacity-90">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="adaptive" href="/contact">
              <MessageSquare className="w-4 h-4" />
              Contact me
            </Button>
            {/* CV Download Button */}
            {data.links?.find((link) => link.text === "CV") && (
              <Button
                href={data.links.find((link) => link.text === "CV").url}
                variant="secondary"
                className="flex items-center gap-2"
                download
              >
                <Download className="w-4 h-4" />
                Download CV
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
