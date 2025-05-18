import { sanityClient } from "@/app/_utils/sanity.client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = `*[_type == "experience"] | order(period desc) {
      _id,
      company,
      position,
      period,
      duration,
      "logo": logo.asset->url,
      "logoAlt": logo.alt,
      responsibilities,
      current,
      "skills": skills[]->{
        _id,
        title,
        slug
      }
    }`;

    const experiences = await sanityClient.fetch(query);

    return NextResponse.json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}
