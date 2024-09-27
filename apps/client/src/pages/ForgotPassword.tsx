import { useFormik } from "formik";
import { sendPasswordResetOTPShemaType } from "@repo/common/zod";
import { AuthStore } from "../stores/authStore";
import { Link } from "react-router-dom";
import AuthHeader from "../components/headers/AuthHeader";
import AuthFooter from "../components/footers/AuthFooter";

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
		<div className="Signin flex flex-col min-h-screen">
			<AuthHeader />

			<main className="flex-grow flex justify-center items-center bg-gradient-to-r from-amber-400 to-white  dark:bg-gradient-to-r  dark:from-dark300 dark:to-dark100">
          <div className="w-1/2  hidden md:flex flex-col items-center justify-center p-8  ">
            <div className="text-left text-3xl font-bold  dark:text-white pl-12">
              <p>Reset Your Password</p>
              <p>
                Please enter your email address to receive a password reset
                link. We'll help you get back on track!
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            {/* Add your form or content */}
            <form className="w-1/2 p-6 rounded  flex flex-col justify-center items-center " 
			 onSubmit={formik.handleSubmit}>
              <h2 className="text-2xl text-center mb-4 p-4  text-black dark:text-white ">
                If the account exists, we'll email you OTP to reset the
                password.
              </h2>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-60 m-2 p-1 border border-gray-300 rounded pl-2 text-[17px] dark:bg-transparent dark:text-gray-400
                dark:border-slate-700"
                {...formik.getFieldProps("email")}
              />
              <button
                type="submit"
                className="w-1/2 py-2 px-4 bg-slate-500 text-white rounded hover:bg-white hover:text-black text-md mt-3"
                disabled={authStore.buttonLoading}
              >
                {authStore.buttonLoading ? "Sending OTP..." : "Send OTP"}
              </button>

              <h4 className="m-2 p-2">
                {" "}
                Return to {""}
                <Link
                  to="/"
                  className="text-black underline dark:text-gray-500 text-bold"
                >
                  {" "}
                  Login{" "}
                </Link>
              </h4>
            </form>
          </div>
        </main>


			<AuthFooter />
		</div>
	);
}
