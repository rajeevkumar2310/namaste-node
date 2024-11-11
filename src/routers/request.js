const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middleware/auth");


requestRouter.post("/sendconnectionrequest",userAuth, async(req,res)=>{
    try {
      const user = req.user;
      res.send(user.firstName + " sent a connection request");
    } catch (error) {
      res.status(400).send("There is some problem in sending connection request: " + error.message)
    }
  })


  module.exports = requestRouter;