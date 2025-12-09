const express = require("express")
const router = express.Router()
const {registervalidationSchema} = require("../Validatoins/authValidations")
const {registerUserController,verifyUserController,loginUserController} = require("../Controllers/userAuthController")
const validate = require("../Middleware/validateSecure")
router.post("/register",validate(registervalidationSchema),registerUserController)
router.get("/verify",verifyUserController)
router.post("/login",loginUserController)

module.exports = router