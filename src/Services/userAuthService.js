const userModel = require("../Models/userModel");
const tokenModel = require("../Models/tokenModel");
const sendMail = require("../Utils/Mail/registerMail");
const generateToken = require("../Utils/Token/tokenGenerator");
const validateToken = require("../Utils/Token/tokenValidator");
const {hashPassword} = require("../Utils/Encrypt/Hash");
const registerUser = async (name, email, password ,termsandconditions , ipAddress , userAgent  ) => {
    try {
        if(!name || !email || !password || !termsandconditions){
            throw new Error("All fields are required");
        }
        const user = await userModel.findOne({email});
        if(user){
            throw new Error("User already exists");
        }
        const hashedPassword = await hashPassword(password);

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            termsandconditions
        });

        const token = await generateToken(newUser._id, "Register", ipAddress, userAgent);

        await sendMail(newUser.email, newUser.name, token.token);

    } catch (error) {
        console.log(error);
    }
}


module.exports = {registerUser};