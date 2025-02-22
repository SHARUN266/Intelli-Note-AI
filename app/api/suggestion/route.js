import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(req) {
  try {
    const { feedback, userEmail } = await req.json(); // Get data from request body

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: userEmail,
      to: process.env.EMAIL_USER,
      subject: "Feedback Received From Intelli-Note",
      replyTo: userEmail,
      html: `
        <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>New Feedback Received</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333; margin-bottom: 10px;">📩 New Feedback Received</h2>
    
    <p style="font-size: 16px; color: #555; margin: 5px 0;"><strong>From:</strong> ${userEmail}</p>
    
    <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #007BFF; margin-top: 10px;">
      <p style="font-size: 16px; color: #333; margin: 0;"><strong>Feedback:</strong></p>
      <p style="font-size: 14px; color: #555; margin: 5px 0;">${feedback}</p>
    </div>

    <p style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
      This email was generated automatically. Please do not reply.
    </p>
  </div>
</body>
</html>

      
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Feedback sent!",
      status: 200,
    });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({
      success: false,
      message: `Failed to send feedback:${error}`,
      status: 500,
    });
  }
}
