import { sanityClient } from "@/app/_utils/sanity.client";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // Await the params object first
    const awaitedParams = await params;
    const { slug } = awaitedParams;

    const query = `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      "image": image.asset->{
        url,
        alt
      },
      "tech_stack": tech_stack[]->{
        _id,
        title,
        slug,
        icon
      },
      project_url,
      github_url,
      content,
      _createdAt,
      _updatedAt
    }`;

    const project = await sanityClient.fetch(query, { slug });

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
