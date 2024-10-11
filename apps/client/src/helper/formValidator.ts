import toast from "react-hot-toast";

interface FormValues {
    email?: string;
    userName?: string;
    emailOrUsername?: string;
    password?: string;
    confirmPassword?: string;
    otp?: string[];
}

// validate password update form
export async function passwordUpdateValidation(values: FormValues) {
    const error: Partial<FormValues> = {};
    passwordVerify(error, values);
    confirmPasswordVerify(error, values);
    return error;
}

// validating signup form
export async function sinUpValidation(values: FormValues) {
    const error: Partial<FormValues> = usernameVerify({}, values);
    if (error.userName) return error;
    emailVerify(error, values);
    if (error.email) return error;
    passwordVerify(error, values);

    return error;
}

// validating signin form
export async function sinInValidation(values: FormValues) {
    const error: Partial<FormValues> = nameOrEmailVerify({}, values);
    if (error.emailOrUsername) return error;
    passwordVerify(error, values);

    return error;
}

// validate forgot password form
export async function forgotPasswordValidation(values: FormValues) {
    const error: Partial<FormValues> = emailVerify({}, values);
    if (error.email) return error;
    return error;
}

// otp validation
export async function verifyOtpValidation(values: FormValues) {
    const error: Partial<FormValues> = otpVerify({}, values);
    if (error.otp) return error;
    return error;
}

// All the functions (Logic) starts from here

// validate email
function emailVerify(error: Partial<FormValues> = {}, values: FormValues) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const trimmedEmail = values.email?.trim();

    if (!emailRegex.test(trimmedEmail as string)) {
        error.email = toast.error("Invalid email format");
    }

    return error;
}

// validate password
function passwordVerify(error: Partial<FormValues> = {}, values: FormValues) {
    const trimmedPassword = values.password?.trim();

    if (trimmedPassword?.length !== undefined && trimmedPassword.length < 6) {
        error.password = toast.error("Min 6 characters in password");
    }

    return error;
}

// validate username
function usernameVerify(error: Partial<FormValues> = {}, values: FormValues) {
    const trimmedUsername = values.userName?.trim();

    if (trimmedUsername === "") {
        error.userName = toast.error("Username cannot be empty");
    }

    return error;
}

// validate username or email
function nameOrEmailVerify(error: Partial<FormValues> = {}, values: FormValues) {
    const trimmedEmailOrUsername = values.emailOrUsername?.trim();

    if (trimmedEmailOrUsername === "") {
        error.emailOrUsername = toast.error("Invalid input");
    }

    return error;
}

// validate OTP
function otpVerify(error: Partial<FormValues> = {}, values: FormValues) {
    const otpRegex = /^\d{6}$/;

    if (!values.otp || values.otp.length !== 1 || !otpRegex.test(values.otp[0])) {
        if (!error.otp) {
            error.otp = [];
        }
        error.otp[0] = toast.error("OTP must be 6 digits");
    }

    return error;
}

// validate confirm password
function confirmPasswordVerify(error: Partial<FormValues> = {}, values: FormValues) {
    const trimmedPassword = values.password?.trim();
    const trimmedConfirmPassword = values.confirmPassword?.trim();

    if (!trimmedConfirmPassword) {
        error.confirmPassword = toast.error("Confirm Password is required");
    } else if (trimmedConfirmPassword.length < 6) {
        error.confirmPassword = toast.error("Min 6 characters in confirm password");
    } else if (trimmedPassword !== trimmedConfirmPassword) {
        error.confirmPassword = toast.error("Passwords do not match");
    }

    return error;
}
