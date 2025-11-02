import express from 'express'
import { addCoffee, getAllCoffee, getAnalytics } from '../controllers/coffeeController.js'

const router = express.Router()

router.post('/add-coffee', addCoffee)
router.get('/get-coffee', getAllCoffee)
router.get("/analytics", getAnalytics)

export default router