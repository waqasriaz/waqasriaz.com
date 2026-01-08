"use client";

import { useEffect, useState, useRef } from "react";
import { useBlogLoading } from "@/contexts/BlogLoadingContext";

export default function BlogLoadingBar() {
  const { isLoading } = useBlogLoading();
  const [progress, setProgress] = useState(0);
  const wasLoading = useRef(false);
  const loadingStartTime = useRef(0);

  useEffect(() => {
    if (isLoading) {
      wasLoading.current = true;
      loadingStartTime.current = Date.now();
      setProgress(0);
      // Animate progress 0 -> 90% over time
      const timer1 = setTimeout(() => setProgress(30), 100);
      const timer2 = setTimeout(() => setProgress(60), 300);
      const timer3 = setTimeout(() => setProgress(80), 600);
      const timer4 = setTimeout(() => setProgress(90), 1000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    } else if (wasLoading.current) {
      // Ensure minimum display duration of 300ms
      const elapsed = Date.now() - loadingStartTime.current;
      const minDuration = 300;
      const remainingTime = Math.max(0, minDuration - elapsed);

      const completeTimer = setTimeout(() => {
        wasLoading.current = false;
        setProgress(100);
        setTimeout(() => setProgress(0), 300);
      }, remainingTime);

      return () => clearTimeout(completeTimer);
    }
  }, [isLoading]);

  if (progress === 0 && !isLoading) return null;

  return (
    <div className="blog-loading-bar" aria-hidden="true">
      <div
        className="blog-loading-bar-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
