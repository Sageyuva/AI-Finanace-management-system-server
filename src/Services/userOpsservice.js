const userModel = require("../Models/userModel")

//const Update User balance service
const updateBalanceService = async(userId,amount) => {
    const user = await userModel.findById(userId)
    if(!user){
        throw new Error("User not found")
    }
    user.balance = user.balance + amount
    await user.save()
    return user.balance
}
module.exports = {updateBalanceService}