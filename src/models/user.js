const mongoose = require("mongoose");

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
        unique:true
    },
    password:{ 
        type: String,
        validate(value){
            const myRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            if(!myRegex.test(value)){
                throw new Error("password must contain atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special char")
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