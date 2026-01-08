import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import "@/models/Tag";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const post = await BlogPost.findById(id)
      .populate("category", "name slug color")
      .populate("tags", "name slug");

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Post fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const allowedFields = [
      "title",
      "slug",
      "excerpt",
      "content",
      "featuredImage",
      "featuredImageAlt",
      "category",
      "tags",
      "status",
      "scheduledFor",
      "metaTitle",
      "metaDescription",
    ];

    const updateData: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === "scheduledFor" && body[field]) {
          updateData[field] = new Date(body[field]);
        } else if (field === "category" && !body[field]) {
          updateData[field] = undefined;
        } else {
          updateData[field] = body[field];
        }
      }
    }

    if (body.status === "published") {
      const existingPost = await BlogPost.findById(id);
      if (existingPost && existingPost.status !== "published") {
        updateData.publishedAt = new Date();
      }
    }

    if (body.slug) {
      const existingWithSlug = await BlogPost.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });
      if (existingWithSlug) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const post = await BlogPost.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate("category", "name slug color")
      .populate("tags", "name slug");

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Post update error:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Post delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
