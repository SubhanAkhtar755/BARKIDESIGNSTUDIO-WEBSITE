import { PostData } from "../db/index.js";
import bcrypt from "bcrypt";
import generateAuthToken from "../../../utils/generateAuthToken.js";

const RegisterService = async (data) => {
  try {
    // validate minimal fields (controllers may already validate)
    if (!data.email || !data.password || !data.name) {
      throw new Error("Name, email and password are required");
    }

    // hash password
    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);

    // save
    const savedUser = await PostData(data);

    const token = generateAuthToken(savedUser._id);

    return {
      message: "User registered successfully",
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt
      },
      token
    };
  } catch (error) {
    throw new Error("RegisterService Error: " + error.message);
  }
};

export default RegisterService;
