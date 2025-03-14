import {
    CheckBatchSubmissionType,
    ContributeProblemSchemaType,
    FeedProblemsType,
    OnGoingProblemType,
    ProbelmSearchResultType,
    ProblemType,
    ProblemTypeForContribution,
    PutOngoingProblemSchmaType,
    Submission,
    SumitSolutionSchemaType,
    TestCaseType,
} from "@repo/common/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { languageToIdMppings } from "../config/languageIdMppings";
import apiErrorHandler from "../helper/apiCallErrorHandler";

type ProblemStoreType = {
    feedProblems: FeedProblemsType[];
    onGoingProblems: ProblemType[];
    skeletonLoading: boolean;
    buttonLoading: boolean;
    testButtonLoading: boolean;
    submitButtonLoading: boolean;

    getFeedProblems: (userId?: string) => Promise<void>;
    getProblem: (problemId: string, userId: string) => Promise<void>;
    setOngoingProblem: (problem: ProblemType) => void;
    addSolution: (
        problemId: string,
        solutionCode: {
            languageId: number;
            solutionCode: string;
        },
    ) => void;
    updateSolution: (
        problemId: string,
        solutionCode: {
            languageId: number;
            solutionCode: string;
        },
    ) => void;
    submitProblem: (values: SumitSolutionSchemaType) => Promise<boolean>;
    testProblem: (values: SumitSolutionSchemaType) => Promise<boolean>;
    checkTestResult: (taskId: string, problemId: string) => Promise<void>;
    checkSubmissionResult: (taskId: string, problemId: string) => Promise<void>;
    getProblemSubmissions: (problemId: string) => Promise<void>;
    putOngoingProblem: (values: PutOngoingProblemSchmaType) => Promise<void>;
    getOngoingProblem: (problemId: string) => Promise<OnGoingProblemType | undefined>;
    resetCode: (problemId: string, language: string) => void;
    contributeProblem: (values: ContributeProblemSchemaType) => Promise<void>;
    clearSubmissionResult: (problemId: string) => void;
    clearTestResult: (problemId: string) => void;
    searchProblem: (query: string) => Promise<ProbelmSearchResultType[] | undefined>;
    getProblemForContribution: (problemId: string) => Promise<ProblemTypeForContribution | undefined>;
    contributeTestCases: (values: { problemId: string; contributedTestCases: TestCaseType[] }) => Promise<void>;
};

