import { useFormik } from "formik";
import { sendPasswordResetOTPShemaType } from "@repo/common/zod";
import { AuthStore } from "../stores/authStore";

export default function Signin() {
	const authStore = AuthStore();

	const formik = useFormik<sendPasswordResetOTPShemaType>({
		initialValues: {
			email: "",
		},
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: (values) => {
			console.log(values);
			authStore.sendPasswordResetOtp(values);
		},
	});

	return (
		<div className="Signin w-screen h-screen flex justify-center items-center">
			<form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
				<h1 className="text-3xl">Forgot Password</h1>

				<input type="email" className="border border-black" placeholder="email" {...formik.getFieldProps("email")} />

				<button type="submit" className="border border-black" disabled={authStore.buttonLoading}>
					{authStore.buttonLoading ? "Sending OTP..." : "Send OTP"}
				</button>
			</form>
		</div>
	);
}
