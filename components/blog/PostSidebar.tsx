"use client";

import { useState } from "react";
import Link from "next/link";
import ShareButtons from "./ShareButtons";

interface Category {
  _id: string;
  name: string;
  slug: string;
  color: string;
  postCount?: number;
}

interface Post {
  title: string;
  slug: string;
  category?: {
    _id: string;
    name: string;
    slug: string;
    color: string;
  };
}

interface PostSidebarProps {
  categories: Category[];
  post: Post;
}

export default function PostSidebar({ categories, post }: PostSidebarProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    // Simulate API call - replace with actual newsletter integration
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    }, 1000);
  };

  const postUrl = typeof window !== "undefined"
    ? `${window.location.origin}/blog/${post.slug}`
    : `/blog/${post.slug}`;

  return (
    <div className="sticky top-[100px] space-y-8">
      {/* Categories Section */}
      <div className="bg-slate-50 rounded-2xl p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
          Categories
        </h3>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category._id}>
              <Link
                href={`/blog?category=${category.slug}`}
                className={`flex items-center justify-between text-sm group ${
                  post.category?.slug === category.slug
                    ? "text-[#5b21b6] font-medium"
                    : "text-slate-600 hover:text-[#5b21b6]"
                } transition-colors`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color || "#5b21b6" }}
                  />
                  {category.name}
                </span>
                <span className="text-slate-400 group-hover:text-[#5b21b6] transition-colors">
                  {category.postCount ?? 0}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-br from-[#5b21b6]/5 to-[#c4b5fd]/10 rounded-2xl p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Newsletter
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          Get notified about new posts
        </p>

        {status === "success" ? (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5b21b6]/20 focus:border-[#5b21b6] transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-4 py-2.5 text-sm bg-[#5b21b6] text-white font-medium rounded-xl hover:bg-[#4c1d95] transition-colors disabled:opacity-70"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>

      {/* Share Section */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
          Share
        </h3>
        <ShareButtons title={post.title} url={postUrl} />
      </div>
    </div>
  );
}
