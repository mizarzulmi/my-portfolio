// app/_components/ui/ViewTracker.js
"use client";

import { useEffect } from "react";

export default function ViewTracker({ postId }) {
  useEffect(() => {
    console.log("[ViewTracker] Initialized for post:", postId);

    const trackView = async () => {
      try {
        // 1. Client-side check
        if (typeof window === "undefined") {
          console.log("[ViewTracker] Server-side execution skipped");
          return;
        }

        // 2. Session check
        const storageKey = `viewed_${postId}`;
        if (sessionStorage.getItem(storageKey)) {
          console.log("[ViewTracker] Already tracked in this session");
          return;
        }

        // 3. API call
        console.log("[ViewTracker] Calling API...");
        const response = await fetch(
          `/api/data/view-count?postId=${postId}`, // Sesuaikan path
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
          }
        );

        // 4. Response handling
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log("[ViewTracker] Success:", data);

        // 5. Mark as tracked
        sessionStorage.setItem(storageKey, "true");
      } catch (error) {
        console.error("[ViewTracker] Error:", error);
      }
    };

    trackView();
  }, [postId]);

  return null;
}
