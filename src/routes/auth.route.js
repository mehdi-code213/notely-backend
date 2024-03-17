import express from "express";
import { userLoginHandler, userRefreshHandler } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", userLoginHandler);
router.get("/refresh", userRefreshHandler);

export default router;
