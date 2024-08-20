import express from "express";
import "dotenv/config";
import axios from "axios";
import cookieParser from "cookie-parser";	
import userRouter from "./routes/userRoutes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.set("trust proxy", 1);
app.use(
	cors({
		origin: ["https://app.code-champ.xyz", "http://localhost:5173"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
);
app.use(express.json());
app.use(cookieParser());
app.disable("x-powerd-by");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Welcome, This is code champ server 🔥.");
});

app.use("/user", userRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});












































app.post("/submission", async (req, res) => {
	const { code, languageId, stdin } = req.body;

	// zod validation

	// find problem in db

	// enrich the code of submition

	// send request to judge0 with webhook

	const result = await axios.post("http://13.53.112.65:2358/submissions", {
		source_code: code,
		language_id: languageId,
		stdin: stdin,
		callback_url: "https://judge0-webhook-handler.vercel.app/submission-callback",
	});

	// update db

	// response
	return res.json({ token: result.data.token });
});
