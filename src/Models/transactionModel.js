const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        enum:["credit","debit"],
        default:"credit"
    },
    category:{
        type:String,
        lowercase:true,
        default:"expense"
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    
})

const transactionModel = mongoose.model("transactionModel",transactionSchema)

module.exports = transactionModel
