const express = require("express");
const User = require("../models/user")
const userRouter = express.Router();
const {userAuth} = require("../middleware/auth")
const ConnectionRequest = require("../models/connectionRequest");
const USER_SAFE_DATA = "firstName lastName about";



userRouter.get("/user/requests",userAuth, async (req,res)=>{
    try{
      const loggedInUser = req.user;
      const connectionRequests = await ConnectionRequest.find({toUserId:loggedInUser._id, status: "interested"}).populate("fromUserId",USER_SAFE_DATA);
      if(!connectionRequests.length){
        return res.status(400).json({message: "There are no connection requests for you. Please try again after sometime"});
      }
      
      res.status(200).json({message: "data fetched successfully", requests: connectionRequests});
    }catch(err){
      res.status(400).send("something went wrong: "+err.message)
    }
  })


  userRouter.get("/user/connections",userAuth, async(req,res)=>{
    try{
      const loggedInUser = req.user;
      const connections = await ConnectionRequest.find({$or:[{fromUserId:loggedInUser._id,status:"accepted"},{toUserId:loggedInUser._id,status:"accepted"}]}).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
      const users = connections.map(row=>{
        if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
          return row.toUserId
        }else{
          return row.fromUserId
        }
      });
      res.status(200).json({message:"connections fetched successfully", users});
    }catch(error){
      res.status(400).send("There is some error in fetching connections: ", error.message)
    }
  })

  userRouter.get("/feed", userAuth, async(req,res)=>{
    try{

      const page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
      limit = limit>50?50:limit;

      const skip = (page-1)*limit;

      const loggedInUser = req.user;
      const connectionRequests = await ConnectionRequest.find({$or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}]}).select("fromUserId toUserId");
      
      const hideUsersFromFeed = new Set();
      connectionRequests.forEach((request)=>{
        hideUsersFromFeed.add(request.fromUserId._id.toString())
        hideUsersFromFeed.add(request.toUserId._id.toString())
      })

      const feed = await User.find({$and:[{_id:{$nin:Array.from(hideUsersFromFeed)}},{_id:{$ne:loggedInUser._id}}]}).select(USER_SAFE_DATA).skip(skip).limit(limit);
      
      res.status(200).json({message: "users fetched successfully", feed})
    }catch(error){
      res.status(400).json({message: error.message})
    }
  })

  module.exports = userRouter;