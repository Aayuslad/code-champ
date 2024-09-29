import { useFormik } from "formik";
import { UpdatePasswordSchemaType } from "@repo/common/zod";
import { AuthStore } from "../stores/authStore";

export default function PasswordReset() {
	const authStore = AuthStore();

	const formik = useFormik<UpdatePasswordSchemaType>({
		initialValues: {
			password: "",
			confirmPassword: "",
		},
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: (values) => {
			console.log(values);
			authStore.updatePassword(values);
		},
	});

	return (
		<div className="Signin w-screen h-screen flex justify-center items-center">
			<form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
				<input
					type="password"
					className="border border-black"
					placeholder="new password"
					{...formik.getFieldProps("password")}
				/>
				<input
					type="password"
					className="border border-black"
					placeholder="confirm new password"
					{...formik.getFieldProps("confirmPassword")}
				/>
				<button type="submit" className="border border-black" disabled={authStore.buttonLoading}>
					{authStore.buttonLoading ? "Processing..." : "Reset Password"}
				</button>
			</form>
		</div>
	);
}
