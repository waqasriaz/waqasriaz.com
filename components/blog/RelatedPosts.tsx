import Link from "next/link";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  slug: string;
  color: string;
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category?: Category;
  publishedAt: string;
}

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          Related Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="related-post-card group bg-white rounded-2xl overflow-hidden"
            >
              {/* Image */}
              {post.featuredImage && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  {post.category && (
                    <>
                      <span
                        className="px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: post.category.color || "#5b21b6" }}
                      >
                        {post.category.name}
                      </span>
                      <span>•</span>
                    </>
                  )}
                  <span>{formatDate(post.publishedAt)}</span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-slate-900 group-hover:text-[#5b21b6] transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-500 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#5b21b6]">
                  <span>Read more</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
