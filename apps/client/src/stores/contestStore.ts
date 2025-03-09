import {
    CheckBatchSubmissionType,
    ContestProblemType,
    FeedContests,
    LiveContestDetails,
    OnGoingContestProblemType,
    PutOngoingContestProblemType,
    RegisterContestDetails,
    Submission,
    SumitContestSolutionSchemaType,
} from "@repo/common/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { languageToIdMppings } from "../config/languageIdMppings";
import apiErrorHandler from "../helper/apiCallErrorHandler";

interface contestStoreType {
    loading: boolean;
    skeletonLoading: boolean;
    testButtonLoading: boolean;
    submitButtonLoading: boolean;
    contests: FeedContests[] | undefined;
    onGoingContestProblems: ContestProblemType[] | undefined;

    fetchContests: () => Promise<void>;
    fetchRegisterContestDetails: (contestId: string, userId: string | undefined) => Promise<RegisterContestDetails | undefined>;
    registerForContest: (contestId: string) => Promise<void>;
    fetchLiveContestDetails: (contestId: string) => Promise<LiveContestDetails | undefined>;
    getContestProblem: (contestProblemId: string, participantId: string) => Promise<void>;
    setOngoingContestProblem: (problem: ContestProblemType) => void;
    addContestSolution: (
        contestProblemId: string,
        solutionCode: {
            languageId: number;
            solutionCode: string;
        },
    ) => void;
    updateContestSolution: (
        contestProblemId: string,
        solutionCode: {
            languageId: number;
            solutionCode: string;
        },
    ) => void;
    testContestProblem: (values: SumitContestSolutionSchemaType) => Promise<boolean>;
    submitProblem: (values: SumitContestSolutionSchemaType) => Promise<boolean>;
    checkTestResult: (taskId: string, contestProblemId: string) => Promise<void>;
    checkSubmissionResult: (taskId: string, contestProblemId: string) => Promise<void>;
    getContestProblemSubmissions: (contestProblemId: string, participantId: string) => Promise<void>;
    putOngoingContestProblem: (values: PutOngoingContestProblemType) => Promise<void>;
    getOngoingContestProblem: (contestProblemId: string) => Promise<OnGoingContestProblemType | undefined>;
    resetCode: (contestProblemId: string, language: string) => void;
    clearSubmissionResult: (contestProblemId: string) => void;
    clearTestResult: (contestProblemId: string) => void;
}

