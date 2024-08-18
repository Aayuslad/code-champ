import { useFormik } from "formik";
import { signinUserSchemaType } from "@repo/common/zod";
import { AuthStore } from "../stores/authStore";

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
				<button type="submit" className="border border-black">
					Signin
				</button>
			</form>
		</div>
	);
}
