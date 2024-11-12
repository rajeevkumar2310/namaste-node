const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type:String,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{VALUE} is not a valid status type`
        },
        required: true,
    }
},{timestamps: true})

connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send connection request to yourself!")
    }
    next();
})

const ConnectionRequest = mongoose.model("connectionRequests",connectionRequestSchema); 
module.exports = ConnectionRequest;