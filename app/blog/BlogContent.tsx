"use client";

import { useState, useEffect, Suspense } from "react";
import FilterBar from "@/components/blog/FilterBar";
import PostItem from "@/components/blog/PostItem";
import SearchModal from "@/components/blog/SearchModal";
import NewsletterSection from "@/components/blog/NewsletterSection";
import Pagination from "@/components/blog/Pagination";
import { useBlogLoading } from "@/contexts/BlogLoadingContext";

interface Category {
  _id: string;
  name: string;
  slug: string;
  color: string;
  postCount?: number;
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  featuredImage?: string;
  categories?: Category[];
  publishedAt: string;
  author: string;
}

interface BlogData {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface BlogContentProps {
  initialData: BlogData;
  categories: Category[];
  activeCategory?: string;
}

export default function BlogContent({
  initialData,
  categories,
  activeCategory,
}: BlogContentProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { stopLoading } = useBlogLoading();

  // Stop loading bar when navigation completes (activeCategory changes)
  useEffect(() => {
    stopLoading();
  }, [activeCategory, stopLoading]);

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { posts, pagination } = initialData;

  // Get the category name from slug
  const activeCategoryName = activeCategory
    ? categories.find((c) => c.slug === activeCategory)?.name || activeCategory
    : null;

  return (
    <>
      {/* Filter Bar */}
      <Suspense fallback={<FilterBarSkeleton />}>
        <FilterBar
          categories={categories}
          onSearchClick={() => setIsSearchOpen(true)}
        />
      </Suspense>

      {/* Posts Section */}
      <section className="bg-white pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Active Filter Indicator */}
          {activeCategoryName && (
            <div className="pt-6 text-sm text-slate-500">
              Showing posts in{" "}
              <span className="font-medium text-[#5b21b6]">{activeCategoryName}</span>
            </div>
          )}

          {/* Posts List */}
          {posts.length > 0 ? (
            <div className={`divide-y divide-slate-100 ${activeCategoryName ? "mt-2" : ""}`}>
              {posts.map((post, index) => (
                <div key={post._id} className="blog-stagger-item">
                  <PostItem post={post} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState activeCategory={activeCategory} />
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-12">
              <Suspense fallback={null}>
                <Pagination pagination={pagination} />
              </Suspense>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

function FilterBarSkeleton() {
  return (
    <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-20 bg-slate-100 rounded-full animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ activeCategory }: { activeCategory?: string }) {
  return (
    <div className="py-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-6">
        <svg
          className="w-8 h-8 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        {activeCategory ? "No posts in this category" : "No posts yet"}
      </h3>
      <p className="text-slate-500">
        {activeCategory
          ? "Try selecting a different category or check back later."
          : "Check back soon for new content!"}
      </p>
    </div>
  );
}
