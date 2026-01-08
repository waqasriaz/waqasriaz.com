import mongoose, { Schema, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  slug: string;
  createdAt: Date;
}

const TagSchema = new Schema<ITag>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

TagSchema.index({ name: 1 });

if (process.env.NODE_ENV === "development" && mongoose.models.Tag) {
  delete mongoose.models.Tag;
}

export default mongoose.models.Tag || mongoose.model<ITag>("Tag", TagSchema);
