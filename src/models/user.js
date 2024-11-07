const mongoose = require("mongoose");
const validator = require('validator');

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


// const User = mongoose.model("User", userSchema)

module.exports = mongoose.model("user", userSchema);