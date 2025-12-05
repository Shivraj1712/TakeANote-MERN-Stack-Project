import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import noteRoutes from './routes/noteRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import cors from 'cors'

dotenv.config()
connectDB()
const app = express()

app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true,                
}))

app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cookieParser())

// Notes routing 
app.use('/api/user',userRoutes)
// User routing
app.use('/api/notes',noteRoutes)


app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(port,()=> console.log('Server is running on port 5000'))