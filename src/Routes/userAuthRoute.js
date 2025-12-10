const express = require("express")
const router = express.Router()
const {registervalidationSchema , forgotValidationSchema} = require("../Validatoins/authValidations")
const { forgotPasswordController, registerUserController,verifyUserController,loginUserController,updateForgotPasswordController} = require("../Controllers/userAuthController")
const validate = require("../Middleware/validateSecure")
router.post("/register",validate(registervalidationSchema),registerUserController)
router.get("/verify",verifyUserController)
router.post("/login",loginUserController)
router.post("/forgot-password",validate(forgotValidationSchema),forgotPasswordController)
router.post("/update-forgot-password",updateForgotPasswordController)

module.exports = router