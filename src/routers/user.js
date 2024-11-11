const express = require("express");
const User = require("../models/user")
const userRouter = express.Router();



userRouter.get("/feed",async (req,res)=>{
    try{
      const users = await User.findById(req.body.id)
      res.send(users)
    }catch(err){
      res.status(400).send("something went wrong")
    }
   
  })


  module.exports = userRouter;