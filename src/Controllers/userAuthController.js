const {registerUser} = require("../Services/userAuthService");


const registerUserController = async (req,res)=> {
    try {
      // ✅ Correct way to get IP Address
    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    // ✅ Correct way to get User Agent
    const userAgent = req.headers["user-agent"];

    console.log("IP:", ipAddress);
    console.log("UserAgent:", userAgent);
        const {name,email,password,termsandconditions} = req.body;

        const user = await registerUser(name,email,password,termsandconditions,ipAddress,userAgent);
        res.status(201).json({message:"User registered successfully",user});
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message});
    }
}

module.exports = {registerUserController};
