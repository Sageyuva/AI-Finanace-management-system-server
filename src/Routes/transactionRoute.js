const {addTransactionController , getServices , dashboardDataController} = require ("../Controllers/transactionController")
const express = require("express")
const router = express.Router()
const {protectUser} = require("../Middleware/secure")
router.post("/addNew",protectUser,addTransactionController)
router.get("/getTransactions",protectUser,getServices)
router.get("/dashboardData",protectUser,dashboardDataController)
module.exports = router