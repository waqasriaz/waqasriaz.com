import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import "@/models/Category";
import "@/models/Tag";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!query.trim()) {
      return NextResponse.json({
        posts: [],
        pagination: { page: 1, limit, total: 0, totalPages: 0 },
      });
    }

    const searchQuery = {
      status: "published",
      publishedAt: { $lte: new Date() },
      $or: [
        { title: { $regex: query, $options: "i" } },
        { excerpt: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    };

    const [posts, total] = await Promise.all([
      BlogPost.find(searchQuery)
        .populate("categories", "name slug color")
        .populate("tags", "name slug")
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("-content"),
      BlogPost.countDocuments(searchQuery),
    ]);

    // Serialize dates for JSON response
    const serializedPosts = posts.map((post) => ({
      _id: post._id.toString(),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      featuredImage: post.featuredImage,
      featuredImageAlt: post.featuredImageAlt,
      category: post.category,
      tags: post.tags,
      author: post.author,
      publishedAt: post.publishedAt?.toISOString(),
    }));

    return NextResponse.json({
      posts: serializedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
