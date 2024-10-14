import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = 5757;

app.use(express.json());
app.use(
	cors({
		origin: ["http://localhost:3001"],
	}),
);

app.get("/", (req, res) => {
	res.json({ message: "Webhook handler is up and running! 🚀" });
});

app.post("/submit-task-callback", async (req, res) => {
	console.log("req body: ", req.body);

	try {
		const { submissionId, status } = req.body;

		const submission = await prisma.submission.findUnique({
			where: { id: submissionId },
			select: { problemId: true, difficultyLevel: true, createdById: true, status: true },
		});

		if (!submission) {
			return res.status(404).json({ message: "Submission not found" });
		}

		const prevSub = await prisma.submission.findFirst({
			where: {
				problemId: submission.problemId,
				status: "Accepted",
			},
		});

		let points = undefined;

		if (!prevSub && status === "Accepted") {
			const pointsMap = {
				Basic: 1,
				Easy: 2,
				Medium: 4,
				Hard: 8,
			};

			points = pointsMap[submission.difficultyLevel] || 0;

			await prisma.user.update({
				where: { id: submission.createdById },
				data: { points: { increment: points } },
			});
		}

		await prisma.submission.update({
			where: { id: submissionId },
			data: { status, points: points || 0 },
		});

		if (status === "Accepted") {
			await prisma.problem.update({
				where: { id: submission.problemId },
				data: { acceptedSubmissions: { increment: 1 } },
			});
		}

		return res.json({ message: "Webhook received" });
	} catch (error) {
		console.error("Error updating submission status:", error);
		return res.status(500).json({ message: "Error updating submission status" });
	}
});

app.listen(PORT, () => {
	console.log(`Webhook handler is running on port ${PORT}`);
});
