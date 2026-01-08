"use client";

import Link from "next/link";
import Image from "next/image";
import { useMagneticHover } from "@/hooks";

interface Category {
  _id: string;
  name: string;
  slug: string;
  color: string;
}

interface PostItemProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content?: string;
    featuredImage?: string;
    category?: Category;
    publishedAt: string;
    author: string;
  };
  index: number;
}

export default function PostItem({ post, index }: PostItemProps) {
  const { ref, style } = useMagneticHover({ strength: 0.08 });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getReadingTime = () => {
    if (!post.content) return "5 min read";
    const wordsPerMinute = 200;
    const wordCount = post.content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const postNumber = String(index + 1).padStart(2, "0");

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article
        ref={ref}
        style={style}
        className="post-item relative py-10 md:py-12 pl-4 md:pl-20 pr-4 border-b border-slate-100 transition-colors hover:bg-slate-50/50"
      >
        {/* Large Editorial Number */}
        <span className="post-number absolute left-0 top-8 md:top-10 text-5xl md:text-6xl font-black text-[rgba(91,33,182,0.06)] select-none hidden md:block">
          {postNumber}
        </span>

        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.category && (
                <span className="text-sm font-medium text-[#5b21b6]">
                  {post.category.name}
                </span>
              )}
              <span className="text-sm text-slate-400">
                {formatDate(post.publishedAt)}
              </span>
              <span className="text-sm text-slate-400 hidden sm:inline">
                {getReadingTime()}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-[#5b21b6] transition-colors duration-300">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-slate-500 leading-relaxed line-clamp-2 md:line-clamp-3 mb-4">
              {post.excerpt}
            </p>

            {/* Read More */}
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 group-hover:text-[#5b21b6] transition-colors">
              Read article
              <svg
                className="w-4 h-4 post-arrow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>

          {/* Image - Reveals on Hover */}
          {post.featuredImage && (
            <div className="hidden lg:block w-[280px] h-[180px] flex-shrink-0 overflow-hidden rounded-xl">
              <div className="post-image-reveal relative w-full h-full">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
