import { create } from "zustand";
import apiErrorHandler from "../helper/apiCallErrorHandler";
import {
    FeedProblemsType,
    ProblemType,
    SumitSolutionSchemaType,
    CheckBatchSubmissionType,
    Submission,
    PutOngoingProblemSchmaType,
    OnGoingProblemType,
    ContributeProblemSchemaType,
} from "@repo/common/zod";
import axios from "axios";
import { languageToIdMppings } from "../config/languageIdMppings";
import toast from "react-hot-toast";

type ProblemStoreType = {
    feedProblems: FeedProblemsType[];
    onGoingProblems: ProblemType[];
    skeletonLoading: boolean;
    buttonLoading: boolean;

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
    checkBatchSubmission: (taskId: string, problemId: string) => Promise<void>;
    getProblemSubmissions: (problemId: string) => Promise<void>;
    putOngoingProblem: (values: PutOngoingProblemSchmaType) => Promise<void>;
    getOngoingProblem: (problemId: string) => Promise<OnGoingProblemType | undefined>;
    resetCode: (problemId: string, language: string) => void;
    contributeProblem: (values: ContributeProblemSchemaType) => Promise<void>;
};

export const ProblemStore = create<ProblemStoreType>(set => ({
    feedProblems: [],
    onGoingProblems: [],
    skeletonLoading: false,
    buttonLoading: false,

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
            set({ skeletonLoading: true });
            while (1) {
                const { data }: { data: CheckBatchSubmissionType } = await axios.get(`/problem/check/${taskId}/${problemId}`);
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
                if (data.status !== "executing" && data.status !== "pending" && data.status !== "notFound") {
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 500));
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
            console.log(data);
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
}));
