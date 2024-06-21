import express from "express";
import { createAccomo, deleteAccomodation, getAccomodation, updateAccomodation } from "../controllers/accomo.controller.js";
import { verifyToken } from "../utilis/verifyUser.js";

const router = express.Router();

router.post('/create',verifyToken, createAccomo);
router.delete('/delete/:id', verifyToken, deleteAccomodation );
router.post('/update/:id', verifyToken, updateAccomodation);
router.get('/get/:id', getAccomodation);


export default router
