import express from "express";
import { createAccomo } from "../controllers/accomo.controller.js";
import { verifyToken } from "../utilis/verifyUser.js";

const router = express.Router();

router.post('/create',verifyToken, createAccomo);


export default router
