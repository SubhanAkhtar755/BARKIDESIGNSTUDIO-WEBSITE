import Model from "../models/index.js";
import bcrypt from "bcrypt";
import generateAuthToken from "../../../utils/generateAuthToken.js";

const LoginService = async (email, password) => {
  const user = await Model.findOne({ email }).select("+password");
  if (!user) throw new Error("Email not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect password");

  const token = generateAuthToken(user._id);

  // hide password
  user.password = undefined;

  return { token, user };
};

export default LoginService;
