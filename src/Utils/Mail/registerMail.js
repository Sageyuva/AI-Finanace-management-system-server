const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.NODEMAILER_MAIL,
    pass: process.env.NODEMAILER_PASSWORD,
    }
})

 const sendMail = async (to, name, verifyLink) => {
    const subject = "Verify your Finura account";
    const html = ` 
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      <div style="background-color: #1e40af; padding: 20px; color: #ffffff; text-align: center;">
        <h2 style="margin: 0;">Finura</h2>
      </div>
      <div style="padding: 30px;">
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thanks for joining Finura! Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyLink}" target="_blank" style="
            background-color: #1e40af;
            color: #ffffff;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            display: inline-block;
          ">Verify Email</a>
        </div>
        <p>If you didn't sign up, you can safely ignore this email.</p>
        <p>Warm regards,<br/>Finura Team</p>
      </div>
      <div style="background-color: #f9f9f9; padding: 15px; font-size: 12px; color: #555; text-align: center;">
        &copy; ${new Date().getFullYear()} Finura. All rights reserved.
      </div>
    </div>
  </div>
    `;
    await transporter.sendMail({
        from: `Finura <${process.env.NODEMAILER_MAIL}>`,
        to,
        subject,
        html,
    })
};

module.exports = sendMail;