import { Resend } from "resend";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

interface ApplicationEmailData {
  to: string;
  subject: string;
  application: Record<string, unknown>;
  isConfirmation?: boolean;
}

export async function sendApplicationEmail(data: ApplicationEmailData) {
  const { to, subject, application, isConfirmation } = data;

  const html = isConfirmation
    ? generateConfirmationEmail(application)
    : generateAdminNotificationEmail(application);

  const resend = getResend();
  await resend.emails.send({
    from: process.env.FROM_EMAIL || "Waqas Riaz <noreply@waqasriaz.com>",
    to,
    subject,
    html,
  });
}

function generateAdminNotificationEmail(app: Record<string, unknown>): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #5b21b6;">New Houzez Application</h2>
      <hr style="border: 1px solid #e2e8f0;" />

      <h3 style="color: #334155;">Basic Information</h3>
      <p><strong>Name:</strong> ${app.fullName}</p>
      <p><strong>Email:</strong> ${app.email}</p>
      ${app.whatsapp ? `<p><strong>WhatsApp:</strong> ${app.whatsapp}</p>` : ""}
      ${app.company ? `<p><strong>Company:</strong> ${app.company}</p>` : ""}
      ${app.website ? `<p><strong>Website:</strong> ${app.website}</p>` : ""}

      <h3 style="color: #334155;">Project Details</h3>
      <p><strong>Using Houzez:</strong> ${app.usingHouzez}</p>
      <p><strong>Service Type:</strong> ${app.serviceType}</p>
      <p><strong>Target Market:</strong> ${app.targetMarket}</p>
      <p><strong>Timeline:</strong> ${app.timeline}</p>
      <p><strong>Budget:</strong> ${app.budget}</p>

      ${Array.isArray(app.features) && app.features.length > 0 ? `<p><strong>Features:</strong> ${app.features.join(", ")}</p>` : ""}

      <h3 style="color: #334155;">Problem Statement</h3>
      <p>${app.problem}</p>

      ${app.notes ? `<h3 style="color: #334155;">Additional Notes</h3><p>${app.notes}</p>` : ""}

      <hr style="border: 1px solid #e2e8f0;" />
      <p style="color: #64748b; font-size: 12px;">Received at: ${new Date().toISOString()}</p>
    </div>
  `;
}

function generateConfirmationEmail(app: Record<string, unknown>): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #5b21b6;">Thank You for Your Application</h2>

      <p>Hi ${app.fullName},</p>

      <p>I've received your application and will review it within 24-48 hours.</p>

      <p>Here's what happens next:</p>
      <ul>
        <li>I'll review your project requirements and determine if we're a good fit</li>
        <li>If we're aligned, you'll receive a link to schedule a 30-minute founder call</li>
        <li>On the call, we'll discuss your project in detail and I'll recommend the best approach</li>
      </ul>

      <p>In the meantime, feel free to explore:</p>
      <ul>
        <li><a href="https://houzez.co" style="color: #5b21b6;">Houzez Theme Documentation</a></li>
        <li><a href="https://waqasriaz.com/houzez" style="color: #5b21b6;">Consulting Packages</a></li>
      </ul>

      <p>Best regards,<br />
      <strong>Waqas Riaz</strong><br />
      Founder, Houzez</p>
    </div>
  `;
}

interface ContactEmailData {
  name: string;
  email: string;
  whatsapp?: string;
  service?: string;
  budget?: string;
  message: string;
}

const serviceLabels: Record<string, string> = {
  "web-development": "Web Development",
  "mobile-apps": "Mobile Apps (iOS & Android)",
  "wordpress": "WordPress Development",
  "consulting": "Technical Consulting",
  "other": "Other",
};

export async function sendContactEmail(data: ContactEmailData) {
  const adminEmail = process.env.ADMIN_EMAIL || "hello@waqasriaz.com";
  const resend = getResend();

  const serviceLabel = data.service ? serviceLabels[data.service] || data.service : null;

  // Send notification to admin
  await resend.emails.send({
    from: process.env.FROM_EMAIL || "Waqas Riaz <noreply@waqasriaz.com>",
    to: adminEmail,
    subject: `New Contact: ${serviceLabel || "General Inquiry"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #5b21b6;">New Contact Form Submission</h2>
        <hr style="border: 1px solid #e2e8f0;" />
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.whatsapp ? `<p><strong>WhatsApp:</strong> ${data.whatsapp}</p>` : ""}
        ${serviceLabel ? `<p><strong>Service:</strong> ${serviceLabel}</p>` : ""}
        ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ""}
        <h3 style="color: #334155;">Message</h3>
        <p>${data.message}</p>
        <hr style="border: 1px solid #e2e8f0;" />
        <p style="color: #64748b; font-size: 12px;">Received at: ${new Date().toISOString()}</p>
      </div>
    `,
  });
}
