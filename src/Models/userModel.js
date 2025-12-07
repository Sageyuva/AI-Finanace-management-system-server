const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true       
    },
    password:{
        type:String,
        required:true ,
       select:false      
    },
    email:{
        type:String,
        required:true   ,
        unique:true,
        index:true,
        lowercase:true,  
    },
    role:{
        type:String,
        enum:["User","Admin","Manager"],
        default:"User"
    },
    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    },
    verified:{
        type:Boolean,
        default:false
    },
    termsandconditions:{
        type:Boolean,
        default:false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},{timestamps:true})

const userModel = mongoose.model("UserModel", userSchema)

module.exports = userModel