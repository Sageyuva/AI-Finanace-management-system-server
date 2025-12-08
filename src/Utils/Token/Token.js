const crypto = require("crypto")
const generateToken = async() => {
  try {
      //Generate a token
  const rawToken = await crypto.randomBytes(32).toString("hex")
  //Encrrypt a token
  const encryptedToken = await crypto.createHash("sha256").update(rawToken).digest("hex")
  //return token and encrypted token
  return {rawToken,encryptedToken}
  } catch (error) { 
    console.log(error)
    return error
  }
}

const verifyToken = (token , encryptedToken) => {
    try {
      const hashTheToken = crypto.createHash("sha256").update(token).digest("hex")
      //compare tokens
      if(hashTheToken === encryptedToken){
        return true
      }
      else{
        return false
      }
    } catch (error) {
      console.log(error)
      return error
    }
}

module.exports = {generateToken,verifyToken}