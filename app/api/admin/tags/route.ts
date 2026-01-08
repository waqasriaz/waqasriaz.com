import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tag from "@/models/Tag";
import BlogPost from "@/models/BlogPost";
import { z } from "zod";

const tagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
});

export async function GET() {
  try {
    await connectDB();

    const tags = await Tag.find().sort({ name: 1 });

    const tagsWithCounts = await Promise.all(
      tags.map(async (tag) => {
        const postCount = await BlogPost.countDocuments({
          tags: tag._id,
        });
        return {
          ...tag.toObject(),
          postCount,
        };
      })
    );

    return NextResponse.json({ tags: tagsWithCounts });
  } catch (error) {
    console.error("Tags fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const validated = tagSchema.parse(body);

    const existingTag = await Tag.findOne({ slug: validated.slug });
    if (existingTag) {
      return NextResponse.json(
        { error: "A tag with this slug already exists" },
        { status: 400 }
      );
    }

    const tag = await Tag.create(validated);
    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    console.error("Tag create error:", error);
    return NextResponse.json(
      { error: "Failed to create tag" },
      { status: 500 }
    );
  }
}
