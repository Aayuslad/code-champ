import { Request, Response } from "express";
import { getObjectFromS3, uploadJsonToS3 } from "../services/awsS3";
import { generateUniqueSlug } from "../helper/generateUniqueSlug";
import { generateBoilerplate } from "../services/boilerplateGenerator/generateBoilerplate";
import { PrismaClient } from "@prisma/client";
import { problemSchema } from "@repo/common/zod";
const prisma = new PrismaClient();

export async function contributeProblem(req: Request, res: Response) {
	const { title, problemStatement, structre, sampleTestCases, testCases, constraints, difficulty, topicTags, Hints } = req.body;

	try {
		const parsed = problemSchema.safeParse(req.body);
		if (!parsed.success) return res.status(422).json({ message: "Invalid data" });

		// generate slug
		const slug = await generateUniqueSlug(title);

		// upload sample test cases .json to s3
		await uploadJsonToS3(`problem-test-cases/${slug}/sampleTestCases.json`, sampleTestCases);

		// upload test cases .json to s3
		await uploadJsonToS3(`problem-test-cases/${slug}/testCases.json`, testCases);

		// generate boilerplate code for all languages
		const boilerplateCode = generateBoilerplate(structre);

		// Prepare topic IDs to connect
		let topicTagIdsToAdd: string[] = [];
		if (topicTags && topicTags.length > 0) {
			// Check if topics already exist in the database
			for (const tag of topicTags) {
				if (tag == "") continue;

				const existingTopicTags = await prisma.topicTag.findFirst({
					where: {
						content: tag,
					},
				});

				if (existingTopicTags) {
					// If topic already exists, get its ID
					topicTagIdsToAdd.push(existingTopicTags.id);
				} else {
					// If topic doesn't exist, create it and get its ID
					const newTopic = await prisma.topicTag.create({
						data: {
							content: tag,
						},
					});
					topicTagIdsToAdd.push(newTopic.id);
				}
			}
		}

		// update the db
		const newProblem = await prisma.problem.create({
			data: {
				title,
				problemNumber: 1,
				slug,
				problemStatement,
				difficulty,
				sampleTestCasesObjectkey: `problem-test-cases/${slug}/sampleTestCases.json`,
				testCasesObjectKey: `problem-test-cases/${slug}/testCases.json`,
				constraints: {
					create: constraints.map((constraint: string) => ({
						content: constraint,
					})),
				},
				topicTags: {
					connect: topicTagIdsToAdd.map((id) => ({ id })),
				},
				hints: {
					create: Hints.map((hint: string) => ({
						content: hint,
					})),
				},
				boilerplateCode: JSON.stringify(boilerplateCode),
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
				difficulty: true,
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
				difficulty: problem.difficulty,
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
				problemStatement: true,
				difficulty: true,
				sampleTestCasesObjectkey: true,
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

		const sampleTestCasesJson = await getObjectFromS3(problem.sampleTestCasesObjectkey);
		const parsedTestCases = JSON.parse(sampleTestCasesJson);

		const acceptanceRate = problem.submissionCount > 0
			? ((problem.acceptedSubmissions / problem.submissionCount) * 100).toFixed(2)
			: "0.00";

		const { sampleTestCasesObjectkey, ...editedProblem } = {
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
