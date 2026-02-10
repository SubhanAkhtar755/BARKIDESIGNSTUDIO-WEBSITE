import Model from "../models/index.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const ResetPasswordService = async ({ email, token, newPassword }) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await Model.findOne({
    email,
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  }).select("+password");

  if (!user) throw new Error("Invalid or expired token");

  const saltRounds = 10;
  user.password = await bcrypt.hash(newPassword, saltRounds);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();

  return { message: "Password reset successful" };
};

export default ResetPasswordService;
