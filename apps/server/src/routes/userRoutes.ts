import { Router } from "express";
import {
	signupUser,
	verifySignupOTP,
	getUserProfile,
	signinUser,
	logoutUser,
	sendPasswordResetOTP,
	verifyPasswordResetOTP,
	updatePasswordAfterVerification,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { sessionMiddleware } from "../middlewares/sessionMiddleware";

const userRouter = Router();

userRouter.post("/signup", sessionMiddleware, signupUser);
userRouter.post("/verify-signup-otp", sessionMiddleware, verifySignupOTP);
userRouter.get("/profile", getUserProfile);
userRouter.post("/signin", signinUser);
userRouter.post("/logout", authMiddleware, logoutUser);
userRouter.post("/send-password-reset-otp", sessionMiddleware, sendPasswordResetOTP);
userRouter.post("/verify-password-reset-otp", sessionMiddleware, verifyPasswordResetOTP);
userRouter.post("/update-password", sessionMiddleware, updatePasswordAfterVerification);

export default userRouter;
