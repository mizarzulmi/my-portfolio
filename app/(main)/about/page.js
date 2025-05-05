"use client";

import { useEffect, useState } from "react";
import AboutSection from "@/app/_components/sections/AboutSection";
import LoadingSpinner from "@/app/_components/ui/LoadingSpinner";
import { apiClient } from "@/app/_utils/api-client";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient("/api/data/about");
        setAboutData({
          shortBio: response.data.shortBio ?? "",
          profileImage: response.data.profileImage ?? "",
          bio: Array.isArray(response.data.bio) ? response.data.bio : [],
          skills: Array.isArray(response.data.skills)
            ? response.data.skills
            : [],
        });
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError("Gagal memuat data. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!aboutData) return null;

  return <AboutSection aboutData={aboutData} />;
}
