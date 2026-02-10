import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendResetEmail = async ({ to, subject, html }) => {
  try {
    // SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: true, // ✅ logs
      debug: true,  // ✅ verbose debug
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Reset email sent:", info.response);
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw new Error("Email sending failed");
  }
};

export default sendResetEmail;
