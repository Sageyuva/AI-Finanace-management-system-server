const userModel = require("../Models/userModel")
const transactionModel = require("../Models/transactionModel")

const addTransactionService = async (userId , amount , category , description)=>{
const user = await userModel.findById(userId)
if(!user){
    throw new Error("User not found")
}

const transaction = await transactionModel.create({
    userId,
    amount,
    category,
    description,
    type : "debit"
})


user.transactions.push(transaction._id)
await user.save()
return transaction
}


const getTransactionsService = async (userId) => {
  const user = await userModel.findById(userId)

  if (!user) {
    throw new Error("User not found")
  }

  await user.populate({
    path: "transactions",
    options: {
      sort: { createdAt: -1 }, // latest first
      limit: 10
    }
  })

  return user.transactions
}


module.exports = {addTransactionService , getTransactionsService}