"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { isScrolled } = useHeaderScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        id="header"
        className={`fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? "py-3 shadow-lg scrolled" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center group hover:opacity-80 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80 40"
                width="80"
                height="40"
              >
                <defs>
                  <linearGradient
                    id="codeGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" style={{ stopColor: "#6366f1" }} />
                    <stop offset="100%" style={{ stopColor: "#a855f7" }} />
                  </linearGradient>
                </defs>
                <text
                  x="0"
                  y="28"
                  fill="url(#codeGrad)"
                  fontFamily="Monaco, Consolas, monospace"
                  fontSize="20"
                  fontWeight="400"
                >
                  &lt;
                </text>
                <text
                  x="14"
                  y="28"
                  fill="#1a1a2e"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontSize="20"
                  fontWeight="800"
                >
                  WR
                </text>
                <text
                  x="48"
                  y="28"
                  fill="url(#codeGrad)"
                  fontFamily="Monaco, Consolas, monospace"
                  fontSize="20"
                  fontWeight="400"
                >
                  /&gt;
                </text>
              </svg>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-[#5b21b6]"
                      : "text-slate-600 hover:text-[#5b21b6]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="ml-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-2.5 bg-[#5b21b6] text-white text-sm font-semibold rounded-full shadow-lg shadow-[#c4b5fd] hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Get in Touch
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`menu-toggle flex md:hidden flex-col justify-center gap-[5px] w-8 h-8 bg-transparent border-none cursor-pointer p-1 ${
                isMobileMenuOpen ? "active" : ""
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="block w-full h-0.5 bg-slate-900 transition-transform" />
              <span className="block w-full h-0.5 bg-slate-900 transition-opacity" />
              <span className="block w-full h-0.5 bg-slate-900 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
        navLinks={navLinks}
      />
    </>
  );
}
