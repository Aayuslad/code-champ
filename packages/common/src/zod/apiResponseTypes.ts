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
    topicTags: string[];
    isSolved: boolean;
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
    submissions?: Submission[];
    solutions?: {
        languageId: number;
        solutionCode: string;
    }[];
    result?: CheckBatchSubmissionType;
};

export type Submission = {
    status: SubmissionStatus;
    id: string;
    createdAt: Date;
    code: string;
    languageId: string;
};

export type CheckBatchSubmissionType = {
    problemId: string;
    status?:
        | "pending"
        | "executing"
        | "accepted"
        | "notFound"
        | "rejected"
        | "run time error"
        | "compilation error"
        | "time limit exceeded";
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
            executionTime: number;
        },
    ];
};

export type OnGoingProblemType = {
    solutions: string;
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
    Pending = "Pending",
    CompilationError = "Compilation Error",
    RunTimeError = "Run Time Error",
    TimeLimitExceeded = "Time Limit Exceeded",
}
