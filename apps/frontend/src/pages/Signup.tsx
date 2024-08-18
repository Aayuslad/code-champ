import { useFormik } from "formik";
import { signupUserSchemaType } from "@repo/common/zod";
import { AuthStore } from "../stores/authStore";

export default function Signup() {
	const authStore = AuthStore();

	const formik = useFormik<signupUserSchemaType>({
		initialValues: {
			email: "",
			userName: "",
			password: "",
		},
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: (values) => {
			console.log(values);
			authStore.signupUser(values);
		},
	});

	return (
		<div className="Signup w-screen h-screen flex justify-center items-center">
			<form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
				<input type="email" className="border border-black" placeholder="email" {...formik.getFieldProps("email")} />
				<input
					type="text"
					className="border border-black"
					placeholder="user name"
					{...formik.getFieldProps("userName")}
				/>
				<input
					type="password"
					className="border border-black"
					placeholder="password"
					{...formik.getFieldProps("password")}
				/>
				<button type="submit" className="border border-black">
					Signup
				</button>
			</form>
		</div>
	);
}
