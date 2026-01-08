import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  categories: mongoose.Types.ObjectId[];
  tags: mongoose.Types.ObjectId[];
  author: string;
  status: "draft" | "pending" | "scheduled" | "published";
  publishedAt?: Date;
  scheduledFor?: Date;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    featuredImage: { type: String, trim: true },
    featuredImageAlt: { type: String, trim: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    author: { type: String, default: "Waqas Riaz", trim: true },
    status: {
      type: String,
      enum: ["draft", "pending", "scheduled", "published"],
      default: "draft",
    },
    publishedAt: { type: Date },
    scheduledFor: { type: Date },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ status: 1, publishedAt: -1 });
BlogPostSchema.index({ categories: 1, status: 1 });
BlogPostSchema.index({ scheduledFor: 1, status: 1 });
BlogPostSchema.index({ tags: 1 });

if (process.env.NODE_ENV === "development" && mongoose.models.BlogPost) {
  delete mongoose.models.BlogPost;
}

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
