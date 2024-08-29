import { Router } from "express";
import { contributeProblem, getProblem, getProblems } from "../controllers/problemController";
import axios from "axios";
import { authMiddleware } from "../middlewares/authMiddleware";
const problemRouter = Router();

problemRouter.post("/contribute", authMiddleware, contributeProblem);
problemRouter.get("/bulk", getProblems);
problemRouter.get("/:id", getProblem);

export default problemRouter;

problemRouter.post("/submission", async (req, res) => {
	const { code, languageId } = req.body;

	// zod validation

	// find problem in db

	// enrich the code of submition

	// send request to judge0 with webhook

	console.log("Request sent");

	const result = await axios.post("http://13.60.180.146:2358/submissions/?base64_encoded=false&wait=false", {
		source_code: code,
		language_id: languageId,
		stdin: "5 5",
		expected_output: "10",
		callback_url: "https://judge0-webhook-handler.vercel.app/submission-callback",
	});

	console.log(result.data);

	// update db

	// response
	return res.json({ token: result.data.token });
});
