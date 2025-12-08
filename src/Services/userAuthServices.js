const userModel = require("../Models/userModel")
const tokenModel = require("../Models/tokenModel")
const {hashPassward} = require("../Utils/Encrypt/hash")
const {generateToken , verifyToken} = require("../Utils/Token/Token")
const {sendMail} = require("../Utils/Mail/registerMail")
//register user service
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
         await tokenModel.create({userId:user._id,token:token.encryptedToken,ip,useragent})

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
      return true
    } catch (error) {
        console.log("User verification failed" , error)
        return false
    }
}

module.exports = {registerUserService , verifyUserService}