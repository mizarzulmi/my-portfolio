"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Button from "@/app/_components/ui/Button";

export default function AboutSection({ aboutData }) {
  return (
    <section className="space-y-8">
      {/* Hero Section */}
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            About Me
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            {aboutData.shortBio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              href="/contact"
              variant="primary"
              className="flex items-center gap-2"
            >
              Contact me
            </Button>
            <Button
              href="/cv.pdf"
              variant="secondary"
              className="flex items-center gap-2"
              download
            >
              <Download className="w-4 h-4" />
              Download CV
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800"
        >
          <Image
            src={aboutData.profileImage}
            alt="Profile photo"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>

      {/* Detailed Bio */}
      <div className="space-y-6 pt-12">
        <h2 className="text-2xl font-bold">Biography</h2>
        <div className="prose dark:prose-invert max-w-none">
          {aboutData.bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-6 pt-12">
        <h2 className="text-2xl font-bold">Skills & Technologies</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {aboutData.skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                <Image
                  src={`/images/tech-icons/${skill.icon}`}
                  alt={skill.name}
                  width={24}
                  height={24}
                />
              </div>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
