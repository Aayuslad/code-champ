import zod from "zod";
import { functionStructureSchema, testCaseSchema } from "./subTypes";
const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];

//  ########### user controller schemas ###########

export const signupUserSchema = zod.object({
    email: zod
        .string()
        .email()
        .refine(value => value.trim() === value)
        .refine(
            email => {
                const domain = email.split("@")[1];
                return allowedDomains.includes(domain as string);
            },
            { message: "Nice try 😏, but that email is a no-go here 🚫. Try something real!" },
        ),
    name: zod.string().refine(value => value.trim() === value),
    userName: zod.string().refine(value => value.trim() === value),
    password: zod
        .string()
        .min(6)
        .refine(value => value.trim() === value),
});
export type SignupUserSchemaType = zod.infer<typeof signupUserSchema>;

export const verifySignupOTPSchema = zod.object({
    otp: zod.string().length(6).regex(/^\d+$/),
});
export type VerifySignupOTPSchemaType = zod.infer<typeof verifySignupOTPSchema>;

export const signinUserSchema = zod.object({
    emailOrUsername: zod.string().refine(value => value.trim() === value),
    password: zod
        .string()
        .min(6)
        .refine(value => value.trim() === value),
});
export type SigninUserSchemaType = zod.infer<typeof signinUserSchema>;

export const sendPasswordResetOTPShema = zod.object({
    email: zod
        .string()
        .email()
        .refine(value => value.trim() === value)
        .refine(
            email => {
                const domain = email.split("@")[1];
                return allowedDomains.includes(domain as string);
            },
            { message: "Nice try 😏, but that email is a no-go here 🚫. Try something real!" },
        ),
});
export type SendPasswordResetOTPShemaType = zod.infer<typeof sendPasswordResetOTPShema>;

export const verifyPasswordResetOTPSchema = zod.object({
    otp: zod.string().length(6).regex(/^\d+$/),
});
export type VerifyPasswordResetOTPSchemaType = zod.infer<typeof verifyPasswordResetOTPSchema>;

export const updatePasswordSchema = zod.object({
    password: zod
        .string()
        .min(6)
        .refine(value => value.trim() === value),
    confirmPassword: zod
        .string()
        .min(6)
        .refine(value => value.trim() === value)
        .optional(),
});
export type UpdatePasswordSchemaType = zod.infer<typeof updatePasswordSchema>;

// ########### problem controller schemas ###########

export const contributeProblemSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    functionStructure: functionStructureSchema,
    sampleTestCases: zod.array(testCaseSchema),
    testCases: zod.array(testCaseSchema),
    constraints: zod.array(zod.string()),
    difficultyLevel: zod.enum(["Basic", "Easy", "Medium", "Hard"]),
    topicTags: zod.array(zod.string()),
    hints: zod.array(zod.string()),
    boilerplateCode: zod.string(),
    submissionCode: zod.string(),
});
export type ContributeProblemSchemaType = zod.infer<typeof contributeProblemSchema>;

export const sumitSolutionSchema = zod.object({
    problemId: zod.string(),
    languageId: zod.number(),
    solutionCode: zod.string(),
});
export type SumitSolutionSchemaType = zod.infer<typeof sumitSolutionSchema>;

export const sumitContestSolutionSchema = zod.object({
    participantId: zod.string(),
    contestProblemId: zod.string(),
    problemId: zod.string(),
    languageId: zod.number(),
    solutionCode: zod.string(),
});
export type SumitContestSolutionSchemaType = zod.infer<typeof sumitContestSolutionSchema>;

export const putOngoingProblemSchma = zod.object({
    problemId: zod.string(),
    solutions: zod.string(),
});

export type PutOngoingProblemSchmaType = zod.infer<typeof putOngoingProblemSchma>;

export const putOngoingContestProblemSchma = zod.object({
    contestProblemId: zod.string(),
    participantId: zod.string(),
    solutions: zod.string(),
});

export type PutOngoingContestProblemType = zod.infer<typeof putOngoingContestProblemSchma>;

export const contrubuteTestCasesSchema = zod.object({
    problemId: zod.string(),
    contributedTestCases: zod.array(testCaseSchema),
});

export type ContrubuteTestCasesSchemaType = zod.infer<typeof contrubuteTestCasesSchema>;

export const ContestStatus = zod.enum(["Scheduled", "Ongoing", "Completed"]);
export const ContestVisibility = zod.enum(["Public", "Private"]);

export const createContestSchma = zod.object({
    title: zod.string(),
    description: zod.string(),
    startTime: zod.string(),
    endTime: zod.string(),
    visibility: ContestVisibility,
    problems: zod.array(
        zod.object({
            problemId: zod.string(),
            points: zod.number(),
            order: zod.number(),
        }),
    ),
    points: zod.number(),
});

