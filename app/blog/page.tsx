import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import Category from "@/models/Category";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog - Waqas Riaz | Software Developer",
  description:
    "Insights on web development, WordPress, mobile apps, and software engineering from Waqas Riaz.",
};

interface CategoryData {
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
  categories?: CategoryData[];
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

async function getBlogPosts(
  page: number = 1,
  categorySlug?: string,
  search?: string
): Promise<BlogData> {
  try {
    await connectDB();

    const limit = 8;
    const query: Record<string, unknown> = {
      status: "published",
      publishedAt: { $lte: new Date() },
    };

    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug });
      if (category) {
        query.categories = category._id;
      }
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .populate("categories", "name slug color")
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      BlogPost.countDocuments(query),
    ]);

    const serializedPosts = posts.map((post) => ({
      _id: post._id.toString(),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      publishedAt: post.publishedAt?.toISOString() || new Date().toISOString(),
      author: post.author,
      categories: post.categories?.map((cat: { _id: { toString: () => string }; name: string; slug: string; color?: string }) => ({
        _id: cat._id.toString(),
        name: cat.name,
        slug: cat.slug,
        color: cat.color || "#5b21b6",
      })),
    }));

    return {
      posts: serializedPosts as Post[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Blog fetch error:", error);
    return { posts: [], pagination: { page: 1, limit: 8, total: 0, totalPages: 0 } };
  }
}

async function getCategories(): Promise<CategoryData[]> {
  try {
    await connectDB();

    const publishedQuery = {
      status: "published",
      publishedAt: { $lte: new Date() },
    };

    const categories = await Category.find().sort({ name: 1 }).lean();
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const postCount = await BlogPost.countDocuments({
          ...publishedQuery,
          categories: category._id,
        });
        return {
          _id: category._id.toString(),
          name: category.name,
          slug: category.slug,
          color: category.color || "#5b21b6",
          postCount,
        };
      })
    );

    return categoriesWithCounts.filter((c) => c.postCount > 0);
  } catch (error) {
    console.error("Categories fetch error:", error);
    return [];
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const category = params.category;
  const search = params.search;

  const [data, categories] = await Promise.all([
    getBlogPosts(page, category, search),
    getCategories(),
  ]);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section - Minimal Typography Focus */}
        <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="hero-animate hero-animate-1">
              <h1 className="text-6xl md:text-8xl font-bold text-slate-900 tracking-tight">
                Blog
                <span className="blog-title-underline w-20 md:w-32" />
              </h1>
            </div>
            <p className="hero-animate hero-animate-2 text-lg md:text-xl text-slate-500 mt-6 max-w-lg">
              Thoughts on web development, software engineering, and building great digital products.
            </p>
          </div>
        </section>

        {/* Blog Content - Client Component for Interactivity */}
        <BlogContent
          initialData={data}
          categories={categories}
          activeCategory={category}
        />
      </main>
      <Footer />
    </>
  );
}
