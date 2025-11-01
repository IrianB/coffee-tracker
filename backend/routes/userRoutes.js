import { addUser } from "../controllers/userController.js";
import User from "../models/User.js";
import express from 'express'

const router = express.Router()

router.post('/register', addUser)

export default router