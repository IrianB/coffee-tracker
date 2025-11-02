import express from 'express'
import { addCoffee, deleteCoffee, getAllCoffee, getAnalytics } from '../controllers/coffeeController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/add-coffee', protect, addCoffee)
router.get('/get-coffee', protect, getAllCoffee)
router.get("/analytics", getAnalytics)
router.delete('/delete/:id', deleteCoffee)

export default router