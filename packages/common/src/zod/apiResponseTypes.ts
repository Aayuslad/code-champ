import { BoilerPlateCode, FunctionStructureType, TestCaseType } from "./subTypes";

// ########## user contoller response types ##########

export type UserProfile = {
    id: string;
    email: string;
    userName: string;
    profileImg: string;
    avatar: string;
};

export type WholeUserProfile = {
    id: string;
    email: string;
    name: string;
    userName: string;
    profileImg: string;
    avatar: string;
    solved: number;
    points: number;
    rank: number;
    totalProblems: number;
    totalBasic: number;
    totalEasy: number;
    totalMedium: number;
    totalHard: number;
    basicSolvedCount: number;
    easySolvedCount: number;
    mediumSolvedCount: number;
    hardSolvedCount: number;
    basicSolved: Array<{ id: string; title: string }>;
    easySolved: Array<{ id: string; title: string }>;
    mediumSolved: Array<{ id: string; title: string }>;
    hardSolved: Array<{ id: string; title: string }>;
    skillCounts: Array<{ skill: string; count: number }>;
    languageIdCounts: Array<{ languageId: number; count: number }>;
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
    submissionResult?: CheckBatchSubmissionType;
    testResult?: CheckBatchSubmissionType;
};

export type ContestProblemType = {
    contestProblemId: string;
    problemId: string;
    order: number;
    points: number;
    title: string;
    description: string;
    difficultyLevel: DifficultyLevel;
    exampleTestCases: TestCaseType[];
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
    submissions?: Submission[];
    solutions?: {
        languageId: number;
        solutionCode: string;
    }[];
    submissionResult?: CheckBatchSubmissionType;
    testResult?: CheckBatchSubmissionType;
};

export type Submission = {
    status: SubmissionStatus;
    id: string;
    createdAt: Date;
    code: string;
    languageId: string;
    points: number;
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

export type OnGoingContestProblemType = {
    solutions: string;
};

export type ProbelmSearchResultType = {
    id: string;
    problemNumber: number;
    title: string;
    difficulty: DifficultyLevel;
};

export type ProblemTypeForContribution = {
    id: string;
    problemNumber: number;
    title: string;
    difficultyLevel: DifficultyLevel;
    description: string;
    acceptanceRate: string;
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
    functionStructure: FunctionStructureType;
    exampleTestCases: TestCaseType[];
    testCases: TestCaseType[];
};

// ########## Contest controller responses #########

export type FeedContests = {
    upcomming: FeedContest[];
    live: FeedContest[];
    registerd: FeedContest[];
    completed: FeedContest[];
    completedByYou: FeedContest[];
};

export type FeedContest = {
    id: string;
    title: string;
    status: "Scheduled" | "Ongoing" | "Completed";
    startTime: string;
    endTime: string;
};

export type RegisterContestDetails = {
    id: string;
    title: string;
    status: "Scheduled" | "Ongoing" | "Completed";
    startTime: string;
    endTime: string;
    description: string;
    createdBy: {
        id: string;
        userName: string;
        profileImg: string;
        avatar: string;
    };
    isRegistered: boolean;
};

export type LiveContestDetails = {
    id: string;
    participantId: string;
    title: string;
    startTime: string;
    endTime: string;
    yourScore: number;
    problems: {
        contestProblemId: string;
        problemId: string;
        points: number;
        order: number;
        title: string;
        isSolved: boolean;
    }[];
    leaderBoard: LeaderBoardType[];
};

export type LeaderBoardType = {
    userId: string;
    userName: string;
    profileImg: string;
    avatar: string;
    score: number;
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
