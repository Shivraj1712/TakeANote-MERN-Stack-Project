import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userController.js' 

const router = express.Router()

// Public Routes
router.post('/auth',authUser)
router.post('/register',registerUser)

// Private Routes
router.post('/logout',protect,logoutUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)

export default router 