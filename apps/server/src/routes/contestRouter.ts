import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createContest, getContestRegisterDetails, getLiveContestDetails, getPublicContests, registerUserForContest } from "../controllers/contestController";
const contestRouter = Router();

contestRouter.post("/create", authMiddleware, createContest);
contestRouter.get("/public", getPublicContests);
contestRouter.post("/register/:contestId", authMiddleware, registerUserForContest);
contestRouter.get("/register-details/:contestId/:userId", getContestRegisterDetails);
contestRouter.get("/live-contest/:contestId", getLiveContestDetails);

export default contestRouter;