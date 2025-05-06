// app/api/data/experience/route.js

import experienceData from "@/data/experience.json";
import ApiResponse from "@/app/_utils/api-response";

export async function GET() {
  try {
    if (!Array.isArray(experienceData)) {
      throw new Error("Invalid data structure: expected array");
    }

    return ApiResponse.success(
      experienceData.map((exp) => ({
        id: exp.id,
        company: exp.company,
        position: exp.position,
        period: exp.period,
        duration: exp.duration,
        description: exp.description,
        logo: exp.logo,
      })),
      { count: experienceData.length }
    );
  } catch (error) {
    return ApiResponse.serverError(
      error instanceof Error ? error.message : "Failed to load experience data"
    );
  }
}
