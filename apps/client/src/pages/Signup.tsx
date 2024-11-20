import { SignupUserSchemaType } from "@repo/common/zod";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import AuthFooter from "../components/footers/AuthFooter";
import AuthHeader from "../components/headers/AuthHeader";
import { sinUpValidation } from "../helper/formValidator";
import { AuthStore } from "../stores/authStore";
import { ContinueWithGoogleButton } from "../components/buttons/continueWithGoogleButton";
import { useState } from "react";

export default function Signup() {
    const authStore = AuthStore();
    const [name, setName] = useState({ firstName: "", lastName: "" });

    const formik = useFormik<SignupUserSchemaType>({
        initialValues: {
            email: "",
            name: `${name.firstName.trim()} ${name.lastName.trim()}`,
            userName: "",
            password: "",
        },
        validateOnBlur: false,
        validateOnChange: false,
        validate: sinUpValidation,
        onSubmit: values => {
            const trimmedValues = {
                email: values.email.trim(),
                name: values.email,
                userName: values.userName.trim(),
                password: values.password.trim(),
            };
            authStore.signupUser(trimmedValues);
        },
    });

    return (
        <div className="Signup flex flex-col min-h-screen">
            {/* Use the AuthHeader component */}
            <AuthHeader />

            {/* Main Content Area */}
            <main className="flex-grow flex bg-gradient-to-r from-light300 to-white dark:bg-gradient-to-r dark:from-dark300 dark:to-dark100">
                {/* Left-side content for desktop view */}
                <div className="w-1/2 hidden md:flex flex-col items-center justify-center p-8">
                    <div className="text-left text-4xl font-bold dark:text-white pl-12">
                        <p>
                            Create your account to unlock access to exclusive features and join our community. Start your journey
                            with us by Signing up.
                        </p>
                    </div>
                </div>

                {/* Form Area */}
                <div className="w-full flex flex-col justify-center items-center md:w-1/2 text-gray-500 dark:text-white text-xl">
                    <form className="flex flex-col p-4" onSubmit={formik.handleSubmit}>
                        <div className="pb-4">
                            <h2 className="font-medium text-gray-500 dark:text-gray-400 text-xl px-3 text-center">
                                Sign-up to create an account
                            </h2>
                        </div>

                        {/* Name */}
                        <div className="flex items-center justify-between gap-3 mb-1">
                            <div className="flex flex-col">
                                <label htmlFor="firstName" className="text-[18px] text-inerit p-2 dark:text-white pl-0">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    required
                                    className="w-[160px] mb-1 p-1 px-3 border border-gray-300 rounded-lg text-[17px] dark:bg-transparent dark:text-gray-400 dark:border-slate-700 outline-none focus:ring-2 ring-offset-2 ring-zinc-300 dark:ring-zinc-800"
                                    value={name.firstName}
                                    onChange={e => setName(prevState => ({ ...prevState, firstName: e.target.value }))}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="lastName" className="text-[18px] text-inerit p-2 dark:text-white pl-0">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    required
                                    className="w-[160px] mb-1 p-1 px-3 border border-gray-300 rounded-lg text-[17px] dark:bg-transparent dark:text-gray-400 dark:border-slate-700 outline-none focus:ring-2 ring-offset-2 ring-zinc-300 dark:ring-zinc-800"
                                    value={name.lastName}
                                    onChange={e => setName(prevState => ({ ...prevState, lastName: e.target.value }))}
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <label htmlFor="username" className="text-[18px] text-inerit p-2 dark:text-white pl-0">
                            Username
                        </label>
                        <input
                            id="userName"
                            type="text"
                            required
                            className="w-full mb-1 p-1 px-3 border border-gray-300 rounded-lg text-[17px] dark:bg-transparent dark:text-gray-400 dark:border-slate-700 outline-none focus:ring-2 ring-offset-2 ring-zinc-300 dark:ring-zinc-800"
                            {...formik.getFieldProps("userName")}
                        />

                        {/* Email */}
                        <label htmlFor="email" className="text-[18px] text-inerit p-2 dark:text-white pl-0">
                            Email
                        </label>
                        <input
                            required
                            type="email"
                            className="w-full mb-1 p-1 px-3 border border-gray-300 rounded-lg text-[17px] dark:bg-transparent dark:text-gray-400 dark:border-slate-700 outline-none focus:ring-2 ring-offset-2 ring-zinc-300 dark:ring-zinc-800"
                            {...formik.getFieldProps("email")}
                        />

                        {/* Password */}
                        <label htmlFor="password" className="text-[18px] text-inerit p-2 dark:text-white pl-0">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full mb-2 p-1 px-3 border border-gray-300 rounded-lg text-[17px] dark:bg-transparent dark:text-gray-400 dark:border-slate-700 outline-none focus:ring-2 ring-offset-2 ring-zinc-300 dark:ring-zinc-800"
                            {...formik.getFieldProps("password")}
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-md mt-3"
                            disabled={authStore.buttonLoading}
                        >
                            {authStore.buttonLoading ? "Sending OTP..." : "Sign up"}
                        </button>

                        {/* Sign In Link */}
                        <h4 className="text-gray-500 m-4 text-sm text-center dark:text-white">
                            Already have an account?{" "}
                            <Link to="/signin" className="text-inerit underline dark:text-gray-500">
                                Sign in
                            </Link>
                        </h4>

                        <div className="text-center text-sm pb-3">OR</div>

                        <ContinueWithGoogleButton />
                    </form>
                </div>
            </main>

            {/* Use the AuthFooter component */}
            <AuthFooter />
        </div>
    );
}
