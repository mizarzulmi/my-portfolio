import { sanityClient } from "@/app/_utils/sanity.client";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    // First await the params object
    const awaitedParams = await params;
    const { slug } = awaitedParams;

    const post = await sanityClient.fetch(
      `*[_type == "post" && _id == $id][0]{_id, views}`,
      { id: slug }
    );

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    // Update view count
    const result = await sanityClient
      .patch(post._id)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();

    return NextResponse.json({
      success: true,
      views: result.views,
    });
  } catch (error) {
    console.error("Error updating view count:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update view count",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
