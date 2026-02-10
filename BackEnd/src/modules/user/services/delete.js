import { deleteData } from "../db/index.js";

const deleteAccountService = async (userId) => {
  const deletedUser = await deleteData(userId);
  if (!deletedUser) throw new Error("User not found or already deleted");
  return deletedUser;
};

export default deleteAccountService;
