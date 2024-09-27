import { useFormik } from "formik";
import { signupUserSchemaType } from "@repo/common/zod";
import { AuthStore } from "../stores/authStore";
import { Link } from "react-router-dom";
import AuthHeader from "../components/headers/AuthHeader";
import AuthFooter from "../components/footers/AuthFooter";

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
    <div className="Signup flex flex-col min-h-screen">
      {/* Use the AuthHeader component */}
      <AuthHeader />

      {/* Main Content Area */}
      <main className="flex-grow flex bg-gradient-to-r from-amber-400 to-white dark:bg-gradient-to-r dark:from-dark300 dark:to-dark100">
        {/* Left-side content for desktop view */}
        <div className="w-1/2 hidden md:flex flex-col items-center justify-center p-8">
          <div className="text-left text-3xl font-bold dark:text-white pl-12">
            <p>
              Create your account to unlock access to exclusive features and
              join our community. Start your journey with us by Signing up.
            </p>
          </div>
        </div>

        {/* Form Area */}
        <div className="w-full flex flex-col justify-center items-center md:w-1/2 text-gray-500 dark:text-white text-xl">
          <form className="flex flex-col p-4" onSubmit={formik.handleSubmit}>
            <div className="pb-4">
              <h2 className="font-medium text-gray-500 dark:text-white text-xl px-3 text-center">
                Sign-up to create an account
              </h2>
            </div>

            {/* Username */}
            <label
              htmlFor="username"
              className="text-[18px] text-black p-2 dark:text-white pl-0"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-1 p-1 border border-gray-300 rounded pl-2 text-[17px] dark:bg-transparent dark:text-gray-400 dark:border-slate-700"
              {...formik.getFieldProps("userName")}
            />

            {/* Email */}
            <label
              htmlFor="email"
              className="text-[18px] text-black p-2 dark:text-white pl-0"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-1 p-1 border border-gray-300 rounded pl-2 text-[17px] dark:bg-transparent dark:text-gray-400 dark:border-slate-700"
              {...formik.getFieldProps("email")}
            />

            {/* Password */}
            <label
              htmlFor="password"
              className="text-[18px] text-black p-2 dark:text-white pl-0"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-2 p-1 border border-gray-300 rounded pl-2 text-[17px] dark:bg-transparent dark:text-gray-400 dark:border-slate-700"
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
              <Link to="/" className="text-black underline dark:text-gray-500">
                Sign in
              </Link>
            </h4>
          </form>
        </div>
      </main>

      {/* Use the AuthFooter component */}
      <AuthFooter />
    </div>
  );
}
