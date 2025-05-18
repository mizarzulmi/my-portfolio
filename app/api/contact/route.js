// app/api/socials/route.ts
import { sanityClient } from "@/app/_utils/sanity.client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await sanityClient.fetch(`
      *[_type == "contact"][0]{
        title,
        description,
        socialLinks[]{
          platform,
          label,
          value,
          url
        }
      }
    `);

    return NextResponse.json({
      success: true,
      data: {
        title: data?.title || "Contact me",
        description: data?.description || "Feel free to reach out",
        socialLinks: data?.socialLinks || [],
      },
    });
  } catch (error) {
    console.error("Error fetching social links:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch social links",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
