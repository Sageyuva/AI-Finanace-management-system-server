const userModel = require("../Models/userModel")
const tokenModel = require("../Models/tokenModel")
const {hashPassward, comparePassword} = require("../Utils/Encrypt/hash")
const {generateToken , verifyToken} = require("../Utils/Token/Token")
const {sendMail} = require("../Utils/Mail/registerMail")
const {jwtSign} = require("../Middleware/secure")
const {VerifiedsendMail} = require("../Utils/Mail/verificationMail")
// user register service
const registerUserService = async(name,email,password,ip,useragent) => {

    try {
        //allfeilds are mandatory
        if(!name||!email||!password){
            throw new Error("All feilds are required")
        }
        //check if user exists
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            console.log("User already exists")
            throw new Error("User already exists")
        }
        //hash password if user doesnt exist
    
        const hashedPassword = await hashPassward(password)
        console.log(hashedPassword)
        //create user
        const user =  await userModel.create({name,email,password:hashedPassword})
        
        //gneerate token 

        const token = await generateToken()
        const rawToken = await token.rawToken
        const encryptedToken = await token.encryptedToken
        //save token
         const SavedTokenData =  await tokenModel.create({userId:user._id,token:encryptedToken,ip,useragent})
         console.log(SavedTokenData)
         
        //send mail
        const verificationLink = `${process.env.Clinet_URL}/verify?userId=${user._id}&token=${rawToken}`
        await sendMail(email,name,verificationLink)
    

        //return message
        if(user){
            console.log("User registered successfully")
            return "User registered successfully"
        }
        else{
            console.log("User registration failed")
            return "User registration failed"
        }
    } catch (error) {
        //return error
        console.log("User registration failed" , error)
        return error
    }

}
// user verification service
const verifyUserService = async(userId,token) => {
    try {
        //find yuser and check if verified
        const user = await userModel.findById({_id:userId , isVerified:false})
        if(!user){
            throw new Error("User is invalid")
        }
         const tokenDb = await tokenModel.findOne({userId:userId})
        const encryptedToken = tokenDb.token
        //verify token
        const verifyTokenIsTrue = await verifyToken(token , encryptedToken)
        if(!verifyTokenIsTrue){
            throw new Error("Invalid token")
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
 try {
    //find user
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        throw new Error("User is invalid")
    }
    //chekc if user is verified
    if(!user.isVerified){
        throw new Error("User is not verified")
    }
    console.log(user)
    const hash = user.password
    //compare passwords
    const isPasswordMatched = await comparePassword(password,hash)
    if(!isPasswordMatched){
        throw new Error("Password is invalid")
    }
    //generate jwt
  const token = await jwtSign(user._id)
    //return usertoken
    return token
 } catch (error) {
    console.log("User login failed" , error)
    return error
 }
}

//Forgot Password service
//Update Password service
//Update forgot password service

module.exports = {registerUserService , verifyUserService , loginUserService}