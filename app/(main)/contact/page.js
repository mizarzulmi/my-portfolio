"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SocialIcon from "@/app/_components/ui/SocialIcon";
import LoadingSpinner from "@/app/_components/ui/LoadingSpinner";

export default function ContactPage() {
  const [contactData, setContactData] = useState({
    title: "Contact me",
    description:
      "Feel free to reach out to me for any queries or collaborations.",
    socialLinks: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/contact");
        if (!response.ok) {
          throw new Error("Failed to fetch contact data");
        }
        const { data } = await response.json();
        if (data) {
          setContactData(data);
        }
      } catch (error) {
        console.error("Failed to fetch contact data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getUrl = (platform, value) => {
    switch (platform) {
      case "gmail":
        return `mailto:${value}?subject=Contact Request`;
      case "whatsapp":
        return `https://wa.me/${value.replace(/[^\d]/g, "")}?text=Hello`;
      case "linkedin":
        return `https://linkedin.com/in/${value}`;
      case "twitter":
        return `https://twitter.com/${value.replace("@", "")}`;
      case "instagram":
        const instaUser = value.replace(/^@|\/.*$/g, "");
        return `https://instagram.com/${instaUser}`;
      case "github":
        const githubUser = value.replace(/^@|\/.*$/g, "");
        return `https://github.com/${githubUser}`;
      default:
        return "#";
    }
  };

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
    <section>
      <div className="pb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 text-3xl font-bold tracking-wide text-primary"
        >
          {contactData.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-secondary-foreground/50"
        >
          {contactData.description}
        </motion.p>
      </div>

      <div className="rounded-xl text-card-foreground shadow-none">
        <div className="p-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {contactData.socialLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <a
                  href={link.url || getUrl(link.platform, link.value)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 items-center justify-start gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-left hover:bg-primary/5"
                >
                  <SocialIcon platform={link.platform} className="h-8 w-8" />
                  <div>
                    <div className="font-medium">{link.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {link.value}
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
