import { addUser, loginUser } from "../controllers/userController.js";
import User from "../models/User.js";
import express from 'express'

const router = express.Router()

router.post('/register', addUser)
router.post('/login', loginUser)

export default router