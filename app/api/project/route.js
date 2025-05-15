// app/api/data/projects/route.js
import projectsData from "@/data/projects.json";
import ApiResponse from "@/app/_utils/api-response";

export async function GET(request) {
  try {
    // Validasi data
    if (
      !projectsData ||
      !projectsData.projects ||
      !Array.isArray(projectsData.projects)
    ) {
      throw new Error("Invalid projects data structure");
    }

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    // Ambil data dengan limit jika ada
    const projects = limit
      ? projectsData.projects.slice(0, parseInt(limit))
      : projectsData.projects;

    // Format response yang konsisten
    return ApiResponse.success({
      description: projectsData.description,
      projects: projects,
    });
  } catch (error) {
    console.error("Projects API Error:", error);
    return ApiResponse.serverError(error.message);
  }
}
