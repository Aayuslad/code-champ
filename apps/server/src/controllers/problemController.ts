import { Request, Response } from "express";
import { uploadJsonToS3 } from "../services/awsS3";
import { generateUniqueSlug } from "../helper/generateUniqueSlug";
import { generateBoilerplate } from "../services/boilerplateGenerator/generateBoilerplate";
import { PrismaClient } from "@prisma/client";
import { problemSchema } from "@repo/common/zod";
const prisma = new PrismaClient();

export async function contributeProblem(req: Request, res: Response) {
	const { title, problemStatement, structre, sampleTestCases, testCases, constraints, difficulty, topicTags, Hints } = req.body;

	try {
		const parsed = problemSchema.safeParse({
			title,
			problemStatement,
			structre,
			sampleTestCases,
			testCases,
			constraints,
			difficulty,
			topicTags,
			Hints,
		});
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
		console.error("Error in contributeProblem:", err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
}
