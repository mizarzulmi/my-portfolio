import { sanityClient } from "@/app/_utils/sanity.client";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const { slug } = params;

  try {
    // Anggap slug adalah _id
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

    // Pakai post._id untuk patch
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
        details: error,
      },
      { status: 500 }
    );
  }
}