export const ProblemStore = create<ProblemStoreType>(set => ({
    feedProblems: [],
    onGoingProblems: [],
    skeletonLoading: false,
    buttonLoading: false,
    testButtonLoading: false,
    submitButtonLoading: false,

    getFeedProblems: async userId => {
        try {
            set({ skeletonLoading: true });
            const { data } = await axios.get<FeedProblemsType[]>(`/problem/bulk/?userId=${userId}`);
            set({ feedProblems: data });
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ skeletonLoading: false });
        }
    },

    getProblem: async (problemId, userId) => {
        try {
            set({ skeletonLoading: true });
            const { data } = await axios.get<ProblemType>(`/problem/${problemId}?userId=${userId}`);
            set(state => ({ onGoingProblems: [...state.onGoingProblems, data] }));
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ skeletonLoading: false });
        }
    },

    setOngoingProblem: problem => {
        set(state => ({ onGoingProblems: [...state.onGoingProblems, problem] }));
    },

    addSolution: (problemId, solutioncode) => {
        set(state => ({
            onGoingProblems: state.onGoingProblems.map(problem =>
                problem.id === problemId
                    ? {
                          ...problem,
                          solutions: [
                              ...(problem.solutions?.filter(sol => sol.languageId !== solutioncode.languageId) || []),
                              solutioncode,
                          ],
                      }
                    : problem,
            ),
        }));
    },

    updateSolution: (problemId, solutionCode) => {
        set(state => ({
            onGoingProblems: state.onGoingProblems.map(problem =>
                problem.id === problemId
                    ? {
                          ...problem,
                          solutions: problem.solutions?.map(solution =>
                              solution.languageId === solutionCode.languageId ? { ...solution, ...solutionCode } : solution,
                          ),
                      }
                    : problem,
            ),
        }));
    },

    testProblem: async values => {
        const state = ProblemStore.getState();
        let flag = true;
        try {
            set({ testButtonLoading: true });
            const { data } = await axios.post("/problem/test", values);
            state.checkTestResult(data.taskId, values.problemId);
        } catch (error) {
            apiErrorHandler(error);
            flag = false;
        } finally {
            set({ testButtonLoading: false });
            return flag;
        }
    },

    submitProblem: async values => {
        const state = ProblemStore.getState();
        let flag = true;
        try {
            set({ submitButtonLoading: true });
            const { data } = await axios.post("/problem/submit", values);
            state.checkSubmissionResult(data.taskId, values.problemId);
        } catch (error) {
            apiErrorHandler(error);
            flag = false;
        } finally {
            set({ submitButtonLoading: false });
            return flag;
        }
    },

    checkTestResult: async (taskId, problemId) => {
        try {
            set({ skeletonLoading: true });
            while (1) {
                const { data }: { data: CheckBatchSubmissionType } = await axios.get(`/problem/check/${taskId}/${problemId}`);
                set(state => ({
                    onGoingProblems: state.onGoingProblems.map(problem => {
                        if (problem.id === problemId) {
                            return {
                                ...problem,
                                testResult: data,
                            };
                        }
                        return problem;
                    }),
                }));
                if (data.status !== "executing" && data.status !== "pending" && data.status !== "notFound") {
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            setTimeout(() => set({ skeletonLoading: false }), 500);
        }
    },

    checkSubmissionResult: async (taskId, problemId) => {
        try {
            set({ skeletonLoading: true });
            while (1) {
                const { data }: { data: CheckBatchSubmissionType } = await axios.get(`/problem/check/${taskId}/${problemId}`);
                set(state => ({
                    onGoingProblems: state.onGoingProblems.map(problem => {
                        if (problem.id === problemId) {
                            return {
                                ...problem,
                                submissionResult: data,
                            };
                        }
                        return problem;
                    }),
                }));
                if (data.status !== "executing" && data.status !== "pending" && data.status !== "notFound") {
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            setTimeout(() => set({ skeletonLoading: false }), 500);
        }
    },

    getProblemSubmissions: async problemId => {
        try {
            set({ skeletonLoading: true });
            const { data } = await axios.get<Submission[]>(`/problem/submission/${problemId}`);
            set(state => ({
                onGoingProblems: state.onGoingProblems.map(problem =>
                    problem.id === problemId ? { ...problem, submissions: data } : problem,
                ),
            }));
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ skeletonLoading: false });
        }
    },

    putOngoingProblem: async values => {
        try {
            await axios.put("/problem/ongoing-problem", values);
        } catch (error) {
            apiErrorHandler(error);
        }
    },

    getOngoingProblem: async problemId => {
        try {
            const { data } = await axios.get<OnGoingProblemType>(`/problem/ongoing-problem/${problemId}`);
            return data;
        } catch (error) {
            apiErrorHandler(error);
        }
    },

    resetCode: (problemId, language) => {
        const state = ProblemStore.getState();
        const boilerplate = state.onGoingProblems.find(problem => problem.id === problemId)?.boilerplateCode;
        if (!boilerplate) return;
        const code = boilerplate[language as keyof typeof boilerplate];
        set(state => ({
            onGoingProblems: state.onGoingProblems.map(problem =>
                problem.id === problemId
                    ? {
                          ...problem,
                          solutions: problem.solutions?.map(sol =>
                              sol.languageId === languageToIdMppings[language] ? { ...sol, solutionCode: code } : sol,
                          ),
                      }
                    : problem,
            ),
        }));
    },

    contributeProblem: async values => {
        try {
            set({ buttonLoading: true });
            await axios.post("/problem/contribute", values);
            toast.success("Problem contributed");
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ buttonLoading: false });
        }
    },

    clearSubmissionResult: async problemId => {
        set(state => ({
            ...state,
            onGoingProblems: state.onGoingProblems.map(problem => {
                if (problem.id === problemId) {
                    return {
                        ...problem,
                        submissionResult: undefined,
                    };
                }
                return problem;
            }),
        }));
    },

    clearTestResult: async problemId => {
        set(state => ({
            ...state,
            onGoingProblems: state.onGoingProblems.map(problem => {
                if (problem.id === problemId) {
                    return {
                        ...problem,
                        testResult: undefined,
                    };
                }
                return problem;
            }),
        }));
    },

    searchProblem: async query => {
        try {
            set({ skeletonLoading: true });
            const { data } = await axios.get<ProbelmSearchResultType[]>(`/problem/search?query=${query}`);
            return data;
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ skeletonLoading: false });
        }
    },

    getProblemForContribution: async problemId => {
        try {
            set({ skeletonLoading: true });
            const { data } = await axios.get<ProblemTypeForContribution>(`/problem/for-contribution/${problemId}`);
            return data;
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ skeletonLoading: false });
        }
    },

    contributeTestCases: async values => {
        try {
            set({ buttonLoading: true });
            await axios.post("/problem/contribute-testcases", values);
            toast.success("Test cases contributed");
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ buttonLoading: false });
        }
    },
}));
