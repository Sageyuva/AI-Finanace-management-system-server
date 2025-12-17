//Importing the required services
const {forgotPasswordService , registerUserService , verifyUserService , loginUserService , updateForgotPasswordService} = require("../Services/userAuthServices")
//Importing the required util for error handling and response
const catchAsync  = require("../Utils/catchAsync")
//Importing the required util for response
const sendResponse = require("../Utils/GlobalResponse/sendResponse")

//Register User controller

const registerUserController = catchAsync(async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const useragent = req.headers['user-agent'];
  const { name, email, password } = req.body;

  // service throws error if something fails
  await registerUserService(name, email, password, ip, useragent);

  // only reached if everything important succeeded
  sendResponse(res, 201, "User registered successfully", null);
});

//Verify User controller
const verifyUserController = catchAsync(async(req,res)=> {
    const {userId,token} = req.query
    const user = await verifyUserService(userId,token)
    sendResponse(res,200,"User verified successfully",user)
})

//Login User controller
const loginUserController = catchAsync(async(req,res)=>{
    const {email,password} = req.body
    const token = await loginUserService(email,password)
    sendResponse(res,200,"User logged in successfully",token)
})

//Forgot Password controller
const forgotPasswordController = catchAsync(async (req,res)=> {
    const {email} = req.body
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const useragent = req.headers['user-agent']
    const user = await forgotPasswordService(email,ip,useragent)
    sendResponse(res,200,"User forgot password successfully",user)
})

//Update Forgot Password controller
const updateForgotPasswordController = catchAsync(async (req,res)=> {
    const {newPassword} = req.body
        const {userId,token,tokenId} = req.query
        const user = await updateForgotPasswordService(userId,token,tokenId,newPassword)
    sendResponse(res,200,"User updated password successfully",user)
})


module.exports = {registerUserController,verifyUserController,loginUserController,forgotPasswordController , updateForgotPasswordController }