const {registerUserService , verifyUserService , loginUserService} = require("../Services/userAuthServices")

const registerUserController = async(req,res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const useragent = req.headers['user-agent']
        const {name,email,password} = req.body
        const user = await registerUserService(name,email,password,ip,useragent)
        if(user){
            res.status(201).json({message:"User registered successfully"})
        }
        else{
            res.status(400).json({message:"User registration failed"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


const verifyUserController = async(req,res) => {
    try {
        const {userId,token} = req.query
        const user = await verifyUserService(userId,token)
        if(user){
            res.status(200).json({message:"User verified successfully"})
        }
        else{
            res.status(400).json({message:"User verification failed"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const loginUserController = async(req,res)=>{
try {
    const {email,password} = req.body
    const token = await loginUserService(email,password)
    if(token){
        res.status(200).json({message:"User logged in successfully" , token})
    }
    else{
        res.status(400).json({message:"User login failed"})
    }
} catch (error) {
    res.status(500).json({message:error.message})
}
}

module.exports = {registerUserController,verifyUserController,loginUserController}