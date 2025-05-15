import { sanityClient } from "@/app/_utils/sanity.client";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    let query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      views,
      "categories": categories[]->{
        _id,
        title
      },
      "tags": tags[]->{
        _id,
        title,
        slug
      }
    }`;

    // Jika ada parameter limit, tambahkan ke query
    if (limit && !isNaN(limit)) {
      query = `*[_type == "post"] | order(publishedAt desc) [0...${parseInt(limit)}] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        views,
        "categories": categories[]->{
          _id,
          title
        },
        "tags": tags[]->{
          _id,
          title,
          slug
        }
      }`;
    }

    const posts = await sanityClient.fetch(query);

    return NextResponse.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
