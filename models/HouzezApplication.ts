import mongoose, { Schema, Document } from "mongoose";

export interface IHouzezApplication extends Document {
  // Basic Information
  fullName: string;
  email: string;
  whatsapp?: string;
  company?: string;
  website?: string;

  // Project Details
  usingHouzez: "yes" | "no";
  serviceType: "audit" | "kickstart" | "build" | "advisory" | "not-sure";
  targetMarket:
    | "uae"
    | "ksa"
    | "us"
    | "eu"
    | "uk"
    | "canada"
    | "australia"
    | "other";
  timeline: "asap" | "2-4-weeks" | "1-2-months" | "flexible";

  // Budget
  budget?: "750-1500" | "1500-5000" | "5000-10000" | "10000-25000" | "25000+";

  // Features
  features: string[];
  otherFeature?: string;

  // Problem & Notes
  problem: string;
  notes?: string;

  // Metadata
  createdAt: Date;
  status:
    | "new"
    | "reviewing"
    | "qualified"
    | "call-scheduled"
    | "proposal-sent"
    | "closed";
  emailSent: boolean;
  adminNotes?: string;
}

const HouzezApplicationSchema = new Schema<IHouzezApplication>({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  whatsapp: { type: String, trim: true },
  company: { type: String, trim: true },
  website: { type: String, trim: true },

  usingHouzez: { type: String, enum: ["yes", "no"], required: true },
  serviceType: {
    type: String,
    enum: ["audit", "kickstart", "build", "advisory", "not-sure"],
    required: true,
  },
  targetMarket: {
    type: String,
    enum: ["uae", "ksa", "us", "eu", "uk", "canada", "australia", "other"],
    required: true,
  },
  timeline: {
    type: String,
    enum: ["asap", "2-4-weeks", "1-2-months", "flexible"],
    required: true,
  },

  budget: {
    type: String,
    enum: ["750-1500", "1500-5000", "5000-10000", "10000-25000", "25000+"],
  },

  features: [{ type: String }],
  otherFeature: { type: String, trim: true },

  problem: { type: String, required: true },
  notes: { type: String },

  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: [
      "new",
      "reviewing",
      "qualified",
      "call-scheduled",
      "proposal-sent",
      "closed",
    ],
    default: "new",
  },
  emailSent: { type: Boolean, default: false },
  adminNotes: { type: String },
});

HouzezApplicationSchema.index({ email: 1 });
HouzezApplicationSchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.HouzezApplication ||
  mongoose.model<IHouzezApplication>("HouzezApplication", HouzezApplicationSchema);
