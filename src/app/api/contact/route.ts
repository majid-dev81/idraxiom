import { NextResponse } from "next/server";
import { Resend } from "resend";

// Sender address must be on a domain verified in the Resend dashboard.
// Override via env vars once the domain is verified, without needing a code change.
//
// NOTE: FROM and TO are intentionally different addresses. Some mail clients
// (e.g. Apple Mail) label a message "Note to Self" whenever the From and To
// headers are identical, which previously happened on every submission since
// both defaulted to contact@idraxiom.com — making real customer inquiries
// look like self-notes instead of new leads.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Idraxiom Website <noreply@idraxiom.com>";
const TO_EMAIL = process.env.RESEND_TO_EMAIL || "contact@idraxiom.com";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY is not set");
      return NextResponse.json(
        { success: false, message: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `📩 New contact form inquiry from ${name}`,
      text: `You have a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr>
          <h3>Message:</h3>
          <p style="white-space: pre-wrap; background-color: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Error sending email via Resend:", error);
      return NextResponse.json(
        { success: false, message: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
