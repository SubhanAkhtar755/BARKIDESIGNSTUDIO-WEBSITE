import RegisterService from "../services/register.js";

const RegisterController = async (req, res) => {
  try {
    const data = req.body;
    const { token, user, message } = await RegisterService(data);

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ status: 200, message: message || "Registered", user, token });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

export default RegisterController;
