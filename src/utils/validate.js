const validator = require("validator");

const validateData = (req)=>{
const {firstName, lastName, emailId, password} = req.body;

if(!firstName || !lastName){
    throw new Error("invalid name. please enter both first name and last name")
}
if(!validator.isEmail(emailId)){
    throw new Error("email is not valid")
}
if(!validator.isStrongPassword(password)){
    throw new Error("please enter a strong password")
}
}

const validateProfileEditInputs = (req)=>{
    const acceptedFieldsToEdit = ["firstName", "lastName","age","gender","about","skills"];
    const isValidEditInputs = Object.keys(req.body).every(key=>acceptedFieldsToEdit.includes(key));
    return isValidEditInputs;
}
module.exports = {validateData, validateProfileEditInputs};