import express from "express";
const app = express();
import "dotenv/config";
import axios from "axios";

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome, This is code champ server.");
});

app.post("/submition", async (req, res) => {
	// zod validation

	// find problem in db

	// enrich the code of submition

	// send request to judge0 with webhook
	const result = await axios.post("http://13.60.49.121:2358/submissions", {
		source_code:
			'#include <stdio.h>\n\nint main(void) {\n  char name[10];\n  scanf("%s", name);\n  printf("%s\\n", name);\n  return 0;\n}',
		language_id: 75,
		stdin: "aayushandwo",
		callback_url: "http://ip_or_domain/submission-callback",
	});

	console.log(result);

	// update db
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
