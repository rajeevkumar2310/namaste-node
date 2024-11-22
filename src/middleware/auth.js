const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async(req,res,next)=>{
    try{
    const cookie = req.cookies;
    const {token} = cookie;
    if(!token){
     return res.status(401).send("You are not authorized!! Please login!")
    }
    const userId = await jwt.verify(token, "300thisissparta");
    const {_id} = userId;
    const user = await User.findById(_id)
    req.user = user;
    next();
}catch(error){
    res.status(400).send("There is a problem in authenticating user: " + error.message);
}
}

module.exports = {userAuth};
