const {updateBalanceService} = require("../Services/userOpsservice")
const catchAsync = require("../Utils/catchAsync")
const sendResponse = require("../Utils/GlobalResponse/sendResponse")

const updateUserBalanceController  =  catchAsync(async (req,res,next) => {
    const userId = req.user._id
    const {amount} = req.body
    const user = await updateBalanceService(userId,amount)
    return sendResponse(res,200,"Balance updated",user)
})

module.exports = {updateUserBalanceController}