"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface MagneticTransform {
  x: number;
  y: number;
}

interface UseMagneticHoverOptions {
  strength?: number;
  ease?: number;
}

export function useMagneticHover(options: UseMagneticHoverOptions = {}) {
  const { strength = 0.15, ease = 0.1 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<MagneticTransform>({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);
  const targetRef = useRef<MagneticTransform>({ x: 0, y: 0 });
  const currentRef = useRef<MagneticTransform>({ x: 0, y: 0 });

  const animate = useCallback(() => {
    const dx = targetRef.current.x - currentRef.current.x;
    const dy = targetRef.current.y - currentRef.current.y;

    currentRef.current.x += dx * ease;
    currentRef.current.y += dy * ease;

    setTransform({
      x: currentRef.current.x,
      y: currentRef.current.y,
    });

    if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [ease]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      targetRef.current = {
        x: (e.clientX - centerX) * strength,
        y: (e.clientY - centerY) * strength,
      };

      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseLeave = () => {
      targetRef.current = { x: 0, y: 0 };
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [strength, animate]);

  return {
    ref,
    style: {
      transform: `translate(${transform.x}px, ${transform.y}px)`,
    },
  };
}
