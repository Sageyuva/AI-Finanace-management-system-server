const jwt = require("jsonwebtoken")
const userModel = require("../Models/userModel")
const jwtSign = async(userId) => {
    try {
        const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"1d"})
        return token
    } catch (error) {
        console.log(error)
        return error
    }
}
const protectUser = async(req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            if(decode){
                const reqId = decode.userId
                const user = await userModel.findById(reqId)
                if(!user){
                    return res.status(401).json({message:"Invalid token"})
                }
                req.user = user
                next()
            }
            else{
                return res.status(401).json({message:"Invalid token"})
            }            
        } catch (error) {
            console.log("Invalid token" , error)
            return error
        }
    }
    else{
        return res.status(401).json({message:"Invalid token"})
    }
}
module.exports = {jwtSign,protectUser}