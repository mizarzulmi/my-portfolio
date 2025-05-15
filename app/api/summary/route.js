// app/api/data/summary/route.js

import summaryData from "@/data/summary.json";
import ApiResponse from "@/app/_utils/api-response";

export async function GET() {
  try {
    return ApiResponse.success({
      name: summaryData.name,
      greeting: summaryData.greeting,
      description: summaryData.description,
      profileImage: summaryData.profileImage,
      links: summaryData.links || [],
    });
  } catch (error) {
    return ApiResponse.serverError("Failed to load summary data");
  }
}
