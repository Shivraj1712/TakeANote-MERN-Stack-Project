import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true 
    },
    email :{
        type : String ,
        required : true ,
        trim : true ,
        unique : true ,
        lowercase : true  
    },
    password : {
        type : String ,
        required : true ,
        minlength : 8 
    },
},{
    timestamps : true 
})


// Compare Passwords 
userSchema.methods.matchPassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model('User',userSchema)
export default User 