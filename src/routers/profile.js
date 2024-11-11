const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth")
const {validateProfileEditInputs} = require("../utils/validate")
const bcrypt = require("bcrypt");


profileRouter.get("/profile/view", userAuth, async(req,res)=>{
    try {
      const user = req.user;
      res.send(user);
    } catch (error) {
      res.status(400).send("There is some problem in getting the profile: " + error.message)
    }
  })

  profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try{
        const isValidEditInputs = validateProfileEditInputs(req)
        if(!isValidEditInputs){
            throw new Error("invalid inputs!!! try only accepted fields to update")
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key]);
        await loggedInUser.save();
        res.json({message: `${loggedInUser.firstName}, your profile got updated successfully!!!`, data: loggedInUser});
    }catch(error){
        res.status(400).send("Problem in updating the profile: " + error.message)
    }
  })

  profileRouter.patch("/profile/password",userAuth, async(req,res)=>{
    try{
    const {currentPassword, newPassword, confirmPassword} = req.body;
    const loggedInUser = req.user;
    const isCurrentPasswordValid = await loggedInUser.validatePassword(currentPassword); 
    if(!isCurrentPasswordValid){
        throw new Error("current password entered is incorrect.")
    }
    if(newPassword!==confirmPassword){
        throw new Error("password and confirm passwords are not matching!")
    }
        const newPasswordHash = await bcrypt.hash(newPassword,10);
        loggedInUser.password = newPasswordHash;
        await loggedInUser.save();
        res.send("password update successful!!!!!!")
    }catch(error){
        res.status(400).send("something went wrong! " + error.message)
    }
  })

  module.exports = profileRouter;