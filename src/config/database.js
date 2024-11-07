const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://rajeevkumargorikapudi:uYNosCSWpdmnqnbP@namaste-node.aku4m.mongodb.net/devTinder');
}

module.exports = connectDB;