"use client";

import Link from "next/link";
import { useBlogLoading } from "@/contexts/BlogLoadingContext";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  navLinks: { href: string; label: string }[];
}

export default function MobileNav({
  isOpen,
  onClose,
  pathname,
  navLinks,
}: MobileNavProps) {
  const { startLoading } = useBlogLoading();

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-6">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-6 w-10 h-10 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
        aria-label="Close menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => {
            if (link.href === "/blog") startLoading();
            onClose();
          }}
          className={`text-xl font-medium tracking-wider transition-colors ${
            pathname === link.href
              ? "text-[#5b21b6]"
              : "text-slate-600 hover:text-[#5b21b6]"
          }`}
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/contact"
        onClick={onClose}
        className="mt-4 inline-flex items-center px-8 py-4 bg-[#5b21b6] text-white font-semibold rounded-full"
      >
        Get in Touch
      </Link>
    </div>
  );
}
