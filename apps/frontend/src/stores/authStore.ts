import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import apiErrorHandler from "../helper/apiCallErrorHandler";

interface authStoreType {
	userProfile:
		| {
				userName: string;
				email: string;
		  }
		| [];

	signupUser: (values: { email: string; password: string; userName: string }) => Promise<void>;
	verifySignupOtp: (values: { otp: string }) => Promise<void>;
	fetchUserProfile: () => Promise<void>;
	signinUser: (values: { emailOrUsername: string; password: string }) => Promise<void>;
	signoutUser: () => Promise<void>;
	sendPasswordResetOtp: (values: { email: string }) => Promise<void>;
	verifyPasswordResetOtp: (values: { otp: string }) => Promise<void>;
	updatePassword: (values: { password: string }) => Promise<void>;
}

export const AuthStore = create<authStoreType>(() => ({
	userProfile: [],

	signupUser: async function (values) {
		try {
			const result = await axios.post("/user/signup", values);
			toast.success(result.data.message);
		} catch (error) {
			apiErrorHandler(error);
		}
	},

	verifySignupOtp: async function (values) {
		try {
			const result = await axios.post("/user/verify-signup-otp", values);
			toast.success(result.data.message);
		} catch (error) {
			apiErrorHandler(error);
		}
	},

	fetchUserProfile: async function () {
		try {
			const result = await axios.get("/user/profile");
			this.userProfile = result.data.userProfile;
		} catch (error) {
			apiErrorHandler(error);
		}
	},

	signinUser: async function (values) {
		try {
			const result = await axios.post("/user/signin", values);
			toast.success(result.data.message);
		} catch (error) {
			apiErrorHandler(error);
		}
	},

	signoutUser: async function () {
		try {
			const result = await axios.post("/user/logout");
			toast.success(result.data.message);
		} catch (error) {
			apiErrorHandler(error);
		}
	},

	sendPasswordResetOtp: async function (values) {
		try {
			const result = await axios.post("/user/send-password-reset-otp", values);
			toast.success(result.data.message);
		} catch (error) {
			apiErrorHandler(error);
		}
	},

	verifyPasswordResetOtp: async function (values) {
		try {
			const result = await axios.post("/user/verify-password-reset-otp", values);
			toast.success(result.data.message);
		} catch (error) {
			apiErrorHandler(error);
		}
	},

	updatePassword: async function (values) {
		try {
			const result = await axios.post("/user/update-password-after-verification", values);
			toast.success(result.data.message);
		} catch (error) {
			apiErrorHandler(error);
		}
	},
}));