export const ContestStore = create<contestStoreType>(set => ({
    loading: false,
    skeletonLoading: false,
    testButtonLoading: false,
    submitButtonLoading: false,
    contests: undefined,
    onGoingContestProblems: undefined,

    fetchContests: async function () {
        try {
            set({ skeletonLoading: true });
            const result = await axios.get("/contest/public");
            set({ contests: result.data as FeedContests[] });
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ skeletonLoading: false });
        }
    },

    fetchRegisterContestDetails: async function (contestId, userId = undefined) {
        try {
            set({ skeletonLoading: true });
            const result = await axios.get<RegisterContestDetails>(`/contest/register-details/${contestId}/${userId}`);
            console.log(result.data);
            return result.data;
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ skeletonLoading: false });
        }
    },

    registerForContest: async function (contestId) {
        try {
            set({ skeletonLoading: true });
            await axios.post(`/contest/register/${contestId}`);
            toast.success("Registered for contest successfully");
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ skeletonLoading: false });
        }
    },

    fetchLiveContestDetails: async function (contestId) {
        try {
            set({ skeletonLoading: true });
            const result = await axios.get<LiveContestDetails>(`/contest/live-contest/${contestId}`);
            return result.data;
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ skeletonLoading: false });
        }
    },

    getContestProblem: async function (contestProblemId, participantId) {
        try {
            set({ skeletonLoading: true });
            const { data } = await axios.get<ContestProblemType>(`/contest-problem/${contestProblemId}/${participantId}`);
            set(state => ({ onGoingContestProblems: [...(state.onGoingContestProblems || []), data] }));
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ skeletonLoading: false });
        }
    },

    setOngoingContestProblem: problem => {
        set(state => ({ onGoingContestProblems: [...(state.onGoingContestProblems || []), problem] }));
    },

    addContestSolution: (contestProblemId, solutioncode) => {
        set(state => ({
            onGoingContestProblems:
                state.onGoingContestProblems?.map(problem =>
                    problem.contestProblemId === contestProblemId
                        ? {
                              ...problem,
                              solutions: [
                                  ...(problem.solutions?.filter(sol => sol.languageId !== solutioncode.languageId) || []),
                                  solutioncode,
                              ],
                          }
                        : problem,
                ) || [],
        }));
    },

    updateContestSolution: (contestProblemId, solutionCode) => {
        set(state => ({
            onGoingContestProblems:
                state.onGoingContestProblems?.map(problem =>
                    problem.contestProblemId === contestProblemId
                        ? {
                              ...problem,
                              solutions: problem.solutions?.map(solution =>
                                  solution.languageId === solutionCode.languageId ? { ...solution, ...solutionCode } : solution,
                              ),
                          }
                        : problem,
                ) || [],
        }));
    },

    testContestProblem: async values => {
        const state = ContestStore.getState();
        let flag = true;
        try {
            set({ testButtonLoading: true });
            const { data } = await axios.post(`/contest-problem/test`, values);
            state.checkTestResult(data.taskId, values.contestProblemId);
        } catch (error) {
            apiErrorHandler(error);
            flag = false;
        } finally {
            set({ testButtonLoading: false });
            return flag;
        }
    },

    submitProblem: async values => {
        const state = ContestStore.getState();
        let flag = true;
        try {
            set({ submitButtonLoading: true });
            const { data } = await axios.post("/contest-problem/submit", values);
            state.checkSubmissionResult(data.taskId, values.contestProblemId);
        } catch (error) {
            apiErrorHandler(error);
            flag = false;
        } finally {
            set({ submitButtonLoading: false });
            return flag;
        }
    },

    checkTestResult: async (taskId, contestProblemId) => {
        try {
            set({ skeletonLoading: true });
            while (1) {
                const { data }: { data: CheckBatchSubmissionType } = await axios.get(
                    `/contest-problem/check/${taskId}/${contestProblemId}`,
                );
                set(state => ({
                    onGoingContestProblems:
                        state.onGoingContestProblems?.map(problem => {
                            if (problem.contestProblemId === contestProblemId) {
                                return {
                                    ...problem,
                                    testResult: data,
                                };
                            }
                            return problem;
                        }) ?? [],
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

    checkSubmissionResult: async (taskId, contestProblemId) => {
        try {
            set({ skeletonLoading: true });
            while (1) {
                const { data }: { data: CheckBatchSubmissionType } = await axios.get(
                    `/contest-problem/check/${taskId}/${contestProblemId}`,
                );
                set(state => ({
                    onGoingContestProblems:
                        state.onGoingContestProblems?.map(problem => {
                            if (problem.contestProblemId === contestProblemId) {
                                return {
                                    ...problem,
                                    submissionResult: data,
                                };
                            }
                            return problem;
                        }) ?? [],
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

    getContestProblemSubmissions: async (contestProblemId, participantId) => {
        try {
            set({ skeletonLoading: true });
            const { data } = await axios.get<Submission[]>(`/contest-problem/submissions/${contestProblemId}/${participantId}`);
            set(state => ({
                onGoingContestProblems:
                    state.onGoingContestProblems?.map(problem =>
                        problem.contestProblemId === contestProblemId ? { ...problem, submissions: data } : problem,
                    ) ?? [],
            }));
        } catch (error) {
            apiErrorHandler(error);
        } finally {
            set({ skeletonLoading: false });
        }
    },

    putOngoingContestProblem: async values => {
        try {
            await axios.put("/contest-problem/ongoing-problem", values);
        } catch (error) {
            apiErrorHandler(error);
        }
    },

    getOngoingContestProblem: async contestProblemId => {
        try {
            const { data } = await axios.get<OnGoingContestProblemType>(`/contest-problem/ongoing-problem/${contestProblemId}`);
            return data;
        } catch (error) {
            apiErrorHandler(error);
        }
    },

    resetCode: (contestProblemId, language) => {
        const state = ContestStore.getState();
        const boilerplate = state.onGoingContestProblems?.find(
            problem => problem.contestProblemId === contestProblemId,
        )?.boilerplateCode;
        if (!boilerplate) return;
        const code = boilerplate[language as keyof typeof boilerplate];
        set(state => ({
            onGoingContestProblems:
                state.onGoingContestProblems?.map(problem =>
                    problem.contestProblemId === contestProblemId
                        ? {
                              ...problem,
                              solutions: problem.solutions?.map(sol =>
                                  sol.languageId === languageToIdMppings[language] ? { ...sol, solutionCode: code } : sol,
                              ),
                          }
                        : problem,
                ) ?? [],
        }));
    },

    clearSubmissionResult: async contestProblemId => {
        set(state => ({
            ...state,
            onGoingContestProblems:
                state.onGoingContestProblems?.map(problem => {
                    if (problem.contestProblemId === contestProblemId) {
                        return {
                            ...problem,
                            submissionResult: undefined,
                        };
                    }
                    return problem;
                }) ?? [],
        }));
    },

    clearTestResult: async contestProblemId => {
        set(state => ({
            ...state,
            onGoingContestProblems:
                state.onGoingContestProblems?.map(problem => {
                    if (problem.contestProblemId === contestProblemId) {
                        return {
                            ...problem,
                            testResult: undefined,
                        };
                    }
                    return problem;
                }) ?? [],
        }));
    },
}));
