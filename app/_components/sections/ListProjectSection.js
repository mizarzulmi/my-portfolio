"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ListProjectSection({ projectsData }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!projectsData || !projectsData.projects) {
    return (
      <div className="text-center text-red-500 py-8">
        Projects data is not available
      </div>
    );
  }

  if (projectsData.projects.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No projects to display
      </div>
    );
  }

  return (
    <section className="pb-5">
      <div className="my-6 flex flex-col gap-0">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="tracking-wider text-2xl font-bold text-gray-800 dark:text-white"
        >
          Proyek
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2 text-wrap text-sm text-gray-600 dark:text-muted-foreground"
        >
          {projectsData.description}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 grid gap-4"
      >
        {projectsData.projects.map((project, index) => (
          <motion.div
            key={project._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            className="flex flex-col gap-3 rounded-lg border bg-card text-card border-custom p-4 sm:flex-row group relative transition-all duration-200 hover:shadow-sm backdrop-blur-sm hover:bg-gray-100/50 dark:hover:bg-neutral-800/50"
          >
            {/* Image container with lazy loading */}
            {project.image && (
              <div
                className="relative cursor-zoom-in overflow-hidden rounded-md"
                onClick={() => setSelectedImage(project.image)}
              >
                <div className="relative h-60 min-w-40 sm:h-30">
                  <Image
                    alt={project.alt || project.title}
                    src={project.image}
                    fill
                    className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2FhYSI+TG9hZGluZzwvdGV4dD48L3N2Zz4="
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
              </div>
            )}

            <div className="flex-1">
              <Link
                href={`/project/${project.slug?.current || project.slug || "#"}`}
              >
                <h3 className="mb-2 text-lg font-medium transition-colors duration-200 hover:underline text-gray-800 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-muted-foreground text-sm line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                {project.tech_stack && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(typeof project.tech_stack === "string"
                      ? project.tech_stack.split(", ")
                      : project.tech_stack
                    ).map((tech, techIndex) => {
                      const techName =
                        typeof tech === "object" ? tech.title : tech;
                      const iconUrl =
                        typeof tech === "object" ? tech.icon : null;

                      return (
                        <div
                          key={techIndex}
                          className="inline-flex items-center gap-1 rounded border border-gray-200 dark:border-gray-700 px-2 py-1 text-xs"
                        >
                          {iconUrl && (
                            <img
                              alt={techName}
                              loading="lazy"
                              width="12"
                              height="12"
                              className="h-3 w-3"
                              src={iconUrl}
                            />
                          )}
                          <span>{techName}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors duration-200"
                onClick={() => setSelectedImage(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt="Zoomed project preview"
                  width={1920}
                  height={1080}
                  className="object-contain"
                  quality={100}
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
