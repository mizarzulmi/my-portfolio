"use client";

import { PortableText } from "@portabletext/react";
import { PortableTextComponents } from "@/app/_components/ui/PortableText";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  Download,
  BookOpen,
  Award,
  CalendarDays,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import Button from "@/app/_components/ui/Button";
import { apiClient } from "@/app/_utils/api-client";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/_components/ui/LoadingSpinner";
import SocialIcon from "@/app/_components/ui/SocialIcon";

export default function AboutPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient("/api/about");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError(err.message || "Failed to load about data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!data) return null;

  const { summary, education, certifications } = data;

  return (
    <div className="space-y-12">
      {/* Hero Section*/}
      <section className="w-full max-w-3xl mx-auto">
        <div className="space-y-6">
          {/* Name/Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {summary.greeting || "Hi, I'm"} {summary.name}
          </motion.h1>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            {summary.shortBio}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="adaptive" href="/contact">
              <MessageSquare className="w-4 h-4" />
              Contact me
            </Button>

            {summary.resumeUrl && (
              <Button
                href={summary.resumeUrl}
                target="_blank"
                variant="secondary"
                className="flex items-center gap-2"
                download="CV-MizarZulmiRamadhan.pdf"
              >
                <Download className="w-4 h-4" />
                Download CV
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Detailed Bio Section - Updated to use summary.detailedBio */}
      {summary.detailedBio && (
        <section className="space-y-6 pt-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Biography
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose dark:prose-invert max-w-none"
          >
            <PortableText
              value={summary.detailedBio}
              components={PortableTextComponents}
            />
          </motion.div>
        </section>
      )}

      {/* Skills Section - Updated to use summary.skills */}
      {summary.skills?.length > 0 && (
        <section className="space-y-6 pt-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Skills & Technologies
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {summary.skills.map((skill) => (
              <motion.div
                key={skill._id}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 rounded border border-gray-200 dark:border-gray-700 px-2 py-1 transition-colors"
              >
                {skill.icon && (
                  <img
                    src={skill.icon}
                    alt={skill.title}
                    loading="lazy"
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 object-contain flex-shrink-0"
                  />
                )}
                <span>{skill.title}</span>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section - No changes needed */}
      {education?.length > 0 && (
        <section className="space-y-6 pt-2">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <BookOpen className="w-5 h-5" />
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <motion.div
                key={edu._id}
                className="pb-6 hover:border-b hover:border-gray-200 dark:hover:border-gray-800"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="flex items-center gap-4">
                  {edu.logo && (
                    <img
                      src={edu.logo}
                      alt={edu.logoAlt || `${edu.institution} logo`}
                      width={64}
                      height={64}
                      className="rounded-md object-cover w-16 h-16 border border-gray-200 dark:border-gray-700"
                    />
                  )}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-0">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white !leading-5">
                        {edu.degree}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm opacity-50 !leading-5">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="sm:text-right mt-1 sm:mt-0">
                      <p className="text-gray-900 dark:text-white !leading-5">
                        {edu.period}
                      </p>
                      {edu.description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm opacity-50 !leading-5 line-clamp-1">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certifications?.length > 0 && (
        <section className="space-y-6 pt-2 pb-10">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <Award className="w-5 h-5" />
            Certifications
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert._id}
                whileHover={{ y: -2 }}
                className="flex flex-col gap-3 rounded-lg border bg-card text-card border-custom p-4 group relative transition-all duration-200 hover:shadow-sm backdrop-blur-sm hover:bg-gray-100/50 dark:hover:bg-neutral-800/50"
              >
                <div className="flex items-center gap-3">
                  {cert.logo && (
                    <div className="min-w-[60px] h-[50px] flex items-center">
                      {" "}
                      {/* Wider container */}
                      <img
                        src={cert.logo}
                        alt={cert.logoAlt || `${cert.issuer} logo`}
                        className="max-w-full max-h-full object-contain"
                        style={{
                          width: "auto",
                          height: "auto",
                        }} /* Let logo determine its own size */
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-medium text-gray-800 dark:text-white">
                      {cert.title}
                    </h3>
                    <p className="text-gray-600 dark:text-muted-foreground text-sm">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <CalendarDays className="h-4 w-4" />
                  {new Date(cert.completionDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {cert.credentialId && (
                    <span className="ml-2 text-xs px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600">
                      ID: {cert.credentialId}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex gap-3">
                  {cert.certificateFile && (
                    <a
                      href={cert.certificateFile}
                      target="_blank"
                      download
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Certificate
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}
    </div>
  );
}
