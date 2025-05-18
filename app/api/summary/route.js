import { sanityClient } from "@/app/_utils/sanity.client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = `*[_type == "summary"][0] {
      name,
      greeting,
      shortBio,
      detailedBio,
      "profileImage": profileImage.asset->url,
      "profileImageAlt": profileImage.alt,
      "resumeUrl": resume.asset->url,
      skills[]->{
        _id,
        title,
        icon
      }
    }`;

    const summary = await sanityClient.fetch(query);

    if (!summary) {
      return NextResponse.json(
        { success: false, error: "Summary not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...summary,
        description: summary.shortBio, // Map shortBio to description for backward compatibility
      },
    });
  } catch (error) {
    console.error("Error fetching summary:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch summary" },
      { status: 500 }
    );
  }
}
