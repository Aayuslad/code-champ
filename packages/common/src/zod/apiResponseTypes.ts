import { BoilerPlateCode, TestCaseType } from "./subTypes";

// ########## user contoller response types ##########

export type UserType = {
    id: string;
    email: string;
    userName: string;
};

// ########## problem contoller response types ##########

export type FeedProblemsType = {
    id: string;
    problemNumber: number;
    title: string;
    difficulty: DifficultyLevel;
    acceptanceRate: string;
};

export type ProblemType = {
    id: string;
    problemNumber: number;
    title: string;
    description: string;
    difficultyLevel: DifficultyLevel;
    exampleTestCases: TestCaseType[];
    acceptanceRate: string;
    boilerplateCode: BoilerPlateCode;
    constraints: string[];
    topicTags: string[];
    hints: string[];
    testCasesCount: number;
    createdBy: {
        id: string;
        userName: string;
        profileImg: string;
    };
    submissionCount: number;
    acceptedSubmissions: number;
    submissions?: submission[];
    solutions?: {
        languageId: number;
        solutionCode: string;
    }[];
    result?: checkBatchSubmissionType;
};

export type submission = {
    status: SubmissionStatus;
    id: string;
    createdAt: Date;
    languageId: string;
};

export type checkBatchSubmissionType = {
    problemId: string;
    status?: "pending" | "executing" | "accepted" | "notFound" | "rejected" | "run time error" | "compilation error";
    compilationError?: string;
    tasks?: [
        {
            id: string;
            status: "error" | "success";
            output: string;
            accepted: boolean;
            inputs: {
                name: string;
                value: string;
            }[];
            expectedOutput: string;
        },
    ];
};

// enums

export enum DifficultyLevel {
    Basic = "Basic",
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard",
}

export enum SubmissionStatus {
    Accepted = "Accepted",
    Rejeected = "Rejected",
}
