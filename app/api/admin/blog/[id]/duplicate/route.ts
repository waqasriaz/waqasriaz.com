import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const originalPost = await BlogPost.findById(id);

    if (!originalPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Generate unique slug
    let newSlug = `${originalPost.slug}-copy`;
    let slugExists = await BlogPost.findOne({ slug: newSlug });
    let counter = 1;

    while (slugExists) {
      counter++;
      newSlug = `${originalPost.slug}-copy-${counter}`;
      slugExists = await BlogPost.findOne({ slug: newSlug });
    }

    // Create duplicate post
    const duplicatePost = new BlogPost({
      title: `${originalPost.title} (Copy)`,
      slug: newSlug,
      excerpt: originalPost.excerpt,
      content: originalPost.content,
      featuredImage: originalPost.featuredImage,
      featuredImageAlt: originalPost.featuredImageAlt,
      category: originalPost.category,
      tags: originalPost.tags,
      status: "draft", // Always create as draft
      metaTitle: originalPost.metaTitle,
      metaDescription: originalPost.metaDescription,
    });

    await duplicatePost.save();

    return NextResponse.json({
      success: true,
      post: duplicatePost,
    });
  } catch (error) {
    console.error("Post duplicate error:", error);
    return NextResponse.json(
      { error: "Failed to duplicate post" },
      { status: 500 }
    );
  }
}
