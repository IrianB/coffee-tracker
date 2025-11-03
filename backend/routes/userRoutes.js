import { addUser, getUserById, loginUser, updateUser } from "../controllers/userController.js";
import User from "../models/User.js";
import express from 'express'

const router = express.Router()

router.post('/register', addUser)
router.post('/login', loginUser)
router.get('/:id', getUserById)
router.patch('/update/:id', updateUser)

export default router