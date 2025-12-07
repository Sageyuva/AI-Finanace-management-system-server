const crypto = require("crypto");
const tokenModel = require("../../Models/tokenModel");

const generateToken = async (userId, type, ipAddress, userAgent) => {
  try {
    // 1️⃣ Generate raw token (send to user)
    const rawToken = crypto.randomBytes(32).toString("hex");

    // 2️⃣ Hash token (store in DB)
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    // 3️⃣ Save in DB
    await tokenModel.create({
      userId,
      token: hashedToken,
      type,
      isUsed: false,
      ipAddress,
      userAgent
    });

    // 4️⃣ Return raw token for email/frontend
    return { token: rawToken };
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Token generation failed");
  }
};

module.exports = generateToken;
