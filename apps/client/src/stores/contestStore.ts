import {
    CheckBatchSubmissionType,
    CheckContestBatchSubmissionType,
    ContestProblemType,
    FeedContests,
    LeaderBoardType,
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
    contests: FeedContests | undefined;
    onGoingContestProblems: ContestProblemType[] | undefined;
    liveContestDetails: LiveContestDetails | undefined;

    fetchContests: (userId: string | undefined) => Promise<void>;
    fetchRegisterContestDetails: (contestId: string, userId: string | undefined) => Promise<RegisterContestDetails | undefined>;
    registerForContest: (contestId: string, enrollmentNum: number) => Promise<void>;
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
    updateLeaderBoard: (contestId: string) => Promise<void>;
    updateProblemAttemptStatus: (contestProblemId: string, status: "Not Attempted" | "Attempted" | "Accepted") => void;
    calculateAndUpdatePoints: (problemId: string, passedTestCases?: number) => void;
}

export const ContestStore = create<contestStoreType>(set => ({
    loading: false,
    skeletonLoading: false,
    testButtonLoading: false,
    submitButtonLoading: false,
    contests: undefined,
    onGoingContestProblems: undefined,
    liveContestDetails: undefined,

    fetchContests: async function (userId = undefined) {
        try {
            set({ skeletonLoading: true });
            const result = await axios.get<FeedContests>(`/contest/feed/${userId}`);
            set({ contests: result.data as FeedContests });
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

    registerForContest: async function (contestId, enrollmentNum) {
        try {
            set({ skeletonLoading: true });
            await axios.post(`/contest/register/${contestId}`, { enrollmentNum });
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
            set({ liveContestDetails: result.data });
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
        const contestStore = ContestStore.getState();

        try {
            set({ skeletonLoading: true });
            while (1) {
                const { data }: { data: CheckContestBatchSubmissionType } = await axios.get(
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

                if (data.status === "accepted") {
                    contestStore.updateProblemAttemptStatus(contestProblemId, "Accepted");
                    contestStore.calculateAndUpdatePoints(data.contestProblemId, data.passedTestCases);
                    toast.success("Submission Accepted");
                }

                if (
                    data.status === "executing" ||
                    data.status === "rejected" ||
                    data.status === "run time error" ||
                    data.status === "compilation error" ||
                    data.status === "time limit exceeded"
                ) {
                    contestStore.updateProblemAttemptStatus(contestProblemId, "Attempted");
                    contestStore.calculateAndUpdatePoints(data.contestProblemId, data.passedTestCases);
                }

                if (data.status !== "executing" && data.status !== "pending" && data.status !== "notFound") {
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 300));
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

    updateLeaderBoard: async contestId => {
        try {
            const { data } = await axios.get<LeaderBoardType[]>(`/contest/live-contest/leader-board/${contestId}`);
            set(state => ({
                ...state,
                liveContestDetails: state.liveContestDetails
                    ? {
                          ...state.liveContestDetails,
                          leaderBoard: data,
                      }
                    : undefined,
            }));
        } catch (error) {
            apiErrorHandler(error);
        }
    },

    updateProblemAttemptStatus: (contestProblemId, status) => {
        set(state => ({
            ...state,
            liveContestDetails: state.liveContestDetails
                ? {
                      ...state.liveContestDetails,
                      problems: state.liveContestDetails?.problems?.map(problem =>
                          problem.contestProblemId === contestProblemId ? { ...problem, attemptState: status } : problem,
                      ),
                  }
                : undefined,
        }));
    },

    calculateAndUpdatePoints: (contestProblemId, passedTestCases = undefined) => {
        console.log(
            "Calculating and updating points for contestProblemId:",
            contestProblemId,
            "with passedTestCases:",
            passedTestCases,
        );

        // update individual problem points
        set(state => ({
            ...state,
            liveContestDetails: state.liveContestDetails
                ? {
                      ...state.liveContestDetails,
                      problems: state.liveContestDetails?.problems?.map(problem =>
                          problem.contestProblemId === contestProblemId
                              ? {
                                    ...problem,
                                    scoredPoints:
                                        Math.round(
                                            problem.points *
                                                ((passedTestCases ?? problem.testCasesCount) / problem.testCasesCount) *
                                                100,
                                        ) / 100,
                                }
                              : problem,
                      ),
                  }
                : undefined,
        }));

        // update total scored points
        set(state => ({
            ...state,
            liveContestDetails: state.liveContestDetails
                ? {
                      ...state.liveContestDetails,
                      yourScore: (state => {
                          const bestOf = state?.liveContestDetails?.bestOf;
                          let totalScoredPoints = 0;
                          if (bestOf && bestOf > 0) {
                              totalScoredPoints =
                                  state?.liveContestDetails?.problems
                                      ?.sort((a, b) => b.scoredPoints - a.scoredPoints)
                                      .slice(0, bestOf)
                                      .reduce((acc, problem) => acc + problem.scoredPoints, 0) || 0;
                          } else {
                              totalScoredPoints =
                                  state?.liveContestDetails?.problems?.reduce((acc, problem) => acc + problem.scoredPoints, 0) ||
                                  0;
                          }

                          return totalScoredPoints || 0;
                      })(state),
                  }
                : undefined,
        }));
    },
}));
