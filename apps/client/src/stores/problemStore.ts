import { create } from "zustand";
import apiErrorHandler from "../helper/apiCallErrorHandler";
import { FeedProblemsType, ProblemType, sumitSolutionSchemaType, checkBatchSubmissionType } from "@repo/common/zod";
import axios from "axios";

type ProblemStoreType = {
    feedProblems: FeedProblemsType[];
    onGoingProblems: ProblemType[];
    skeletonLoading: boolean;
    buttonLoading: boolean;

    getFeedProblems: () => Promise<void>;
    getProblem: (problemId: string) => Promise<void>;
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
    submitProblem: (values: sumitSolutionSchemaType) => Promise<boolean>;
    checkBatchSubmission: (taskId: string, problemId: string) => Promise<void>;
    getProblemSubmissions: (problemId: string) => Promise<void>;
};

export const ProblemStore = create<ProblemStoreType>((set, get) => ({
    feedProblems: [],
    onGoingProblems: [],
    skeletonLoading: false,
    buttonLoading: false,

    getFeedProblems: async () => {
        try {
            set({ skeletonLoading: true });
            const { data } = await axios.get<FeedProblemsType[]>("/problem/bulk");
            set({ feedProblems: data });
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ skeletonLoading: false });
        }
    },

    getProblem: async problemId => {
        try {
            set({ skeletonLoading: true });
            const { data } = await axios.get<ProblemType>(`/problem/${problemId}`);
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
                problem.id === problemId ? { ...problem, solutions: [...(problem.solutions || []), solutioncode] } : problem,
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

    submitProblem: async values => {
        const state = ProblemStore.getState();
        let flag = true;
        try {
            set({ buttonLoading: true });
            const { data } = await axios.post("/problem/submit", values);
            state.checkBatchSubmission(data.taskId, values.problemId);
        } catch (error) {
            apiErrorHandler(error);
            flag = false;
        } finally {
            set({ buttonLoading: false });
            return flag;
        }
    },

    checkBatchSubmission: async (taskId, problemId) => {
        try {
            set({ buttonLoading: true });
            while (1) {
                const { data }: { data: checkBatchSubmissionType } = await axios.get(`/problem/check/${taskId}/${problemId}`);
                set(state => ({
                    onGoingProblems: state.onGoingProblems.map(problem => {
                        if (problem.id === problemId) {
                            return {
                                ...problem,
                                result: data,
                            };
                        }
                        return problem;
                    }),
                }));
                if (data.status === "rejected" || data.status === "accepted") {
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 4000));
            }
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ buttonLoading: false });
        }
    },

    getProblemSubmissions: async problemId => {
        try {
            set({ skeletonLoading: true });
            const { data } = await axios.get<ProblemType>(`/problem/submission/${problemId}`);
            set(state => ({ onGoingProblems: [...state.onGoingProblems, data] }));
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ skeletonLoading: false });
        }
    },
}));
