import axios from "axios";
import { create } from "zustand";
import apiErrorHandler from "../helper/apiCallErrorHandler";

export type boilerplateCode = {
	c: string;
	cpp: string;
	java: string;
	python3: string;
};

export interface ProblemType {
	id: string;
	problemNumber: number;
	title: string;
	description: string;
	difficultyLevel: string;
	constraints: {
		content: string;
	}[];
	topicTags: {
		content: string;
	}[];
	hints: {
		content: string;
	}[];
	boilerplateCode: boilerplateCode;
	createdBy: {
		id: string;
		userName: string;
		profileImg: string | null;
	};
	exampleTestCases: {
		input: string;
		output: string;
		explanation: string;
	}[];
	acceptanceRate: string;
	submissionCount: number;
	acceptedSubmissions: number;
}

interface OnGoingProblem {
	problemId: string;
	language: string;
	solutionCode: string;
}

type OnGoingProblems = {
	[problemId: string]: {
		[language: string]: OnGoingProblem;
	};
};

interface ProblemStoreType {
	skeletonLoading: boolean;
	problems:
		| {
				id: string;
				problemNumber: number;
				title: string;
				difficulty: string;
				acceptanceRate: string;
		  }[]
		| [];
	onGoingProblems: OnGoingProblems;

	getProblems: () => Promise<void>;
	getProblem: (values: { id: string }) => Promise<ProblemType | undefined>;
	setOnGoingPrblem: (values: { problemId: string; solutionCode: string; language: string }) => void;
}

export const ProblemStore = create<ProblemStoreType>((set) => ({
	problems: [],
	skeletonLoading: false,
	onGoingProblems: {},

	getProblems: async function () {
		try {
			set({ skeletonLoading: true });
			const result = await axios.get("/problem/bulk");
			set({ problems: result.data });
		} catch (error) {
			apiErrorHandler(error);
		} finally {
			set({ skeletonLoading: false });
		}
	},

	getProblem: async function (values) {
		try {
			set({ skeletonLoading: true });
			const result = await axios.get(`/problem/${values.id}`);
			return result.data as ProblemType;
		} catch (error) {
			apiErrorHandler(error);
		} finally {
			set({ skeletonLoading: false });
		}
	},

	setOnGoingPrblem: function (values: OnGoingProblem) {
		set((state) => ({
			onGoingProblems: {
				...state.onGoingProblems,
				[values.problemId]: {
					...(state.onGoingProblems[values.problemId] || {}),
					[values.language]: values,
				},
			},
		}));
	},
}));
