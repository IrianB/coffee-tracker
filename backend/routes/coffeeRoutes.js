import express from 'express'
import { addCoffee, deleteCoffee, getAllCoffee, getAnalytics } from '../controllers/coffeeController.js'

const router = express.Router()

router.post('/add-coffee', addCoffee)
router.get('/get-coffee', getAllCoffee)
router.get("/analytics", getAnalytics)
router.delete('/delete/:id', deleteCoffee)

export default router