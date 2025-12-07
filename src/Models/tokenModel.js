const mongoose = require("mongoose")

const tokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*60*24
    },
    type:{
        type:String,
        enum:["Register","ForgotPassword"],
        default:"Register"
    },
    isUsed:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const tokenModel = mongoose.model("TokenModel", tokenSchema)

module.exports = tokenModel
