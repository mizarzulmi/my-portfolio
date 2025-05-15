import { sanityClient } from "@/app/_utils/sanity.client";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    // 1. Dapatkan data tag
    const tag = await sanityClient.fetch(
      `*[_type == "tag" && slug.current == $slug][0]{
        _id,
        title,
        description,
        "slug": slug.current
      }`,
      { slug }
    );

    if (!tag) {
      return NextResponse.json(
        { success: false, error: "Tag not found" },
        { status: 404 }
      );
    }

    // 2. Dapatkan post yang memiliki tag ini
    const posts = await sanityClient.fetch(
      `*[_type == "post" && references($tagId)]{
        _id,
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        views,
        mainImage,
        "tags": tags[]->{
          _id,
          title,
          slug
        },
        categories[]->{title, slug}
      } | order(publishedAt desc)`,
      { tagId: tag._id }
    );

    return NextResponse.json({
      success: true,
      data: {
        tag,
        posts,
      },
    });
  } catch (error) {
    console.error("Error fetching tag posts:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch tag posts",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
