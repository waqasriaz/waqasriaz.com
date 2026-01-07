import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";
import HouzezApplication from "@/models/HouzezApplication";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalLeads,
      newLeads,
      totalApplications,
      newApplications,
      recentLeads,
      recentApplications,
    ] = await Promise.all([
      ContactSubmission.countDocuments(),
      ContactSubmission.countDocuments({ createdAt: { $gte: weekAgo } }),
      HouzezApplication.countDocuments(),
      HouzezApplication.countDocuments({ createdAt: { $gte: weekAgo } }),
      ContactSubmission.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email status createdAt"),
      HouzezApplication.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("fullName email serviceType status createdAt"),
    ]);

    return NextResponse.json({
      stats: {
        totalLeads,
        newLeads,
        totalApplications,
        newApplications,
      },
      recentLeads,
      recentApplications,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
