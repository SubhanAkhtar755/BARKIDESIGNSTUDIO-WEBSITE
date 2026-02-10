import Model from "../models/index.js";
import crypto from "crypto";
import sendResetEmail from "../../../utils/sendEmail.js";

const createResetToken = () => crypto.randomBytes(32).toString("hex");

const ForgotPasswordService = async (email) => {
  const user = await Model.findOne({ email });
  if (!user) return { message: "If account exists, reset email sent" };

  const resetToken = createResetToken();
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
  const subject = "Reset your password";
  const html = `<p>Click the link below to reset your password (valid 1 hour):</p>
                <p><a href="${resetUrl}">${resetUrl}</a></p>`;

  await sendResetEmail({ to: email, subject, html });

  return { message: "If account exists, reset email sent" };
};

export default ForgotPasswordService;
