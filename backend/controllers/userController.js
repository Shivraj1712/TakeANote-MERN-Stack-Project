import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
// @desc   Login User 
// @route  POST /api/user/auth
// @access Public
const authUser = asyncHandler(async(req,res)=>{
    const { email , password } = req.body 
    const user = await User.findOne({email})
    if(user && ( await user.matchPassword(password))){
        generateToken(res,user._id)
        return res.status(200).json({
            _id : user._id,
            name : user.name ,
            email : user.email
        })
    }
    res.status(400)
    throw new Error('Invalid email or password')
})

// @desc   Register a new user
// @route  POST /api/user/register
// @access Public
const registerUser = asyncHandler(async (req,res) => {
    const { name , email , password , confirmPassword } = req.body
    if(password != confirmPassword){
        res.status(400)
        throw new Error('Passwords do not match')
    }
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(401)
        throw new Error('User already exists')
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    generateToken(res,user._id)
    res.status(201).json({
        _id : user._id,
        name : user.name,
        email : user.email
    })
})

// @desc   Logout a User 
// @route  POST /api/user/logout
// @access Private
const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly : true,
        expires : new Date(0)
    })
    res.status(200).json({
        message : 'Logged out successfully'
    })
})

// @desc   Get user Profile
// @route  Get /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async(req,res)=>{
    res.status(200).json({
        _id : req.user._id,
        name : req.user.name,
        email : req.user.email 
    })
})

// @desc   Update a user profile
// @route  PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async(req,res)=>{
    const { name , email , password , confirmPassword } = req.body
    
    if(password && password !== confirmPassword){
        res.status(400)
        throw new Error('Both passwords do not match')
    }

    const user = await User.findById(req.user._id)

    user.name = name || user.name 
    user.email = email || user.email 

    if (password) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        user.password = hashedPassword
    }

    await user.save()

    res.status(200).json({
        message : 'User Profile updated'
    })
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}
