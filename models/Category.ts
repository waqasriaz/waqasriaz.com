import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  createdAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, trim: true },
  color: { type: String, default: "#5b21b6", trim: true },
  createdAt: { type: Date, default: Date.now },
});

CategorySchema.index({ slug: 1 });
CategorySchema.index({ name: 1 });

if (process.env.NODE_ENV === "development" && mongoose.models.Category) {
  delete mongoose.models.Category;
}

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
