import ResetPasswordService from "../services/reset.js";

const ResetPasswordController = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    const result = await ResetPasswordService({ email, token, newPassword });
    res.status(200).json({ status: 200, message: result.message });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

export default ResetPasswordController;
