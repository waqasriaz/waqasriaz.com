"use client";

import { useState, useEffect, useCallback } from "react";

interface TypewriterOptions {
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDelay?: number;
  loop?: boolean;
}

export function useTypewriter(texts: string[], options: TypewriterOptions = {}) {
  const {
    typeSpeed = 80,
    deleteSpeed = 50,
    pauseDelay = 2000,
    loop = true,
  } = options;

  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const type = useCallback(() => {
    const currentText = texts[textIndex];

    if (isDeleting) {
      setDisplayText(currentText.substring(0, charIndex - 1));
      setCharIndex((prev) => prev - 1);
    } else {
      setDisplayText(currentText.substring(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);
    }
  }, [texts, textIndex, charIndex, isDeleting]);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDelay);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
      timeout = setTimeout(() => {}, 500);
    } else {
      const speed = isDeleting ? deleteSpeed : typeSpeed;
      timeout = setTimeout(type, speed);
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    isDeleting,
    textIndex,
    texts,
    typeSpeed,
    deleteSpeed,
    pauseDelay,
    type,
  ]);

  return { displayText };
}
