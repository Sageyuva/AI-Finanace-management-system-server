const express = require("express");
const router = express.Router();
const {registerUserController} = require("../Controllers/userAuthController");

router.post("/register",registerUserController);

module.exports = router;
