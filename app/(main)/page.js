// app/page.js
"use client";

import { useEffect, useState } from "react";
import ExperienceSection from "@/app/_components/sections/ExperienceSection";
import SummarySection from "@/app/_components/sections/SummarySection";
import { apiClient } from "@/app/_utils/api-client";
import LoadingSpinner from "@/app/_components/ui/LoadingSpinner";

export default function Home() {
  const [summaryData, setSummaryData] = useState(null);
  const [experienceData, setExperienceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data secara parallel
        const [summaryRes, experienceRes] = await Promise.all([
          apiClient("/api/data/summary"),
          apiClient("/api/data/experience"),
        ]);

        console.log("API Responses:", { summaryRes, experienceRes });

        // Handle summary data
        const receivedSummary = summaryRes.data || summaryRes;
        if (!receivedSummary?.name) {
          throw new Error("Invalid summary data structure");
        }
        setSummaryData(receivedSummary);

        // Handle experience data
        const receivedExperience = experienceRes.data || experienceRes;
        if (!Array.isArray(receivedExperience)) {
          throw new Error("Experience data should be an array");
        }
        setExperienceData(receivedExperience);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="space-y-16">
      <SummarySection data={summaryData} loading={loading} error={error} />
      <ExperienceSection
        data={experienceData}
        loading={loading}
        error={error}
      />
    </div>
  );
}
