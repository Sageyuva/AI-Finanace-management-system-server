const express = require("express")
const router = express.Router()
const {registerUserController,verifyUserController,loginUserController} = require("../Controllers/userAuthController")

router.post("/register",registerUserController)
router.get("/verify",verifyUserController)
router.post("/login",loginUserController)

module.exports = router
