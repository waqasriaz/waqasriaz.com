"use client";

import Link from "next/link";

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
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
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
