"use client";

import { motion } from "framer-motion";
import LoadingSpinner from "@/app/_components/ui/LoadingSpinner";

export default function ExperienceSection({ data, loading, error }) {
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Pengalaman
        </h2>
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Pengalaman
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          No experience records available.
        </p>
      </section>
    );
  }

  return (
    <motion.section
      className="mt-16 space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Pengalaman
      </h2>
      <p className="text-wrap text-gray-600 dark:text-gray-400 pb-2">
        Inilah lembaran pengalaman kerja yang telah membentuk kompetensi
        profesional saya.
      </p>

      <div className="space-y-6">
        {data.map((exp) => (
          <motion.div
            key={exp._id}
            className="pb-6 hover:border-b hover:border-gray-200 dark:hover:border-gray-800"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="flex items-center gap-4">
              {exp.logo && (
                <img
                  src={exp.logo}
                  alt={exp.logoAlt || `${exp.company} logo`}
                  width={64}
                  height={64}
                  className="rounded-md object-cover w-16 h-16 border border-gray-200 dark:border-gray-700"
                />
              )}

              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-0">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white !leading-5">
                    {exp.company}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm opacity-50 !leading-5">
                    {exp.position}
                  </p>
                </div>
                <div className="sm:text-right mt-1 sm:mt-0">
                  <p className="text-gray-900 dark:text-white !leading-5">
                    {exp.period}
                    {exp.current && (
                      <span className="ml-1 text-xs text-green-600 dark:text-green-400">
                        •
                      </span>
                    )}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm opacity-50 !leading-5">
                    {exp.duration}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
