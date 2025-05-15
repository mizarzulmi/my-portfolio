"use client";

import { useEffect, useState } from "react";
import GroupedProjectSection from "@/app/_components/sections/GroupedProjectSection";
import LoadingSpinner from "@/app/_components/ui/LoadingSpinner";
import { apiClient } from "@/app/_utils/api-client";

export default function ProjectsPage() {
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient("/api/project");

        // Add year to each project if not already present
        const projectsWithYear = response.data.projects.map((project) => {
          if (!project.year) {
            // Extract year from date if format is "MMM YYYY"
            const year = project.date
              ? new Date(project.date).getFullYear()
              : new Date().getFullYear();
            return { ...project, year };
          }
          return project;
        });

        setProjectsData({
          description: response.data.description ?? "",
          projects: Array.isArray(projectsWithYear) ? projectsWithYear : [],
        });
      } catch (err) {
        console.error("Error fetching projects data:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!projectsData) return null;

  return <GroupedProjectSection projectsData={projectsData} />;
}
