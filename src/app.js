const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user");
const {validateData} = require("./utils/validate")
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const app = express();
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middleware/auth")

app.use(cookieParser());
app.use(express.json());


app.post("/signup", async (req,res)=>{

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

app.post("/login", async(req,res)=>{
  
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


app.get("/profile", userAuth, async(req,res)=>{
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("There is some problem in getting the profile: " + error.message)
  }
})

app.post("/sendconnectionrequest",userAuth, async(req,res)=>{
  try {
    const user = req.user;
    res.send(user.firstName + " sent a connection request");
  } catch (error) {
    res.status(400).send("There is some problem in sending connection request: " + error.message)
  }
})


app.get("/feed",async (req,res)=>{
  try{
    const users = await User.findById(req.body.id)
    res.send(users)
  }catch(err){
    res.status(400).send("something went wrong")
  }
 
})

connectDB().then(()=>{
    console.log("Database connection established successfully")
    app.listen(7777, () => {
      console.log("Server is listening on port 7777");
    });
  }).catch((err)=>{
  console.error("There is some problem in establishing DB connection", err.message)
})


