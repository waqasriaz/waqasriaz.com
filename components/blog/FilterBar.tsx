"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Category {
  _id: string;
  name: string;
  slug: string;
  color: string;
  postCount?: number;
}

interface FilterBarProps {
  categories: Category[];
  onSearchClick: () => void;
}

const MAX_VISIBLE_CATEGORIES = 5;

export default function FilterBar({ categories, onSearchClick }: FilterBarProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Split categories into visible and overflow
  const visibleCategories = categories.slice(0, MAX_VISIBLE_CATEGORIES);
  const overflowCategories = categories.slice(MAX_VISIBLE_CATEGORIES);

  // Check if active category is in overflow
  const activeInOverflow = overflowCategories.some(c => c.slug === activeCategory);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMore(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buildCategoryUrl = (slug?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!slug || activeCategory === slug) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    params.delete("page");
    params.delete("search");
    const queryString = params.toString();
    return queryString ? `/blog?${queryString}` : "/blog";
  };

  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-3">
            <Link
              href={buildCategoryUrl()}
              className={`filter-pill px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                !activeCategory
                  ? "active bg-[#5b21b6] text-white"
                  : "text-slate-600 hover:text-white"
              }`}
            >
              All
            </Link>
            {visibleCategories.map((category) => (
              <Link
                key={category._id}
                href={buildCategoryUrl(category.slug)}
                className={`filter-pill px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category.slug
                    ? "active bg-[#5b21b6] text-white"
                    : "text-slate-600 hover:text-white"
                }`}
              >
                {category.name}
              </Link>
            ))}

            {/* More Dropdown */}
            {overflowCategories.length > 0 && (
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setShowMore(!showMore)}
                  className={`filter-pill px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    activeInOverflow
                      ? "active bg-[#5b21b6] text-white"
                      : "text-slate-600 hover:text-white"
                  }`}
                >
                  More ({overflowCategories.length})
                  <svg
                    className={`w-4 h-4 transition-transform ${showMore ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showMore && (
                  <div className="absolute top-full left-0 mt-2 py-2 bg-white rounded-xl shadow-lg border border-slate-100 min-w-[180px] z-50">
                    {overflowCategories.map((category) => (
                      <Link
                        key={category._id}
                        href={buildCategoryUrl(category.slug)}
                        onClick={() => setShowMore(false)}
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          activeCategory === category.slug
                            ? "bg-[#5b21b6]/10 text-[#5b21b6] font-medium"
                            : "text-slate-600 hover:bg-slate-50 hover:text-[#5b21b6]"
                        }`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-500 hover:text-[#5b21b6] rounded-full hover:bg-slate-100 transition-colors flex-shrink-0"
            aria-label="Search articles"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-slate-100 rounded">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
}
