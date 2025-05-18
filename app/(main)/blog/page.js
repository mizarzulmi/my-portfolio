"use client";

import { useEffect, useState } from "react";
import GroupedBlogSection from "@/app/_components/sections/GroupedBlogSection";
import LoadingSpinner from "@/app/_components/ui/LoadingSpinner";
import { apiClient } from "@/app/_utils/api-client";

export default function BlogPage() {
  const [postsData, setPostsData] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, countResponse] = await Promise.all([
          apiClient("/api/blog"),
          apiClient("/api/blog/count"),
        ]);

        if (!Array.isArray(postsResponse.data)) {
          throw new Error("Expected array of posts");
        }

        const postsByYear = postsResponse.data.reduce((acc, post) => {
          const year = new Date(post.publishedAt).getFullYear();
          if (!acc[year]) acc[year] = [];
          acc[year].push(post);
          return acc;
        }, {});

        setPostsData(postsByYear);
        setPostCount(countResponse.data?.count || postsResponse.data.length);
      } catch (err) {
        console.error("Error fetching blog data:", err);
        setError(
          err.message || "Failed to load blog posts. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!postsData) return null;

  return <GroupedBlogSection postsByYear={postsData} postCount={postCount} />;
}
