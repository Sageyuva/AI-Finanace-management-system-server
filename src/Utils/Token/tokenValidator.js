const crypto = require("crypto");
const userModel = require("../../Models/userModel");
const tokenModel = require("../../Models/tokenModel");

// token validator service function
const validateToken = async (userId, rawToken) => {
  try {
    if (!userId || !rawToken) {
      throw new Error("Missing parameters");
    }

    // 1️⃣ Hash the incoming token
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    // 2️⃣ Find token in DB
    const tokenDoc = await tokenModel.findOne({ userId, token: hashedToken, isUsed: false });
    if (!tokenDoc) {
      throw new Error("Invalid or expired token");
    }

    // 3️⃣ Mark token as used
    tokenDoc.isUsed = true;
    await tokenDoc.save();

    // 4️⃣ Mark user as verified
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.verified = true;
    await user.save();

    // 5️⃣ Return success message
    return { status: 200, message: "Token validated successfully" };
  } catch (error) {
    console.error("Token validation error:", error);
    throw new Error(error.message || "Internal server error");
  }
};

module.exports = validateToken;
