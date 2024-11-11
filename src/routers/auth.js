const express = require("express")
const User = require("../models/user");
const {validateData} = require("../utils/validate")
const bcrypt = require("bcrypt");
const validator = require("validator");
const authRouter = express.Router();




authRouter.post("/signup", async (req,res)=>{

    try {
      // validate request.body
    validateData(req);
  
    const {firstName, lastName, emailId, password} = req.body;
  
    const passwordHash = await bcrypt.hash(password, 10);
  
    // console.log(passwordHash);
  
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
  
      await user.save();
      res.send("User saved successfuly")
    } catch (error) {
      res.status(400).send("There is some problem in saving the data: " + error.message)
    }
  })
  
  authRouter.post("/login", async(req,res)=>{
    
    try {
      
      const {emailId, password} = req.body;
      
      if(!validator.isEmail(emailId)){
       throw new Error("please enter valid email") 
      }
      
      const user = await User.findOne({emailId})
      
      if(!user){
        throw new Error("User not registered with us")
      }
      
      const isValidPassword = await user.validatePassword(password);
      
      if(!isValidPassword){
        throw new Error("Incorrect password!")
      }else{
        // create a jwt token
        const token = await user.createJWT();
        res.cookie("token",token)
        res.send("Logged in Successfully!!")
      }
    } catch (error) {
      res.status(400).send("There is some problem logging in: " + error.message)
    }
  })

  authRouter.post("/logout", async(req,res)=>{
    res.cookie("token",null,{expires: new Date(Date.now())})
    res.send("logged out successfully!!")
  })

  module.exports = authRouter;