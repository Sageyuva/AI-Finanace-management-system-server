const {addTransactionService , getTransactionsService , dashboardDataService} = require("../Services/transactionsServices") 
const catchAsync = require("../Utils/catchAsync")
const sendResponse = require("../Utils/GlobalResponse/sendResponse")
const addTransactionController = catchAsync(async (req,res)=>{
    const userId = req.user._id
    const {amount,category,description} = req.body
    const transaction = await addTransactionService(userId,amount,category,description)
    return sendResponse(res,200,"Transaction added successfully",transaction)
})

const getServices = catchAsync(async (req,res)=>{
    const userId = req.user._id
    const transactions = await getTransactionsService(userId)
    return sendResponse(res,200,"Transactions fetched successfully",transactions)
})

const dashboardDataController = catchAsync(async (req,res)=>{
    const userId = req.user._id
    const data = await dashboardDataService(userId)
    return sendResponse(res,200,"Dashboard data fetched successfully",data)
})
module.exports = {addTransactionController , getServices , dashboardDataController}
