import express from 'express'
import { createEntry, deleteEntryCoffee, getTodayEntries, getAnalytics } from '../controllers/entriesController.js'
import { protect } from '../middleware/auth.js'
import Entry from '../models/EntriesModel.js'

const router = express.Router()

router.post('/create-entry', protect, createEntry)
router.get('/entries', protect, getTodayEntries)
router.delete('/delete-entry/:id', protect, deleteEntryCoffee)
router.get('/get-analytics', protect, getAnalytics)

export default router