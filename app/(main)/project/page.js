"use client";

import { useEffect, useState } from "react";
import ListProjectSection from "@/app/_components/sections/ListProjectSection";
import LoadingSpinner from "@/app/_components/ui/LoadingSpinner";
import { apiClient } from "@/app/_utils/api-client";

export default function ProjectsPage() {
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient("/api/project");

        const projectsArray = Array.isArray(response.data.projects)
          ? response.data.projects
          : [];

        // Get total count of projects (you might want to create a separate API endpoint for this)
        const countResponse = await apiClient("/api/project/count");
        const total = countResponse.data?.count || projectsArray.length;

        setTotalProjects(total);

        const transformedProjects = projectsArray.map((project) => ({
          ...project,
          slug: project.slug?.current || project.slug || "",
          image: project.image?.asset?.url || project.image || "",
          tech_stack: Array.isArray(project.tech_stack)
            ? project.tech_stack.map((tech) => ({
                title: tech.title,
                icon: tech.icon,
              }))
            : [],
          tech_stack_string: Array.isArray(project.tech_stack)
            ? project.tech_stack.map((tech) => tech.title).join(", ")
            : "",
        }));

        setProjectsData({
          description: `Beberapa dari ${total}+ proyek yang pernah saya kerjakan. Klik setiap proyek untuk melihat detail selengkapnya.`,
          projects: transformedProjects,
        });
      } catch (err) {
        console.error("Error fetching projects data:", err);
        setError(
          err.message || "Failed to load projects. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!projectsData || projectsData.projects.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No projects found. Check back later!
      </div>
    );
  }

  return <ListProjectSection projectsData={projectsData} />;
}
