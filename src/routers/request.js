const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res)=>{
    try {
      const fromUserId = req.user._id;
      const status = req.params.status;
      const toUserId = req.params.toUserId;

      // always check for corner cases.
      // in connection request api, accepted statuses are only interested and ignored. Not anything else.
      const allowedStatuses = ["interested","ignored"];
      
      if(!allowedStatuses.includes(status)){
        return res.status(400).json({message:"invalid status: " + status});
      }

      // what if connection request already exists? i.e., user A already sent a request to user B?
      // what if user A already sent connection request to user B., 
      // and now user B is trying to send connection request to user A. This should not happen.
      const existingConnectionRequest = await ConnectionRequest.findOne({$or:[
        {fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]})

      if(existingConnectionRequest){
          return res.status(400).json({message:"request already exists"})
        }

        // what if user tries to send request to a userId which is not even in our DB?
        // we should handle that scenario as well
        const toUser = await User.findById(toUserId);
        if(!toUser){
          return res.status(404).json({message: "user not found!!"})
        }

        // what if user tries to send request to himself? This should not be allowed as well.
        // lets handle this at schema level

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      })

      const connectionRequestData = await connectionRequest.save();

      res.json({
        message: req.user.firstName + " " + status + " " + toUser.firstName,
        data: connectionRequestData,
      })

    } catch (error) {
      res.status(400).send("There is some problem in sending connection request: " + error.message)
    }
  })


  module.exports = requestRouter;