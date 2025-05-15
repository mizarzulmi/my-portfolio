"use client";

import { useEffect, useState } from "react";
import ExperienceSection from "@/app/_components/sections/ExperienceSection";
import SummarySection from "@/app/_components/sections/SummarySection";
import ProjectSection from "@/app/_components/sections/ProjectSection";
import BlogSection from "@/app/_components/sections/BlogSection";
import { apiClient } from "@/app/_utils/api-client";
import LoadingSpinner from "@/app/_components/ui/LoadingSpinner";

export default function Home() {
  const [summaryData, setSummaryData] = useState(null);
  const [experienceData, setExperienceData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [blogPosts, setBlogPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, experienceRes, projectsRes, blogRes] =
          await Promise.all([
            apiClient("/api/summary"),
            apiClient("/api/experience"),
            apiClient("/api/project?limit=2"),
            apiClient("/api/blog?limit=3"),
          ]);

        setSummaryData(summaryRes.data || summaryRes);
        setExperienceData(experienceRes.data || experienceRes);
        setProjectsData(projectsRes.data || projectsRes);
        setBlogPosts(blogRes.data || blogRes);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="space-y-10">
      <SummarySection data={summaryData} loading={loading} error={error} />
      <ExperienceSection
        data={experienceData}
        loading={loading}
        error={error}
      />
      {projectsData && (
        <ProjectSection
          projectsData={projectsData}
          loading={loading}
          error={error}
          showViewAll={true}
        />
      )}
      {blogPosts && (
        <BlogSection
          posts={blogPosts}
          loading={loading}
          error={error}
          showViewAll={true}
        />
      )}
    </div>
  );
}
