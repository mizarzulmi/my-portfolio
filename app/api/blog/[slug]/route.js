import { sanityClient } from "@/app/_utils/sanity.client";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const awaitedParams = await params;
    const { slug } = awaitedParams;

    const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        mainImage {
          ...,
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          },
          "alt": alt
        },
        publishedAt,
        body[] {
          ...,
          _type == "image" => {
            ...,
            asset-> {
              _id,
              url,
              metadata {
                dimensions
              }
            },
            "alt": alt
          },
          markDefs[] {
            ...,
            _type == "internalLink" => {
              "slug": @.reference->slug
            }
          }
        },
        views,
        "categories": categories[]->{
          _id,
          title,
          slug
        },
        "tags": tags[]->{
          _id,
          title,
          slug
        }
      }`;

    const post = await sanityClient.fetch(query, { slug });

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}
