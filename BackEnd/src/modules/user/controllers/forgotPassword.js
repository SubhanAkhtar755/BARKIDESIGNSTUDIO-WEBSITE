import ForgotPasswordService from "../services/forgot.js";

const ForgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await ForgotPasswordService(email);
    res.status(200).json({ status: 200, message: result.message });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

export default ForgotPasswordController;
