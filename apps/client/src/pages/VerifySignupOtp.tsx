import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { AuthStore } from "../stores/authStore";
import AuthHeader from "../components/headers/AuthHeader";
import AuthFooter from "../components/footers/AuthFooter";

export default function VerifyPasswordResetOtp() {
    const inputRef = useRef<(HTMLInputElement | null)[]>([]);
    const authStore = AuthStore();
    const [timeLeft, setTimeLeft] = useState(60); // Timer state
    const [isResendEnabled, setIsResendEnabled] = useState(false); // Control resend OTP button

    const formik = useFormik<{ otp: string[] }>({
        initialValues: {
            otp: new Array(6).fill(""), // Array of 6 for OTP input
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: values => {
            console.log(values);
            authStore.verifyPasswordResetOtp({ otp: values.otp.join("") });
        },
    });

    // Focus first field if it is empty
    useEffect(() => {
        if (inputRef.current[0] && !inputRef.current[0].value) inputRef.current[0].focus();
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        // Validate input (only digits allowed)
        if (isNaN(Number(e.target.value)) || e.target.value === " ") return;
        formik.setFieldValue(`otp[${index}]`, e.target.value);
        // Move focus to the next input if typing is valid
        if (e.target.value && index < 5 && inputRef.current[index + 1]) inputRef.current[index + 1]?.focus();
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
        // Handle backspace and focus on previous input
        if (e.key === "Backspace" && !e.currentTarget.value && index > 0 && inputRef.current[index - 1]) {
            inputRef.current[index - 1]?.focus();
        }
    }

    // Countdown timer for resending OTP
    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1); // Decrease timeLeft every second
            }, 1000);

            return () => clearInterval(timerId); // Clear timer when the component is unmounted
        } else {
            setIsResendEnabled(true); // Enable the resend OTP button when timer hits zero
        }
    }, [timeLeft]);

    const handleResendOtp = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (isResendEnabled) {
            // Logic to resend OTP (trigger OTP resend action)
            authStore.sendPasswordResetOtp();
            setTimeLeft(60); // Reset the timer after resending OTP
            setIsResendEnabled(false); // Disable resend button until the timer reaches zero again
        }
    };

    return (
        <div className="VerifyPasswordResetOtp flex flex-col min-h-screen">
            <AuthHeader />
            <main className="flex-1 flex justify-center items-center bg-gradient-to-r from-light300 to-white dark:bg-gradient-to-r dark:from-dark300 dark:to-dark100">
                <div className="w-1/2 hidden md:flex flex-col items-center justify-center p-8">
                    <div className="text-left text-4xl font-bold dark:text-white pl-12">
                        <p>Verify Your Identity!</p>
                        <p>
                            Enter the One-Time Password (OTP) sent to your email or phone to continue. This helps us keep your
                            account secure.
                        </p>
                    </div>
                </div>

                <div className="flex-1 flex justify-center items-center">
                    <form className="flex flex-col justify-center items-center p-4 m-4 h-[400px]" onSubmit={formik.handleSubmit}>
                        <h2 className="text-lg text-center m-2 p-2 font-semibold text-gray-500">
                            6 digit OTP has been sent to your Email, <br /> enter otp to procced. check span if not found.
                        </h2>
                        <div className="inputs py-6">
                            <div className="input">
                                {formik.values.otp.map((box, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        className="border w-10 h-10 md:w-12 md:h-12 mx-1 text-center md:mx-2 text-2xl font-bold border-gray-300 rounded-lg dark:bg-transparent dark:text-white dark:border-slate-700 outline-none focus:ring-2 ring-offset-2 ring-zinc-300 dark:ring-zinc-800"
                                        inputMode="numeric"
                                        onChange={e => handleChange(e, index)}
                                        ref={input => (inputRef.current[index] = input)}
                                        onKeyDown={e => handleKeyDown(e, index)}
                                        value={box}
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-[200px] cursor-pointer py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-md mt-3"
                            disabled={authStore.buttonLoading || formik.values.otp.some(value => value === "")}
                        >
                            {authStore.buttonLoading ? "Verifying OTP..." : "Verify OTP"}
                        </button>

                        <h4 className="m-4 p-4 text-black dark:text-zinc-300">
                            {isResendEnabled ? (
                                <>
                                    Didn't Get OTP?{" "}
                                    <a href="#" onClick={handleResendOtp} className="text-black dark:text-zinc-300 underline">
                                        Resend
                                    </a>
                                </>
                            ) : (
                                <>Resend OTP in {timeLeft} seconds</>
                            )}
                        </h4>
                    </form>
                </div>
            </main>
            <AuthFooter />
        </div>
    );
}
