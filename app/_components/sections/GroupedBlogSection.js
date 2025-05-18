"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays, Eye } from "lucide-react";

export default function GroupedBlogSection({ postsByYear, postCount }) {
  if (!postsByYear || Object.keys(postsByYear).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No blog posts to display
      </div>
    );
  }

  // Sort years in descending order
  const sortedYears = Object.keys(postsByYear).sort((a, b) => b - a);

  return (
    <section className="pb-5">
      <div className="my-6 flex flex-col gap-0">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="tracking-wider text-2xl font-bold text-gray-800 dark:text-white"
        >
          Writings
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2 text-wrap text-sm text-gray-600 dark:text-muted-foreground"
        >
          I write about web development, programming, and software engineering.
          Here are some of my recent blog posts.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          Total Posts: <span className="font-medium">{postCount}+</span>
        </motion.p>
      </div>

      {sortedYears.map((year) => (
        <div key={year} className="mb-10">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300"
          >
            {year}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid gap-4"
          >
            {postsByYear[year].map((post) => (
              <motion.div
                key={post._id}
                whileHover={{ y: -2 }}
                className="flex flex-col gap-3 rounded-lg border bg-card text-card border-custom p-4 group relative transition-all duration-200 hover:shadow-sm backdrop-blur-sm hover:bg-gray-100/50 dark:hover:bg-neutral-800/50"
              >
                <div className="flex-1">
                  <Link href={`/blog/${post.slug.current}`}>
                    <h3 className="mb-2 text-lg font-medium transition-colors duration-200 hover:underline text-gray-800 dark:text-white">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Date and Views */}
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <span>|</span>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {post.views || 0} views
                    </div>
                  </div>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-muted-foreground text-sm line-clamp-3 mb-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Tags:
                      </span>
                      {post.tags.map((tag) => (
                        <Link key={tag._id} href={`/tags/${tag.slug.current}`}>
                          <span className="inline-flex items-center rounded border border-gray-200 dark:border-gray-700 px-2 py-1 text-xs hover:underline">
                            #{tag.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  );
}
