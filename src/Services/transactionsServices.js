const userModel = require("../Models/userModel")
const transactionModel = require("../Models/transactionModel")


const dashboardDataService = async (userId) => {
  const user = await userModel.findById(userId)
  if (!user) throw new Error("User not found")

  // TODAY
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)

  // THIS WEEK
  const startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date()
  endOfWeek.setHours(23, 59, 59, 999)

  const transactionIds = user.transactions
  const balance = await userModel.findById(userId).select("balance")
  const userBalance = balance.balance
  const [todayTransactions, weekTransactions, last10Transactions ] =
    await Promise.all([
  
      // Today
      transactionModel.find({
        _id: { $in: transactionIds },
        date: { $gte: startOfDay, $lte: endOfDay }
      }).sort({ date: -1 }),

      // This Week
      transactionModel.find({
        _id: { $in: transactionIds },
        date: { $gte: startOfWeek, $lte: endOfWeek }
      }).sort({ date: -1 }),

      // Last 10
      transactionModel.find({ _id: { $in: transactionIds } })
        .sort({ createdAt: -1 })
        .limit(10)
    ])

  return { 
    todayTransactions,
    weekTransactions,
    last10Transactions,
    userBalance
  }
}

//Add transaction service
const addTransactionService = async (userId , amount , category , description)=>{
//check if user is valid
  const user = await userModel.findById(userId)
if(!user){
    throw new Error("User not found")
}

if(user.balance===0){
    throw new Error("Insufficient balance")
}

//update user balance 
user.balance = user.balance - amount
await user.save()

//add teh data into teh database
const transaction = await transactionModel.create({
    userId,
    amount,
    category,
    description,
    type : "debit"
})


//push the transaction id into the user transactions array
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


module.exports = {addTransactionService , getTransactionsService , dashboardDataService}