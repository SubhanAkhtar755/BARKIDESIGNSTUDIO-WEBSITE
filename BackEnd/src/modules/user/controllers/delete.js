import deleteAccountService from "../services/delete.js";

export const deleteAccountController = async (req, res) => {
  try {
    const userId = req.user.id;
    await deleteAccountService(userId);

    // clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Account deleted permanently" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
