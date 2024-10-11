import { useFormik } from "formik";
import { SendPasswordResetOTPShemaType } from "@repo/common/zod";
import { AuthStore } from "../stores/authStore";
import { Link } from "react-router-dom";
import AuthHeader from "../components/headers/AuthHeader";
import AuthFooter from "../components/footers/AuthFooter";
import { forgotPasswordValidation } from "../helper/formValidator";

export default function Signin() {
    const authStore = AuthStore();

    const formik = useFormik<SendPasswordResetOTPShemaType>({
        initialValues: {
            email: "",
        },
        validateOnBlur: false,
        validateOnChange: false,
        validate: forgotPasswordValidation,
        onSubmit: values => {
            authStore.sendPasswordResetOtp({
                email: values.email.trim()
            });
        },
    });

    return (
        <div className="Signin flex flex-col min-h-screen">
            <AuthHeader />

            <main className="flex-grow flex justify-center items-center bg-gradient-to-r from-light300 to-white  dark:bg-gradient-to-r  dark:from-dark300 dark:to-dark100">
                <div className="w-1/2 flex-1  hidden md:flex flex-col items-center justify-center p-8  ">
                    <div className="text-left text-4xl font-bold  dark:text-white pl-12">
                        <p>Reset Your Password</p>
                        <p>Please enter your email address to receive a password reset link. We'll help you get back on track!</p>
                    </div>
                </div>

                <div className="flex-1 flex justify-center items-center">
                    {/* Add your form or content */}
                    <form
                        className="p-6 rounded w-1/2 flex gap-2 flex-col justify-center items-center "
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="pb-20">
                            <h2 className="font-medium w-[400px] text-gray-500 dark:text-gray-400 text-xl px-3 text-center">
                                If the account exists, we'll email you OTP to reset the password.
                            </h2>
                        </div>

                        <input
                            type="email"
                            required
                            placeholder="email"
                            className="w-full mb-6 p-1 px-3 border border-gray-300 rounded-lg text-[17px] dark:bg-transparent dark:text-gray-400 dark:border-slate-700 outline-none focus:ring-2 ring-offset-2 ring-zinc-300 dark:ring-zinc-800"
                            {...formik.getFieldProps("email")}
                        />
                        <button
                            type="submit"
                            className="w-[200px] py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-md mt-3"
                            disabled={authStore.buttonLoading}
                        >
                            {authStore.buttonLoading ? "Sending OTP..." : "Send OTP"}
                        </button>

                        <h4 className="text-gray-500 m-4 text-sm text-center dark:text-white">
                            Return to{" "}
                            <Link to="/signin" className="text-black underline dark:text-gray-500">
                                Sign in
                            </Link>
                        </h4>
                    </form>
                </div>
            </main>

            <AuthFooter />
        </div>
    );
}
