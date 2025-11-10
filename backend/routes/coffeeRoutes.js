import express from 'express'
import { addCoffee, deleteCoffee, getAllCoffee, updateCoffee } from '../controllers/coffeeController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/add-coffee', protect, addCoffee)
router.get('/get-coffee', protect, getAllCoffee)
router.delete('/delete/:id', deleteCoffee)
router.patch('/update/:id', updateCoffee)

export default router