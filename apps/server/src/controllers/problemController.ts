import { Request, Response } from "express";
import { getObjectFromS3, uploadJsonToS3 } from "../services/awsS3";
import { generateUniqueSlug } from "../helper/generateUniqueSlug";
import { generateBoilerplate } from "../services/boilerplateGenerator/boilerplateGenerator";
import { PrismaClient } from "@prisma/client";
import { problemSchema, sumitSolutionSchema, TestCaseType } from "@repo/common/zod";
import { generateSubmissionCode } from "../services/boilerplateGenerator/submissionCodeGenerator";
import axios from "axios";
import { sortAndDeduplicateDiagnostics } from "typescript";
const prisma = new PrismaClient();

export async function contributeProblem(req: Request, res: Response) {
	try {
		const parsed = problemSchema.safeParse(req.body);
		if (!parsed.success) return res.status(422).json({ message: "Invalid data" });

		const {
			title,
			difficultyLevel,
			description,
			sampleTestCases,
			testCases,
			functionStructure,
			topicTags,
			hints,
			constraints,
		} = parsed.data;

		const slug = await generateUniqueSlug(title);

		await Promise.all([
			uploadJsonToS3(`problem-test-cases/${slug}/sampleTestCases.json`, sampleTestCases),
			uploadJsonToS3(`problem-test-cases/${slug}/testCases.json`, testCases),
		]);

		const boilerplateCode = generateBoilerplate(functionStructure);
		const submissionCode = generateSubmissionCode(functionStructure);

		const topicTagIdsToAdd = await Promise.all(
			topicTags
				.filter((tag) => tag.trim())
				.map(async (tag) => {
					const existingTag = await prisma.topicTag.findFirst({ where: { content: tag } });
					if (existingTag) {
						return existingTag.id;
					} else {
						const newTag = await prisma.topicTag.create({ data: { content: tag } });
						return newTag.id;
					}
				}),
		);

		const newProblem = await prisma.problem.create({
			data: {
				title,
				problemNumber: 1,
				slug: slug,
				description: description,
				difficultyLevel: difficultyLevel,
				sampleTestCasesKey: `problem-test-cases/${slug}/sampleTestCases.json`,
				testCasesKey: `problem-test-cases/${slug}/testCases.json`,
				boilerplateCode: JSON.stringify(boilerplateCode),
				submissionCode: JSON.stringify(submissionCode),
				functionStructure: JSON.stringify(functionStructure),
				constraints: {
					create: constraints.map((constraint: string) => ({
						content: constraint,
					})),
				},
				topicTags: {
					connect: topicTagIdsToAdd.map((id) => ({ id })),
				},
				hints: {
					create: hints.map((hint: string) => ({
						content: hint,
					})),
				},
				createdBy: {
					connect: {
						id: req.user?.id,
					},
				},
			},
		});

		res.status(201).json({
			message: "Problem created successfully",
			problem: newProblem,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
}

export async function getProblems(req: Request, res: Response) {
	try {
		const problems = await prisma.problem.findMany({
			take: 50,
			orderBy: {
				problemNumber: "asc",
			},
			select: {
				id: true,
				problemNumber: true,
				title: true,
				difficultyLevel: true,
				submissionCount: true,
				acceptedSubmissions: true,
			},
		});

		const editedProblems = problems.map((problem) => {
			const acceptanceRate =
				problem.submissionCount > 0 ? ((problem.acceptedSubmissions / problem.submissionCount) * 100).toFixed(2) : "0.00";

			return {
				id: problem.id,
				problemNumber: problem.problemNumber,
				title: problem.title,
				difficulty: problem.difficultyLevel,
				acceptanceRate: `${acceptanceRate}%`,
			};
		});

		return res.status(200).json(editedProblems);
	} catch (err) {
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
}

export async function getProblem(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const problem = await prisma.problem.findFirst({
			where: { id },
			select: {
				id: true,
				problemNumber: true,
				title: true,
				description: true,
				difficultyLevel: true,
				sampleTestCasesKey: true,
				constraints: { select: { content: true } },
				topicTags: { select: { content: true } },
				hints: { select: { content: true } },
				boilerplateCode: true,
				createdBy: {
					select: {
						id: true,
						userName: true,
						profileImg: true,
					},
				},
				submissionCount: true,
				acceptedSubmissions: true,
			},
		});

		if (!problem) return;

		const sampleTestCasesJson = await getObjectFromS3(problem.sampleTestCasesKey);
		const parsedTestCases = JSON.parse(sampleTestCasesJson);

		const acceptanceRate =
			problem.submissionCount > 0 ? ((problem.acceptedSubmissions / problem.submissionCount) * 100).toFixed(2) : "0.00";

		const { sampleTestCasesKey, ...editedProblem } = {
			...problem,
			exampleTestCases: parsedTestCases,
			acceptanceRate,
			boilerplateCode: JSON.parse(problem.boilerplateCode),
		};
		return res.status(200).json(editedProblem);
	} catch (err) {
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
}

export async function sumitSolution(req: Request, res: Response) {
	const { id, language, solutionCode } = req.body;

	try {
		// zod validation
		const parsed = sumitSolutionSchema.safeParse(req.body);
		if (!parsed.success) return res.status(422).json({ message: "Invalid data" });
		const { id, language, solutionCode } = parsed.data;

		const problem = await prisma.problem.findFirst({
			where: { id },
			select: {
				id: true,
				testCasesKey: true,
				submissionCode: true,
			},
		});

		if (!problem) return res.status(404).json({ message: "Problem not found" });

		const testCases: TestCaseType[] = JSON.parse(await getObjectFromS3(problem.testCasesKey));
		const submissionCode: { c: string; cpp: string; java: string; python3: string } = JSON.parse(problem.submissionCode);

		const finalCode = submissionCode[language].replace("{solution_code}", solutionCode);

		const tokens = axios.post("http://x.x.x.x:2358/submissions", {
			submissions: testCases.map((testCase) => ({
				language_id: language,
				source_code: finalCode,
				stdin: testCase.input,
				expected_output: testCase.output,
			})),
		});

		// entry in db

		// return tokens
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
}
