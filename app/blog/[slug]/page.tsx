import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { JsonLd } from "@/components/seo";
import SinglePostContent from "./SinglePostContent";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import Category from "@/models/Category";
import "@/models/Tag";

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
  content: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  categories?: CategoryData[];
  author: string;
  publishedAt: string;
  metaTitle?: string;
  metaDescription?: string;
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  categories?: CategoryData[];
  publishedAt: string;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    await connectDB();

    const post = await BlogPost.findOne({
      slug,
      status: "published",
      publishedAt: { $lte: new Date() },
    })
      .populate("categories", "name slug color")
      .lean();

    if (!post) return null;

    return {
      _id: post._id.toString(),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      featuredImageAlt: post.featuredImageAlt,
      author: post.author,
      publishedAt: post.publishedAt?.toISOString() || new Date().toISOString(),
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      categories: post.categories?.map((cat: { _id: { toString: () => string }; name: string; slug: string; color?: string }) => ({
        _id: cat._id.toString(),
        name: cat.name,
        slug: cat.slug,
        color: cat.color || "#5b21b6",
      })),
    };
  } catch (error) {
    console.error("Post fetch error:", error);
    return null;
  }
}

async function getRelatedPosts(currentSlug: string, categoryIds?: string[]): Promise<RelatedPost[]> {
  try {
    await connectDB();

    const query: Record<string, unknown> = {
      status: "published",
      slug: { $ne: currentSlug },
      publishedAt: { $lte: new Date() },
    };

    if (categoryIds && categoryIds.length > 0) {
      query.categories = { $in: categoryIds };
    }

    let posts = await BlogPost.find(query)
      .populate("categories", "name slug color")
      .sort({ publishedAt: -1 })
      .limit(3)
      .lean();

    // If not enough posts in categories, get recent posts
    if (posts.length < 3 && categoryIds && categoryIds.length > 0) {
      const additionalQuery: Record<string, unknown> = {
        status: "published",
        slug: { $ne: currentSlug },
        publishedAt: { $lte: new Date() },
        _id: { $nin: posts.map((p) => p._id) },
      };

      const additionalPosts = await BlogPost.find(additionalQuery)
        .populate("categories", "name slug color")
        .sort({ publishedAt: -1 })
        .limit(3 - posts.length)
        .lean();

      posts = [...posts, ...additionalPosts];
    }

    return posts.map((post) => ({
      _id: post._id.toString(),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      featuredImage: post.featuredImage,
      publishedAt: post.publishedAt?.toISOString() || new Date().toISOString(),
      categories: post.categories?.map((cat: { _id: { toString: () => string }; name: string; slug: string; color?: string }) => ({
        _id: cat._id.toString(),
        name: cat.name,
        slug: cat.slug,
        color: cat.color || "#5b21b6",
      })),
    }));
  } catch (error) {
    console.error("Related posts fetch error:", error);
    return [];
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.metaTitle || post.title} - Waqas Riaz`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const [categories, relatedPosts] = await Promise.all([
    getCategories(),
    getRelatedPosts(slug, post.categories?.map((c) => c._id)),
  ]);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://waqasriaz.com";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.featuredImage || `${baseUrl}/images/waqasriaz.jpeg`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Waqas Riaz",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/waqasriaz.jpeg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <Header />
      <SinglePostContent
        post={post}
        categories={categories}
        relatedPosts={relatedPosts}
      />
      <Footer />
    </>
  );
}
