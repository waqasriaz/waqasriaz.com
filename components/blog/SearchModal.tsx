"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import BlogLink from "./BlogLink";
import { useBlogLoading } from "@/contexts/BlogLoadingContext";

interface SearchResult {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: {
    name: string;
    color: string;
  };
  publishedAt: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { startLoading } = useBlogLoading();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          // Parent component handles opening
        }
      }

      // Close with Escape
      if (e.key === "Escape" && isOpen) {
        onClose();
      }

      // Navigate results
      if (isOpen && results.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        }
        if (e.key === "Enter" && results[selectedIndex]) {
          e.preventDefault();
          startLoading();
          router.push(`/blog/${results[selectedIndex].slug}`);
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, results, selectedIndex, router, startLoading]);

  // Search API call
  const searchPosts = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/blog/search?q=${encodeURIComponent(searchQuery)}&limit=5`);
      const data = await response.json();
      setResults(data.posts || []);
      setSelectedIndex(0);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchPosts(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchPosts]);

  if (!isOpen) return null;

  return (
    <div
      className="search-modal-overlay fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-start justify-center pt-[15vh] px-4">
        <div
          className="search-modal-content w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-slate-100">
            <svg
              className="w-6 h-6 text-slate-400 flex-shrink-0"
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
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <kbd className="hidden sm:flex items-center px-2 py-1 text-xs font-mono text-slate-400 bg-slate-100 rounded">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[50vh] overflow-y-auto">
            {isLoading ? (
              <div className="px-6 py-12 text-center">
                <div className="inline-flex items-center gap-2 text-slate-500">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Searching...
                </div>
              </div>
            ) : results.length > 0 ? (
              <ul className="py-2">
                {results.map((result, index) => (
                  <li key={result._id}>
                    <BlogLink
                      href={`/blog/${result.slug}`}
                      onClick={onClose}
                      className={`flex flex-col gap-1 px-6 py-4 transition-colors ${
                        index === selectedIndex
                          ? "bg-[#5b21b6]/5"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {result.category && (
                          <span className="text-xs font-medium text-[#5b21b6]">
                            {result.category.name}
                          </span>
                        )}
                      </div>
                      <span className="font-semibold text-slate-900 line-clamp-1">
                        {result.title}
                      </span>
                      <span className="text-sm text-slate-500 line-clamp-1">
                        {result.excerpt}
                      </span>
                    </BlogLink>
                  </li>
                ))}
              </ul>
            ) : query.trim() ? (
              <div className="px-6 py-12 text-center text-slate-500">
                No results found for &quot;{query}&quot;
              </div>
            ) : (
              <div className="px-6 py-12 text-center text-slate-400">
                <p>Start typing to search articles</p>
                <p className="text-sm mt-2">
                  Use <kbd className="px-1.5 py-0.5 text-xs bg-slate-100 rounded">↑</kbd>{" "}
                  <kbd className="px-1.5 py-0.5 text-xs bg-slate-100 rounded">↓</kbd> to navigate,{" "}
                  <kbd className="px-1.5 py-0.5 text-xs bg-slate-100 rounded">Enter</kbd> to select
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
