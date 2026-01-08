import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import Tag from "@/models/Tag";
import BlogPost from "@/models/BlogPost";

export async function GET() {
  try {
    await connectDB();

    const publishedQuery = {
      status: "published",
      publishedAt: { $lte: new Date() },
    };

    // Get all categories
    const categories = await Category.find().sort({ name: 1 });

    // Get post counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const postCount = await BlogPost.countDocuments({
          ...publishedQuery,
          category: category._id,
        });
        return {
          _id: category._id.toString(),
          name: category.name,
          slug: category.slug,
          color: category.color,
          postCount,
        };
      })
    );

    // Get all tags
    const tags = await Tag.find();

    // Get post counts for each tag
    const tagsWithCounts = await Promise.all(
      tags.map(async (tag) => {
        const postCount = await BlogPost.countDocuments({
          ...publishedQuery,
          tags: tag._id,
        });
        return {
          _id: tag._id.toString(),
          name: tag.name,
          slug: tag.slug,
          postCount,
        };
      })
    );

    // Filter to only categories and tags with posts, sort tags by popularity
    const activeCategories = categoriesWithCounts.filter(
      (cat) => cat.postCount > 0
    );
    const popularTags = tagsWithCounts
      .filter((tag) => tag.postCount > 0)
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 15);

    return NextResponse.json({
      categories: activeCategories,
      tags: popularTags,
    });
  } catch (error) {
    console.error("Sidebar data fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch sidebar data" },
      { status: 500 }
    );
  }
}
