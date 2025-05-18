import { sanityClient } from "@/app/_utils/sanity.client";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    // Query untuk mendapatkan deskripsi section projects
    const sectionQuery = `*[_type == "section" && title == "Projects"][0] {
      description
    }`;

    // Query untuk mendapatkan projects dengan tahun
    let projectsQuery = `*[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      "image": image.asset->url,
      "tech_stack": tech_stack[]->{
        title, icon
      },
      _createdAt,
      "year": select(
        defined(date) => date,
        _createdAt
      )
    }`;

    if (limit && !isNaN(limit)) {
      projectsQuery = `*[_type == "project"] | order(_createdAt desc) [0...${parseInt(limit)}] {
        _id,
        title,
        slug,
        description,
        "image": image.asset->url,
        "tech_stack": tech_stack[]->{
          title, icon
        },
        _createdAt,
        "year": select(
          defined(date) => date,
          _createdAt
        )
      }`;
    }

    const [sectionData, projects] = await Promise.all([
      sanityClient.fetch(sectionQuery),
      sanityClient.fetch(projectsQuery),
    ]);

    // Format data sesuai dengan yang diharapkan oleh ProjectsPage
    const responseData = {
      description:
        sectionData?.description ||
        "Beberapa proyek yang pernah saya kerjakan.",
      projects: projects.map((project) => ({
        ...project,
        tech_stack:
          project.tech_stack?.map((tech) => ({
            title: tech.title,
            icon: tech.icon,
          })) || [],
        tech_stack_string:
          project.tech_stack?.map((tech) => tech.title).join(", ") || "",
        year: new Date(project.year).getFullYear(),
      })),
    };

    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
