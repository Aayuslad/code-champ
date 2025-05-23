import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
import problemRouter from "./routes/problemRouter";
import cors from "cors";
import session from "express-session";
import morgan from "morgan";
import bodyParser from "body-parser";
import passport from "./middlewares/passportMiddleware";
import contestRouter from "./routes/contestRouter";
import "./services/cronJobs";
import contestProblemRouter from "./routes/contestProblemRouter";

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
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(cookieParser());
app.disable("x-powerd-by");
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(
    session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 5 * 60 * 1000, // 5 minutes
            secure: true,
            httpOnly: true,
            sameSite: "none",
        },
    }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Welcome, This is code champ server 🔥.");
});

app.use("/user", userRouter);
app.use("/problem", problemRouter);
app.use("/contest", contestRouter);
app.use("/contest-problem", contestProblemRouter);
    
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
