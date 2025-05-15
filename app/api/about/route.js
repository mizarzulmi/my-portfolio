// app/api/data/about/route.js
import aboutData from "@/data/about.json";
import ApiResponse from "@/app/_utils/api-response";

export async function GET() {
  try {
    return ApiResponse.success({
      shortBio: aboutData.shortBio,
      profileImage: aboutData.profileImage,
      bio: aboutData.bio || [],
      skills: aboutData.skills || [],
    });
  } catch (error) {
    return ApiResponse.serverError("Failed to load about data");
  }
}
