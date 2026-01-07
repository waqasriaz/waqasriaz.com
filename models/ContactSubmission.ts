import mongoose, { Schema, Document } from "mongoose";

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  whatsapp?: string;
  service?: string;
  budget?: string;
  message: string;
  createdAt: Date;
  status: "new" | "read" | "replied";
  emailSent: boolean;
  notes?: string;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  whatsapp: { type: String, trim: true },
  service: { type: String, trim: true },
  budget: { type: String, trim: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["new", "read", "replied"], default: "new" },
  emailSent: { type: Boolean, default: false },
  notes: { type: String },
});

ContactSubmissionSchema.index({ email: 1 });
ContactSubmissionSchema.index({ status: 1, createdAt: -1 });

// Delete cached model to ensure schema changes are picked up in development
if (process.env.NODE_ENV === "development" && mongoose.models.ContactSubmission) {
  delete mongoose.models.ContactSubmission;
}

export default mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);
