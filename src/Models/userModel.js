const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,
    unique:true,
    index:true,
    lowercase:true
   },
   password:{
    type:String,
    required:true,
    select:false

   },
   isVerified:{
    type:Boolean,
    default:false
   },
   role:{
    type:String,
    enum:["user","admin"],
    default:"user"
   },
   termsAndConditions:{
    type:Boolean,
    default:true
   },   
},{timestamps:true})


const userModel = mongoose.model("userModel", userSchema)

module.exports = userModel