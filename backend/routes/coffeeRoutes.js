import express from 'express'
import { addCoffee, getAllCoffee } from '../controllers/coffeeController.js'

const router = express.Router()

router.post('/add-coffee', addCoffee)
router.get('/get-coffee', getAllCoffee)

export default router