import { sanityClient } from "@/app/_utils/sanity.client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = `{
      "summary": *[_type == "summary"][0] {
        name,
        greeting,
        shortBio,
        detailedBio,
        "profileImage": profileImage.asset->url,
        "profileImageAlt": profileImage.alt,
        "resumeUrl": resume.asset->url,
        "skills": skills[]-> {
          _id,
          title,
          icon
        },
        socialLinks[] {
          platform,
          url,
          external
        }
      },
      "education": *[_type == "education"] | order(period desc) {
        degree,
        institution,
        period,
        "logo": logo.asset->url,
        "logoAlt": logo.alt,
        description,
        courses,
        "skills": skills[]-> {
          _id,
          title,
          slug
        }
      },
      "certifications": *[_type == "certification"] | order(completionDate desc) {
        title,
        issuer,
        credentialId,
        credentialUrl,
        "certificateFile": certificateFile.asset->url,
        instructor,
        completionDate,
        shortDescription,
        "logo": logo.asset->url,
        "logoAlt": logo.alt,
        "skills": skills[]-> {
          _id,
          title,
          slug
        }
      }
    }`;

    const data = await sanityClient.fetch(query);

    if (!data.summary) {
      return NextResponse.json(
        { success: false, error: "Summary data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        summary: data.summary,
        education: data.education,
        certifications: data.certifications,
      },
    });
  } catch (error) {
    console.error("Error fetching about data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch about data" },
      { status: 500 }
    );
  }
}
