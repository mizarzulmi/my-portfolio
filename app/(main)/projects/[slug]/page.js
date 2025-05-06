"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/app/_components/ui/LoadingSpinner";
import { apiClient } from "@/app/_utils/api-client";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient(`/api/data/projects`);
        const foundProject = response.data.projects.find(
          (p) => p.slug === slug
        );

        if (foundProject) {
          setProject(foundProject);
        } else {
          setError("Project not found");
        }
      } catch (err) {
        console.error("Error fetching project data:", err);
        setError("Failed to load project. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!project) return null;

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{project.title}</h1>

        <div className="mb-8">
          <div className="relative aspect-video rounded-lg overflow-hidden border">
            <img
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            {project.description}
          </p>

          <div className="flex items-center gap-4 text-sm font-semibold text-muted-foreground mb-8">
            {project.date}
            <span className="flex items-center gap-1">
              ⭐️ {project.stars} stars
            </span>
          </div>

          {/* Add more project details here as needed */}
        </div>
      </div>
    </div>
  );
}
