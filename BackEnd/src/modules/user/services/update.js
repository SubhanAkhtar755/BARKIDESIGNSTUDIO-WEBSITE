import { updateData } from "../db/index.js";
import bcrypt from "bcrypt";

const UpdateService = async (id, updatedFields) => {
  try {
    if (updatedFields.password) {
      const saltRounds = 10;
      updatedFields.password = await bcrypt.hash(updatedFields.password, saltRounds);
    }

    const updatedUser = await updateData(id, updatedFields);
    if (!updatedUser) throw new Error("User not found or update failed");

    return updatedUser;
  } catch (error) {
    throw new Error("UpdateService Error: " + error.message);
  }
};

export default UpdateService;
