const userModel = require("../Models/userModel")
const AppError = require("../Utils/GlobalResponse/sendError")
const tokenModel = require("../Models/tokenModel")
const {hashPassward, comparePassword} = require("../Utils/Encrypt/hash")
const {generateToken , verifyToken} = require("../Utils/Token/Token")
const {sendMail} = require("../Utils/Mail/registerMail")
const {jwtSign} = require("../Middleware/secure")
const {VerifiedsendMail} = require("../Utils/Mail/verificationMail")
const {ResetPassMail} = require("../Utils/Mail/ResetPassMail")
const {ForgotPasswordUpdateMail} = require("../Utils/Mail/ForgotPasswordUpdateMail")
// user register service
const registerUserService = async(name,email,password,ip,useragent) => {

 
        //check if user exists
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            throw new AppError("User already exists",400)
        }
        //hash password if user doesnt exist
    
        const hashedPassword = await hashPassward(password)
        
        //create user
        const user =  await userModel.create({name,email,password:hashedPassword})
        
        //gneerate token 

        const token = await generateToken()
        const rawToken = await token.rawToken
        const encryptedToken = await token.encryptedToken
        //save token
         const SavedTokenData =  await tokenModel.create({userId:user._id,token:encryptedToken,ip,useragent})
         
         
        //send mail
        const verificationLink = `${process.env.Clinet_URL}/auth/verify?userId=${user._id}&token=${rawToken}&tokenid=${SavedTokenData._id}`
        // await sendMail(email,name,verificationLink)
        //fire and forget
        sendMail(email,name,verificationLink).catch((error) => {
            console.log("Mail sending failed" , error)
        })
  

}
// user verification service
const verifyUserService = async(userId,token) => {
    try {
        //find yuser and check if verified
        const user = await userModel.findById({_id:userId , isVerified:false})
        if(!user){
            console.log("User is invalid")
            throw new AppError("User is invalid",400)
        }
         const tokenDb = await tokenModel.findOne({userId:userId})
        const encryptedToken = tokenDb.token
        //verify token
        const verifyTokenIsTrue = await verifyToken(token , encryptedToken)
        if(!verifyTokenIsTrue){
            console.log("Invalid token")
            throw new AppError("Invalid token",400)
        }
        //updateUser and token as well
        user.isVerified = true
        tokenDb.isUsed = true
        await tokenDb.save()
        await user.save()
        //send mail
        await VerifiedsendMail(user.email,user.name)
      return true
    } catch (error) {
        console.log("User verification failed" , error)
        return false
    }
}
// user login service user 
const loginUserService = async(email,password)=> {
 
    //find user
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        console.log("User is invalid")
        throw new AppError("User is invalid",400)
    }
    //chekc if user is verified
    if(!user.isVerified){
        console.log("User is not verified")
        throw new AppError("User is not verified",400)
    }
    const hash = user.password
    //compare passwords
    const isPasswordMatched = await comparePassword(password,hash)
    if(!isPasswordMatched){
        console.log("Password is invalid")
        throw new AppError("Password is invalid",400)
    }
    //generate jwt
    const token = await jwtSign(user._id)
    //return usertoken
    return token
}

//Forgot Password service

const forgotPasswordService = async (email , ip , useragent) => {
    try {
        //check if user exist
        console.log("user check started")
        const ValidUser = await userModel.findOne({email:email})
        console.log(ValidUser)
        if(!ValidUser){
            console.log("User is invalid")
            throw new Error("User is invalid")
        }
        console.log("use check completed")
        //Generate Token
        const token = await generateToken()
        const rawToken = await token.rawToken
        const encryptedToken = await token.encryptedToken
        console.log("token generated")
        //save token with the forgot e num 
        const savedToken = await tokenModel.create({userId:ValidUser._id,token:encryptedToken,ip,useragent,type:"reset"})
        console.log(savedToken)
        //send mail
        console.log("msil trigger")
        const tokenId = savedToken._id
        const resetLink = `${process.env.Clinet_URL}/reset-password?userId=${ValidUser._id}&token=${rawToken}&tokenid=${tokenId}`
        await ResetPassMail(email,ValidUser.name,resetLink)
        console.log("mail sent")
        //return message
        return "Password reset link sent successfully"

    } catch (error) {
        console.log("Forgot Password failed" , error)
        return error
    }
}

//Update Password service
//Update forgot password service
const updateForgotPasswordService = async(userId,token,tokenId,newPassword) => {
    try {
        //find user
        const validUser = await userModel.findById({_id:userId})
        if(!validUser){
            console.log("User is invalid")
            throw new Error("User is invalid")
        }
        //find token
        const validToken = await tokenModel.findById({_id:tokenId})
        if(!validToken){
            console.log("Token is invalid")
            throw new Error("Token is invalid")
        }
        //check if token is not used
        if(validToken.isUsed){
            console.log("Token is already used")
            throw new Error("Token is already used")
        }
        //verifyToken
        const verifyTokenIsTrue = await verifyToken(token,validToken.token)
        if(!verifyTokenIsTrue){
            console.log("Token is invalid")
            throw new Error("Token is invalid")
        }
        //updatePassword
        const hashedPassword = await hashPassward(newPassword)
        validUser.password = hashedPassword
        await validUser.save()
    
        //updateToken
        validToken.isUsed = true
        await validToken.save()
        //sendMail
        await ForgotPasswordUpdateMail(validUser.email,validUser.name)
        //return message
        return "Password updated successfully"
    } catch (error) {
        console.log("Update Forgot Password failed" , error)
        return error
    }
}

module.exports = {registerUserService , verifyUserService , loginUserService , forgotPasswordService , updateForgotPasswordService}