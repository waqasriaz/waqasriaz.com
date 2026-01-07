"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

interface TypewriterProps {
  texts: string[];
  className?: string;
}

export default function Typewriter({ texts, className = "" }: TypewriterProps) {
  const { displayText } = useTypewriter(texts);

  return (
    <span className={className}>
      <span>{displayText}</span>
      <span className="typewriter-cursor" />
    </span>
  );
}
