import { useFormik } from "formik";
import { signinUserSchemaType } from "@repo/common/zod";
import { AuthStore } from "../stores/authStore";
import { Link } from "react-router-dom";

export default function Signin() {
	const authStore = AuthStore();

	const formik = useFormik<signinUserSchemaType>({
		initialValues: {
			emailOrUsername: "",
			password: "",
		},
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: (values) => {
			console.log(values);
			authStore.signinUser(values);
		},
	});

	return (
		<div className="Signin w-screen h-screen flex justify-center items-center">
			<form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
				<h1 className="text-3xl text-center">Signin</h1>

				<input
					type="text"
					className="border border-black"
					placeholder="email or username"
					{...formik.getFieldProps("emailOrUsername")}
				/>

				<input
					type="password"
					className="border border-black"
					placeholder="password"
					{...formik.getFieldProps("password")}
				/>

				<div className="text-sm">
					Forgot password?{" "}
					<Link className="underline" to={"/forgot-password"}>
						Reset password
					</Link>
				</div>

				<button type="submit" className="border border-black" disabled={authStore.buttonLoading}>
					{authStore.buttonLoading ? "Signing in..." : "Sign in"}
				</button>

				<div>
					Do not have account?{" "}
					<Link to={"/signup"} className="underline">
						Signup
					</Link>
				</div>
			</form>
		</div>
	);
}
