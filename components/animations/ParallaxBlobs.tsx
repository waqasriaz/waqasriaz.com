"use client";

import { useEffect, useState } from "react";

export default function ParallaxBlobs() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        setMousePosition({ x: mouseX, y: mouseY });
        rafId = null;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  const getTransform = (index: number) => {
    if (!isDesktop) return undefined;
    const speed = (index + 1) * 10;
    return `translate(${mousePosition.x * speed}px, ${mousePosition.y * speed}px)`;
  };

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="hero-blob hero-blob-1" style={{ transform: getTransform(0) }} />
      <div className="hero-blob hero-blob-2" style={{ transform: getTransform(1) }} />
      <div className="hero-blob hero-blob-3" style={{ transform: getTransform(2) }} />
      <div className="hero-grid" />
    </div>
  );
}
