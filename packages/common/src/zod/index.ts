import zod from "zod";

export type BaseType = "int" | "short" | "long" | "float" | "double" | "boolean";
export type DerivedType = "String" | "Array" | "LinkedList" | "Set" | "Map" | "Queue" | "Stack" | "TreeNode" | "GraphNode";

const baseTypesChama = zod.enum(["int", "short", "long", "float", "double", "boolean"]);
const derivedTypesChama = zod.enum(["String", "Array", "LinkedList", "Set", "Map", "Queue", "Stack", "TreeNode", "GraphNode"]);
export type BaseTypes = zod.infer<typeof baseTypesChama>;
export type DerivedTypes = zod.infer<typeof derivedTypesChama>;

const functionStructureSchema = zod.object({
	title: zod.string(),
	functionName: zod.string(),
	description: zod.string(),
	parameters: zod.array(
		zod.object({
			name: zod.string(),
			baseType: baseTypesChama,
			derivedType: derivedTypesChama.optional(),
			category: zod.string(),
			description: zod.string(),
		}),
	),
	returnType: zod.object({
		baseType: baseTypesChama,
		derivedType: derivedTypesChama.optional(),
		category: zod.string(),
		description: zod.string(),
	}),
});

export type FunctionStructureType = zod.infer<typeof functionStructureSchema>;

// Schema for the sample test cases
const testCaseSchema = zod.object({
	input: zod.array(
		zod.object({
			name: zod.string(),
			value: zod.string(),
		})
	),
	output: zod.string(),
	explanation: zod.string().optional(),
});

export type TestCaseType = zod.infer<typeof testCaseSchema>;

// problem object schema
export const problemSchema = zod.object({
	title: zod.string(),
	description: zod.string(),
	functionStructure: functionStructureSchema,
	sampleTestCases: zod.array(testCaseSchema),
	testCases: zod.array(testCaseSchema),
	constraints: zod.array(zod.string()),
	difficultyLevel: zod.enum(["Basic", "Easy", "Medium", "Hard"]),
	topicTags: zod.array(zod.string()),
	hints: zod.array(zod.string()),
});

// ########   schemas for controller functions   ########

export const signupUserSchema = zod.object({
	email: zod
		.string()
		.email()
		.refine((value) => value.trim() === value),
	userName: zod.string().refine((value) => value.trim() === value),
	password: zod
		.string()
		.min(6)
		.refine((value) => value.trim() === value),
});
export type signupUserSchemaType = zod.infer<typeof signupUserSchema>;

export const verifySignupOTPSchema = zod.object({
	otp: zod.string().length(6).regex(/^\d+$/),
});
export type verifySignupOTPSchemaType = zod.infer<typeof verifySignupOTPSchema>;

export const signinUserSchema = zod.object({
	emailOrUsername: zod.string().refine((value) => value.trim() === value),
	password: zod
		.string()
		.min(6)
		.refine((value) => value.trim() === value),
});
export type signinUserSchemaType = zod.infer<typeof signinUserSchema>;

export const sendPasswordResetOTPShema = zod.object({
	email: zod
		.string()
		.email()
		.refine((value) => value.trim() === value),
});
export type sendPasswordResetOTPShemaType = zod.infer<typeof sendPasswordResetOTPShema>;

export const verifyPasswordResetOTPSchema = zod.object({
	otp: zod.string().length(6).regex(/^\d+$/),
});
export type verifyPasswordResetOTPSchemaType = zod.infer<typeof verifyPasswordResetOTPSchema>;

export const updatePasswordSchema = zod.object({
	password: zod
		.string()
		.min(6)
		.refine((value) => value.trim() === value),
	confirmPassword: zod
		.string()
		.min(6)
		.refine((value) => value.trim() === value)
		.optional(),
});
export type updatePasswordSchemaType = zod.infer<typeof updatePasswordSchema>;

export const sumitSolutionSchema = zod.object({
	problemId: zod.string(),
	languageId: zod.number(),
	solutionCode: zod.string(),
});

export type sumitSolutionSchemaType = zod.infer<typeof sumitSolutionSchema>;
