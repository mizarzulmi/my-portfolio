import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { apiClient } from "@/app/_utils/api-client";
import Link from "next/link";
import { PortableTextComponents } from "@/app/_components/ui/PortableText";

async function getProject(slug) {
  try {
    const response = await apiClient(`/api/project/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
}

export async function generateStaticParams() {
  try {
    const response = await apiClient("/api/project");
    return (
      response.data?.projects?.map((project) => ({
        slug: project.slug?.current || project.slug,
      })) || []
    );
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ProjectDetailPage({ params }) {
  const awaitedParams = await params;
  const { slug } = awaitedParams;

  let project;

  try {
    project = await getProject(slug);
  } catch (error) {
    console.error("Error in page component:", error);
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">
            The requested project could not be loaded: {error.message}
          </p>
          <Link
            href="/projects"
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-2">{project.title}</h1>

        <div className="flex items-center gap-4 mb-8 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
          {/* <time
            dateTime={project._createdAt}
            className="flex items-center gap-1"
          >
            {new Date(project._createdAt).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time> */}

          {project._updatedAt && (
            <>
              {/* <span>|</span> */}
              <span className="flex items-center gap-1">
                Updated:{" "}
                {new Date(project._updatedAt).toLocaleDateString("id-ID")}
              </span>
            </>
          )}
        </div>

        {project.image && (
          <div className="mb-8 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <Image
              src={project.image.url}
              alt={project.image.alt || project.title}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {project.description && (
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            {project.description}
          </p>
        )}

        <div className="prose dark:prose-invert max-w-none">
          {project.content ? (
            <PortableText
              value={project.content}
              components={PortableTextComponents}
            />
          ) : (
            <p>No detailed content available for this project.</p>
          )}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {project.project_url && (
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium mb-2">Live Project</h3>
              <Link
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                View Live Demo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          )}

          {project.github_url && (
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium mb-2">Source Code</h3>
              <Link
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                View on GitHub
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {project.tech_stack?.length > 0 && (
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">
              Technologies Used:
            </h4>
            <div className="flex flex-wrap gap-2">
              {/* Tech Stack Badges */}
              {project.tech_stack && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {(typeof project.tech_stack === "string"
                    ? project.tech_stack.split(", ")
                    : project.tech_stack
                  ).map((tech, techIndex) => {
                    const techName =
                      typeof tech === "object" ? tech.title : tech;
                    const iconUrl = typeof tech === "object" ? tech.icon : null;

                    return (
                      <div
                        key={techIndex}
                        className="inline-flex items-center gap-2 rounded border border-gray-200 dark:border-gray-700 px-2 py-1 text-sm"
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
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
