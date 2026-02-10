import { Router } from "express";

// Controllers
import RegisterController from "./controllers/register.js";
import LoginController from "./controllers/login.js";
import LogoutController from "./controllers/logout.js";
import { deleteAccountController } from "./controllers/delete.js";
import { updateAccountController } from "./controllers/update.js";
import GetUserProfileController from "./controllers/get.js";
import ForgotPasswordController from "./controllers/forgotPassword.js";
import ResetPasswordController from "./controllers/resetPassword.js";

// Middleware
import authMiddleware from "../../middlewares/auth.js";

const router = Router();

/* -----------------------  PUBLIC ROUTES (No Login Needed) ----------------------- */

// ✔ Register new user
router.post("/register", RegisterController);

// ✔ Login user
router.post("/login", LoginController);

// ✔ Forgot password (user enters email -> OTP or Reset Link sent)
router.post("/forgot-password", ForgotPasswordController);

// ✔ Reset password (user enters OTP or reset link token)
router.post("/reset-password", ResetPasswordController);


/* -----------------------  PRIVATE ROUTES (Login Required) ----------------------- */

// ✔ Logout (Requires login)
router.post("/logout", authMiddleware, LogoutController);

// ✔ Get logged-in user profile
router.get("/my-profile", authMiddleware, GetUserProfileController);

// ✔ Delete account
router.delete("/delete-account", authMiddleware, deleteAccountController);

// ✔ Update account
router.put("/update-account", authMiddleware, updateAccountController);




export default router;
