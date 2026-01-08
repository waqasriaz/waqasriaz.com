import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tag from "@/models/Tag";
import BlogPost from "@/models/BlogPost";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const allowedFields = ["name", "slug"];
    const updateData: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (body.slug) {
      const existingWithSlug = await Tag.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });
      if (existingWithSlug) {
        return NextResponse.json(
          { error: "A tag with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const tag = await Tag.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!tag) {
      return NextResponse.json(
        { error: "Tag not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(tag);
  } catch (error) {
    console.error("Tag update error:", error);
    return NextResponse.json(
      { error: "Failed to update tag" },
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

    const postsWithTag = await BlogPost.countDocuments({ tags: id });
    if (postsWithTag > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete tag. ${postsWithTag} post(s) are using this tag.`,
        },
        { status: 400 }
      );
    }

    const tag = await Tag.findByIdAndDelete(id);

    if (!tag) {
      return NextResponse.json(
        { error: "Tag not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tag delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete tag" },
      { status: 500 }
    );
  }
}
