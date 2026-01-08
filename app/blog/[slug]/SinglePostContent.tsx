"use client";

import Image from "next/image";
import Link from "next/link";
import ReadingProgress from "@/components/blog/ReadingProgress";
import PostContent from "@/components/blog/PostContent";
import PostSidebar from "@/components/blog/PostSidebar";
import RelatedPosts from "@/components/blog/RelatedPosts";
import ShareButtons from "@/components/blog/ShareButtons";

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
  content: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  category?: Category;
  author: string;
  publishedAt: string;
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category?: Category;
  publishedAt: string;
}

interface SinglePostContentProps {
  post: Post;
  categories: Category[];
  relatedPosts: RelatedPost[];
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, "");
  const wordCount = textContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function SinglePostContent({
  post,
  categories,
  relatedPosts,
}: SinglePostContentProps) {
  const readTime = calculateReadTime(post.content);
  const postUrl = typeof window !== "undefined"
    ? `${window.location.origin}/blog/${post.slug}`
    : `/blog/${post.slug}`;

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress />

      <main>
        <article>
          {/* Hero Section - Minimalist */}
          <header className="pt-32 pb-8 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              {/* Back Link */}
              <Link
                href="/blog"
                className="hero-animate hero-animate-1 inline-flex items-center gap-2 text-[#5b21b6] font-medium mb-8 hover:gap-3 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                Back to Blog
              </Link>

              {/* Post Meta */}
              <div className="hero-animate hero-animate-2 flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-6">
                {post.category && (
                  <>
                    <Link
                      href={`/blog?category=${post.category.slug}`}
                      className="px-3 py-1 rounded-full text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: post.category.color || "#5b21b6" }}
                    >
                      {post.category.name}
                    </Link>
                    <span>•</span>
                  </>
                )}
                <span>{formatDate(post.publishedAt)}</span>
                <span>•</span>
                <span>{readTime} min read</span>
              </div>

              {/* Title with Gradient Underline */}
              <div className="hero-animate hero-animate-3">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  {post.title}
                </h1>
                <span className="blog-title-underline w-24 md:w-32" />
              </div>

              {/* Excerpt */}
              <p className="hero-animate hero-animate-4 text-xl text-slate-500 mt-6 max-w-2xl">
                {post.excerpt}
              </p>
            </div>
          </header>

          {/* Two-Column Layout */}
          <div className="max-w-6xl mx-auto px-6 pb-16">
            <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
              {/* Main Content */}
              <div className="min-w-0 overflow-hidden">
                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg mb-10">
                    <Image
                      src={post.featuredImage}
                      alt={post.featuredImageAlt || post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Post Content */}
                <div className="prose-container">
                  <PostContent content={post.content} />
                </div>

                {/* Author Section */}
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#5b21b6] to-[#c4b5fd] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {post.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{post.author}</p>
                      <p className="text-sm text-slate-500">Software Developer</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Share Buttons */}
                <div className="lg:hidden mt-8 pt-8 border-t border-slate-200">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                    Share this article
                  </h3>
                  <ShareButtons title={post.title} url={postUrl} />
                </div>
              </div>

              {/* Sidebar - Desktop Only */}
              <aside className="hidden lg:block">
                <PostSidebar categories={categories} post={post} />
              </aside>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />
      </main>
    </>
  );
}
