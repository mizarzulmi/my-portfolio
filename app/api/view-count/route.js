// app/api/data/view-count/route.js
import { sanityClient } from "@/app/_utils/sanity.client";

export const dynamic = "force-dynamic";

export async function PATCH(request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return Response.json({ error: "postId is required" }, { status: 400 });
  }

  try {
    // Pertama pastikan dokumen ada dan punya field views
    const doc = await sanityClient.getDocument(postId);
    if (!doc) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    // Jika views belum ada, set ke 1
    if (typeof doc.views !== "number") {
      const result = await sanityClient
        .patch(postId)
        .set({ views: 1 })
        .commit();

      return Response.json({ success: true, views: result.views });
    }

    // Jika sudah ada, increment
    const result = await sanityClient.patch(postId).inc({ views: 1 }).commit();

    return Response.json({ success: true, views: result.views });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
