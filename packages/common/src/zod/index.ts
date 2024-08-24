import zod from "zod";

const structureSchema = zod.object({
	title: zod.string(),
	functionName: zod.string(),
	description: zod.string(),
	inputFields: zod.array(
		zod.object({
			name: zod.string(),
			type: zod.string(),
			description: zod.string(),
		}),
	),
	outputType: zod.string(),
});

// Schema for the sample test cases
const testCaseSchema = zod.object({
	input: zod.string(),
	output: zod.string(),
	explanation: zod.string().optional(),
});

// Main schema for the entire problem object
export const problemSchema = zod.object({
	title: zod.string(),
	problemStatement: zod.string(),
	structre: structureSchema,
	sampleTestCases: zod.array(testCaseSchema),
	testCases: zod.array(testCaseSchema),
	constraints: zod.array(zod.string()),
	difficulty: zod.enum(["Easy", "Medium", "Hard"]),
	topicTags: zod.array(zod.string()),
	Hints: zod.array(zod.string()),
});

export const signupUserSchema = zod.object({
	email: zod.string().email().refine((value) => value.trim() === value),
	userName: zod.string().refine((value) => value.trim() === value),
	password: zod.string().min(6).refine((value) => value.trim() === value),
});
export type signupUserSchemaType = zod.infer<typeof signupUserSchema>;

export const verifySignupOTPSchema = zod.object({
	otp: zod.string().length(6).regex(/^\d+$/),
});
export type verifySignupOTPSchemaType = zod.infer<typeof verifySignupOTPSchema>;

export const signinUserSchema = zod.object({
	emailOrUsername: zod.string().refine((value) => value.trim() === value),
	password: zod.string().min(6).refine((value) => value.trim() === value),
});
export type signinUserSchemaType = zod.infer<typeof signinUserSchema>;

export const sendPasswordResetOTPShema = zod.object({
	email: zod.string().email().refine((value) => value.trim() === value),
});
export type sendPasswordResetOTPShemaType = zod.infer<typeof sendPasswordResetOTPShema>;

export const verifyPasswordResetOTPSchema = zod.object({
	otp: zod.string().length(6).regex(/^\d+$/),
});
export type verifyPasswordResetOTPSchemaType = zod.infer<typeof verifyPasswordResetOTPSchema>;

export const updatePasswordSchema = zod.object({
	password: zod.string().min(6).refine((value) => value.trim() === value),
	confirmPassword: zod.string().min(6).refine((value) => value.trim() === value).optional(),
}) 
export type updatePasswordSchemaType = zod.infer<typeof updatePasswordSchema>;
