import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // محاولة أولى: 465 (SSL)
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.sa",
      port: 465,
      secure: true,
      auth: {
        user: "contact@idraxiom.com",
        pass: process.env.ZOHO_APP_PASSWORD,
      },
    });

    try {
      await transporter.verify();
      console.log("✅ Connected via port 465 (SSL)");
    } catch (err) {
      console.warn("⚠️ Port 465 failed, retrying on 587 (TLS)...");

      // محاولة ثانية: 587 (TLS)
      transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "contact@idraxiom.com",
          pass: process.env.ZOHO_APP_PASSWORD,
        },
      });

      await transporter.verify();
      console.log("✅ Connected via port 587 (TLS)");
    }

    // خيارات الإيميل
    const mailOptions = {
      from: '"Idraxiom Website" <contact@idraxiom.com>',
      to: "contact@idraxiom.com",
      replyTo: email,
      subject: `New message from ${name}`,
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
    };

    await transporter.sendMail(mailOptions);

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