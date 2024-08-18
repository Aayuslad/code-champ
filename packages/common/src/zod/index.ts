import zod from "zod";

export const signupUserSchema = zod.object({
	email: zod.string().email().refine((value) => value.trim() === value),
	userName: zod.string().refine((value) => value.trim() === value),
	password: zod.string().min(6).refine((value) => value.trim() === value),
});
export type signupUserSchemaType = zod.infer<typeof signupUserSchema>;

export const verifySignupOTPSchema = zod.string().length(6).regex(/^\d+$/);
export type verifySignupOTPSchemaType = zod.infer<typeof verifySignupOTPSchema>;

export const signinUserSchema = zod.object({
	emailOrUsername: zod.string().refine((value) => value.trim() === value),
	password: zod.string().min(6).refine((value) => value.trim() === value),
});
export type signinUserSchemaType = zod.infer<typeof signinUserSchema>;

export const sendPasswordResetOTPShema = zod.string().email().refine((value) => value.trim() === value);
export type sendPasswordResetOTPShemaType = zod.infer<typeof sendPasswordResetOTPShema>;

export const verifyPasswordResetOTPSchema = zod.string().length(6).regex(/^\d+$/);
export type verifyPasswordResetOTPSchemaType = zod.infer<typeof verifyPasswordResetOTPSchema>;

export const updatePasswordAfterVerificationSchema = zod.string().min(6).refine((value) => value.trim() === value);
export type updatePasswordAfterVerificationSchemaType = zod.infer<typeof updatePasswordAfterVerificationSchema>;
