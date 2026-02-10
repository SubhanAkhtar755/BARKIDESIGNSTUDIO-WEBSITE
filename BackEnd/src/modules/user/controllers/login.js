import LoginService from "../services/login.js";

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await LoginService(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ status: 200, message: "Login successful", user, token });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

export default LoginController;
