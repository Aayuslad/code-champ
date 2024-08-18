import { Router } from "express";
import {
	signupUser,
	verifySignupOTP,
	fetchUserProfile,
	signinUser,
	signoutUser,
	sendPasswordResetOTP,
	verifyPasswordResetOTP,
	updatePassword,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { sessionMiddleware } from "../middlewares/sessionMiddleware";

const userRouter = Router();

userRouter.post("/signup", sessionMiddleware, signupUser);
userRouter.post("/signup/verify-otp", sessionMiddleware, verifySignupOTP);
userRouter.get("/profile", fetchUserProfile);
userRouter.post("/signin", signinUser);
userRouter.post("/signout", authMiddleware, signoutUser);
userRouter.post("/password-reset/send-otp", sessionMiddleware, sendPasswordResetOTP);
userRouter.post("/password-reset/verify-otp", sessionMiddleware, verifyPasswordResetOTP);
userRouter.post("/password-reset/update", sessionMiddleware, updatePassword);

export default userRouter;
