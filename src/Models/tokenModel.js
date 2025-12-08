const mongoose = require("mongoose")

const tokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:604800
    },
    ip:{
        type:String,
        required:true
    },
    useragent:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["verify","reset"],
        default:"verify"
    },
    isUsed:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const tokenModel = mongoose.model("tokenModel",tokenSchema)

module.exports = tokenModel
