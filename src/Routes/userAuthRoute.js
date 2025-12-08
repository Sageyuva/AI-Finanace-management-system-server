const express = require("express")
const router = express.Router()
const {registerUserController,verifyUserController} = require("../Controllers/userAuthController")

router.post("/register",registerUserController)
router.get("/verify",verifyUserController)

module.exports = router
