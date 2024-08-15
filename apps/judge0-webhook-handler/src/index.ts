import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Webhook server is listning...");
});

app.post("/submission-callback", (req, res) => {
    console.log("Received callback:", req.body);
    res.status(200).send("OK");
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log("Weebhook handler is listening on port ", PORT);
});
