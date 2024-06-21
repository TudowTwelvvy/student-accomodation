import express from "express";
import { deleteUser, getUserAccomodations, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utilis/verifyUser.js";

const router = express.Router()

router.get('/test', test);
router.post('/update/:id',verifyToken, updateUser);
router.delete('/delete/:id',verifyToken, deleteUser);
router.get('/accomodations/:id',verifyToken, getUserAccomodations )

export default router