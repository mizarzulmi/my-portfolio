"use client";

import { useEffect, useState } from "react";
import ExperienceSection from "@/app/_components/sections/ExperienceSection";
import SummarySection from "@/app/_components/sections/SummarySection";
import ProjectSection from "@/app/_components/sections/ProjectSection";
import { apiClient } from "@/app/_utils/api-client";
import LoadingSpinner from "@/app/_components/ui/LoadingSpinner";

export default function Home() {
  const [summaryData, setSummaryData] = useState(null);
  const [experienceData, setExperienceData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data secara parallel
        const [summaryRes, experienceRes, projectsRes] = await Promise.all([
          apiClient("/api/data/summary"),
          apiClient("/api/data/experience"),
          apiClient("/api/data/project?limit=2"),
        ]);

        console.log("API Responses:", {
          summaryRes,
          experienceRes,
          projectsRes,
        });

        // Handle summary data
        const receivedSummary = summaryRes.data || summaryRes;
        if (!receivedSummary?.name) {
          throw new Error("Invalid summary data structure");
        }
        setSummaryData(receivedSummary);

        // Handle experience data
        const receivedExperience = experienceRes.data || experienceRes;
        if (!Array.isArray(receivedExperience)) {
          throw new Error("Experience data should be an array");
        }
        setExperienceData(receivedExperience);

        // Handle projects data
        const receivedProjects = projectsRes.data || projectsRes;
        if (
          !receivedProjects?.description ||
          !Array.isArray(receivedProjects.projects)
        ) {
          throw new Error("Invalid projects data structure");
        }
        setProjectsData(receivedProjects);
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
          showViewAll={true} // Add this prop to show "View all" link
        />
      )}
    </div>
  );
}
