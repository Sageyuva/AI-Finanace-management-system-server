const bcrypt = require("bcrypt")

const hashPassward = async(password) => {
try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    return hash
} catch (error) {
    console.log(error)
    return error
}
}

const comparePassword = async(password , hash )=>{
    try {
       
        if (password||hash) {
            const isMatched = await bcrypt.compare(password,hash)
            console.log(isMatched)
            if(isMatched){
                return true
            }
            else{
                return false
            }
        } else {
            console.log("password and hash both are required")
            return false
        }
    } catch (error) {
        console.log(error)
        return error
    }
}


module.exports = {hashPassward,comparePassword}
