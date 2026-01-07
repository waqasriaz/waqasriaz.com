import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";
import { sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  whatsapp: z.string().optional(),
  service: z
    .enum(["web-development", "mobile-apps", "wordpress", "consulting", "other"])
    .optional()
    .or(z.literal("")),
  budget: z
    .enum(["1000-5000", "5000-10000", "10000-25000", "25000+"])
    .optional()
    .or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Connect to database
    await connectDB();

    // Create contact submission
    const submission = await ContactSubmission.create({
      ...validatedData,
      status: "new",
      emailSent: false,
    });

    // Send email notification
    try {
      await sendContactEmail(validatedData);

      // Mark email as sent
      submission.emailSent = true;
      await submission.save();
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        id: submission._id,
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

    console.error("Contact submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message",
        // Include error details in development for debugging
        ...(process.env.NODE_ENV === "development" && {
          error: error instanceof Error ? error.message : String(error),
        }),
      },
      { status: 500 }
    );
  }
}
