import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import HouzezApplication from "@/models/HouzezApplication";
import { sendApplicationEmail } from "@/lib/email";

const applicationSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    whatsapp: z.string().optional(),
    company: z.string().optional(),
    website: z.string().url().optional().or(z.literal("")),
    usingHouzez: z.enum(["yes", "no"]),
    serviceType: z.enum(["audit", "kickstart", "build", "advisory", "not-sure"]),
    targetMarket: z.enum([
      "uae",
      "ksa",
      "us",
      "eu",
      "uk",
      "canada",
      "australia",
      "other",
    ]),
    timeline: z.enum(["asap", "2-4-weeks", "1-2-months", "flexible"]),
    budget: z
      .enum([
        "750-1500",
        "1500-5000",
        "5000-10000",
        "10000-25000",
        "25000+",
      ])
      .optional(), // Budget is optional - only required for "not-sure"
    features: z.array(z.string()).optional(),
    otherFeature: z.string().optional(),
    problem: z.string().min(10, "Please describe your problem in more detail"),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      // Budget is required only when serviceType is "not-sure"
      if (data.serviceType === "not-sure" && !data.budget) {
        return false;
      }
      return true;
    },
    {
      message: "Budget is required when selecting 'Not sure - recommend for me'",
      path: ["budget"],
    }
  )
  .refine(
    (data) => {
      // Website is required when serviceType is "audit"
      if (data.serviceType === "audit" && (!data.website || data.website === "")) {
        return false;
      }
      return true;
    },
    {
      message: "Website URL is required for Site Audit",
      path: ["website"],
    }
  );

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = applicationSchema.parse(body);

    // Connect to database
    await connectDB();

    // Create application
    const application = await HouzezApplication.create({
      ...validatedData,
      status: "new",
      emailSent: false,
    });

    // Send email notifications
    const adminEmail = process.env.ADMIN_EMAIL || "hello@waqasriaz.com";

    try {
      // Send notification to admin
      await sendApplicationEmail({
        to: adminEmail,
        subject: `New Houzez Application from ${validatedData.fullName}`,
        application: application.toObject(),
        isConfirmation: false,
      });

      // Send confirmation to applicant
      await sendApplicationEmail({
        to: validatedData.email,
        subject: "Application Received - Waqas Riaz",
        application: application.toObject(),
        isConfirmation: true,
      });

      // Mark email as sent
      application.emailSent = true;
      await application.save();
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        id: application._id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    console.error("Application submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application",
      },
      { status: 500 }
    );
  }
}
