import { protect } from '../middleware/authMiddleware.js'
import express from 'express'
import {
    getAllNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote 
} from '../controllers/noteController.js'

const router = express.Router()

// All routes are protected

router.route('/').get(protect,getAllNotes).post(protect,createNote)
router.route('/:id').get(protect,getNote).put(protect,updateNote).delete(protect,deleteNote)

export default router 