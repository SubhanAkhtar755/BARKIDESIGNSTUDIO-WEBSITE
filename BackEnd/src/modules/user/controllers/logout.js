const LogoutController = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({ status: 200, message: "Logged out" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

export default LogoutController;
