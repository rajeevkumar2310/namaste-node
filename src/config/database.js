const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://rajeevkumargorikapudi:toyy55sGzOlwC65n@namaste-node.aku4m.mongodb.net/devTinder');
}

module.exports = connectDB;