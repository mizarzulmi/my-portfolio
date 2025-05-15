"use client";

import { useEffect } from "react";
import { apiClient } from "@/app/_utils/api-client";

export default function ViewTracker({ postId }) {
  useEffect(() => {
    const registerView = async () => {
      try {
        const response = await apiClient(`/api/blog/${postId}/views`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.success) {
          console.error("Failed to update views:", response.error);
        }
      } catch (error) {
        console.error("Error registering view:", error);
      }
    };

    // Gunakan setTimeout untuk debounce
    const timer = setTimeout(() => {
      registerView();
    }, 2000);

    return () => clearTimeout(timer);
  }, [postId]);

  return null;
}
