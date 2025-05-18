import { sanityClient } from "@/app/_utils/sanity.client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const count = await sanityClient.fetch(`count(*[_type == "post"])`);

    return NextResponse.json({
      success: true,
      count: count,
    });
  } catch (error) {
    console.error("Error counting blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to count blog" },
      { status: 500 }
    );
  }
}
