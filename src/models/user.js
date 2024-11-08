const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 4
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email format");
            }
        }
    },
    password:{ 
        type: String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("not a strong password!!")
            }
        }
    },
    age:{
        type: Number,
        min:18
    },
    gender:{
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("invalid gender")
            }
        }
    },
    about:{
        type:String,
        default: "This is a default description about the user!"
    },
    skills:{
        type:[String]
    }
}, {timestamps: true})

userSchema.methods.createJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id}, "300thisissparta");
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const passwordHashOfUserFromDB = this.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHashOfUserFromDB)
    return isPasswordValid;
}
// const User = mongoose.model("User", userSchema)

module.exports = mongoose.model("user", userSchema);