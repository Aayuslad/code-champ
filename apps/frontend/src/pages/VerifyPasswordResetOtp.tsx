import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { AuthStore } from "../stores/authStore";

export default function VerifyPasswordResetOtp() {
	const inputRef = useRef<(HTMLInputElement | null)[]>([]);
	const authStore = AuthStore();

	const formik = useFormik<{ otp: string[] }>({
		initialValues: {
			otp: new Array(6).fill(""),
		},
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: (values) => {
			console.log(values);
			authStore.verifyPasswordResetOtp({ otp: values.otp.join("") });
		},
	});

	// focus first field if it is empty
	useEffect(() => {
		if (inputRef.current[0] && !inputRef.current[0].value) inputRef.current[0].focus();
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
		// if it is number or space -> do not move
		if (isNaN(Number(e.target.value)) || e.target.value === " ") return;
		// adding values in formik
		formik.setFieldValue(`otp[${index}]`, e.target.value);
		// shifting focus on typing
		if (e.target.value && index < 5 && inputRef.current[index + 1]) inputRef.current[index + 1]?.focus();
	}

	// function to handle backspace
	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
		if (e.key === "Backspace" && !e.currentTarget.value && index > 0 && inputRef.current[index - 1]) {
			inputRef.current[index - 1]?.focus();
		}
	}

	return (
		<div className="VerifyPasswordResetOtp w-screen h-screen flex justify-center items-center">
			<form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
				<div className="inputs">
					<div className="input">
						{formik.values.otp.map((box, index) => {
							return (
								<input
									key={index}
									type="text"
									maxLength={1}
									className="border border-black w-10 h-10 px-2 mx-2"
									inputMode="numeric"
									onChange={(e) => handleChange(e, index)}
									ref={(input) => (inputRef.current[index] = input)}
									onKeyDown={(e) => handleKeyDown(e, index)}
									value={box}
								/>
							);
						})}
					</div>
				</div>

				<button className="border border-black" type="submit">
					Recover
				</button>

				<div className="form_footer text-center">
					<span>
						Can't get OTP ?{" "}
						<button className="link underline" onClick={() => console.log("resend otp")}>
							Resend
						</button>
					</span>
				</div>
			</form>
		</div>
	);
}
