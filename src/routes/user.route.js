import express from "express";
import { createUserHandler } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUserHandler);

export default router;
