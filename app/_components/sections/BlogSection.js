"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays, Eye } from "lucide-react";

export default function BlogSection({ posts, showViewAll = false }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No blog posts to display
      </div>
    );
  }

  return (
    <section className="pb-5">
      <div className="my-6 flex flex-col gap-0">
        <div className="flex group my-6 cursor-pointer items-center justify-between gap-3">
          <Link href="/articles">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="tracking-wider text-2xl font-bold underline-offset-4 group-hover:underline text-gray-800 dark:text-white"
            >
              Writings
            </motion.h2>
          </Link>
          {showViewAll && (
            <Link href="/articles">
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="btn-soft"
              >
                View all →
              </motion.span>
            </Link>
          )}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2 text-wrap text-sm text-gray-600 dark:text-muted-foreground"
        >
          I write about web development, programming, and software engineering.
          Here are some of my recent blog posts.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 grid gap-4"
      >
        {posts.map((post) => (
          <motion.div
            key={post._id}
            whileHover={{ y: -2 }}
            className="flex flex-col gap-3 rounded-lg border bg-card text-card border-custom p-4 group relative transition-all duration-200 hover:shadow-sm backdrop-blur-sm hover:bg-gray-100/50 dark:hover:bg-neutral-800/50"
          >
            <div className="flex-1">
              <Link href={`/articles/${post.slug.current}`}>
                <h3 className="mb-2 text-lg font-medium transition-colors duration-200 hover:underline text-gray-800 dark:text-white">
                  {post.title}
                </h3>

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
                <p className="text-gray-600 dark:text-muted-foreground text-sm line-clamp-2 mb-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                {post.categories && post.categories.length > 0 && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Tags:
                    </span>
                    {post.categories.map((category) => (
                      <span
                        key={category._id || category}
                        className="inline-flex items-center rounded border border-gray-200 dark:border-gray-700 px-2 py-1 text-xs"
                      >
                        #
                        {typeof category === "string"
                          ? category
                          : category.title}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
