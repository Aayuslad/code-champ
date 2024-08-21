import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import apiErrorHandler from "../helper/apiCallErrorHandler";
import navigateTo from "../helper/pageNavigator";

interface authStoreType {
	userProfile:
		| {
				id: string;
				email: string;
				userName: string;
		  }
		| undefined;
	buttonLoading: boolean;
	skeletonLoading: boolean;

	signupUser: (values?: { email: string; password: string; userName: string }) => Promise<void>;
	verifySignupOtp: (values: { otp: string }) => Promise<void>;
	fetchUserProfile: () => Promise<void>;
	signinUser: (values: { emailOrUsername: string; password: string }) => Promise<void>;
	signoutUser: () => Promise<void>;
	sendPasswordResetOtp: (values?: { email: string }) => Promise<void>;
	verifyPasswordResetOtp: (values: { otp: string }) => Promise<void>;
	updatePassword: (values: { password: string }) => Promise<void>;
}

export const AuthStore = create<authStoreType>((set) => ({
	userProfile: undefined,
	buttonLoading: false,
	skeletonLoading: false,

	signupUser: async function (values) {
		try {
			set({ buttonLoading: true });
			const result = await axios.post("/user/signup", values);
			toast.success(result.data.message);
			values && navigateTo("/verify-signup-otp");
		} catch (error) {
			apiErrorHandler(error);
		} finally {
			set({ buttonLoading: false });
		}
	},

	verifySignupOtp: async function (values) {
		try {
			set({ buttonLoading: true });
			const result = await axios.post("/user/signup/verify-otp", values);
			toast.success(result.data.message);
			navigateTo("/home");
		} catch (error) {
			apiErrorHandler(error);
		} finally {
			set({ buttonLoading: false });
		}
	},

	fetchUserProfile: async function () {
		try {
			set({ skeletonLoading: true });
			const result = await axios.get("/user/profile");
			set({ userProfile: result.data });
		} catch (error) {
			apiErrorHandler(error);
		} finally {
			set({ skeletonLoading: false });
		}
	},

	signinUser: async function (values) {
		try {
			set({ buttonLoading: true });
			const result = await axios.post("/user/signin", values);
			toast.success(result.data.message);
			navigateTo("/home");
		} catch (error) {
			apiErrorHandler(error);
		} finally {
			set({ buttonLoading: false });
		}
	},

	signoutUser: async function () {
		try {
			set({ buttonLoading: true });
			const result = await axios.post("/user/signout");
			toast.success(result.data.message);
			navigateTo("/signin");
		} catch (error) {
			apiErrorHandler(error);
		} finally {
			set({ buttonLoading: false });
		}
	},

	sendPasswordResetOtp: async function (values) {
		try {
			set({ buttonLoading: true });
			const result = await axios.post("/user/password-reset/send-otp", values);
			toast.success(result.data.message);
			values && navigateTo("/verify-password-reset-otp");
		} catch (error) {
			apiErrorHandler(error);
		} finally {
			set({ buttonLoading: false });
		}
	},

	verifyPasswordResetOtp: async function (values) {
		try {
			set({ buttonLoading: true });
			const result = await axios.post("/user/password-reset/verify-otp", values);
			toast.success(result.data.message);
			navigateTo("/password-reset");
		} catch (error) {
			apiErrorHandler(error);
		} finally {
			set({ buttonLoading: false });
		}
	},

	updatePassword: async function (values) {
		try {
			set({ buttonLoading: true });
			const result = await axios.post("/user/password-reset/update", values);
			toast.success(result.data.message);
			navigateTo("/signin");
		} catch (error) {
			apiErrorHandler(error);
		} finally {
			set({ buttonLoading: false });
		}
	},
}));
