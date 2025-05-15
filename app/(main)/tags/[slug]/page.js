"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays, Eye } from "lucide-react";
import LoadingSpinner from "@/app/_components/ui/LoadingSpinner";
import { apiClient } from "@/app/_utils/api-client";

export default function TagPage({ params }) {
  const { slug } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient(`/api/tags/${slug}`);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching tag posts:", err);
        setError(
          err.message || "Failed to load tag posts. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">{error}</h1>
        <Link
          href="/tags"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Browse all tags
        </Link>
      </div>
    );
  if (!data)
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
        <h1 className="text-2xl font-bold mb-4">Tag not found</h1>
        <Link
          href="/tags"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Browse all tags
        </Link>
      </div>
    );

  const { tag, posts } = data;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="my-6 flex flex-col gap-0">
          <div className="flex group my-6 cursor-pointer items-center justify-between gap-3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="tracking-wider text-2xl font-bold underline-offset-4 group-hover:underline text-gray-800 dark:text-white"
            >
              Posts with tag #{tag.title}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-2 text-wrap text-sm text-gray-600 dark:text-muted-foreground"
          >
            {tag.description || `Collection of posts tagged with #${tag.title}`}
          </motion.p>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {posts.length} {posts.length === 1 ? "post" : "posts"} found
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No posts found for this tag
          </div>
        ) : (
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
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="mb-2 text-lg font-medium transition-colors duration-200 hover:underline text-gray-800 dark:text-white">
                      {post.title}
                    </h3>
                  </Link>

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

                  {post.excerpt && (
                    <p className="text-gray-600 dark:text-muted-foreground text-sm line-clamp-3 mb-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Tags:
                      </span>
                      {post.tags.map((tag) => (
                        <span
                          key={tag._id || tag}
                          className="inline-flex items-center rounded border border-gray-200 dark:border-gray-700 px-2 py-1 text-xs"
                        >
                          #{typeof tag === "string" ? tag : tag.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>
    </div>
  );
}
