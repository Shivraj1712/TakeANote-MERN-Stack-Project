import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req,res,next) => {
    try {
        const token = req.cookies.jwt 
        if(!token){
            res.status(401)
            throw new Error('Not authorized , No token')
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.userId || decoded.id).select('-password')
        next();
    } catch (error) {
        res.status(401)
        throw new Error('Not authorized, Invalid token')
    }
})

export {protect}