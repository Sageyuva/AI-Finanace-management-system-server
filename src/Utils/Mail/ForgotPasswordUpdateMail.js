const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
  auth: {
    user: process.env.NODEMAILERMAIL,
    pass: process.env.NODEMAILERPASSWORD,
  },
});

const ForgotPasswordUpdateMail = async (to, name) => {
  const subject = "Verify Your Finura Account";
const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Password Reset Successful</title>
</head>
<body style="margin:0; padding:0; background:#020617; font-family: 'Inter', Arial, sans-serif;">

  <!-- Main Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Glass Card -->
        <table width="100%" max-width="520" cellpadding="0" cellspacing="0"
          style="max-width:520px; background:rgba(15,23,42,0.6); backdrop-filter:blur(12px);
          border-radius:20px; border:1px solid rgba(255,255,255,0.1);
          box-shadow:0 20px 50px rgba(0,0,0,0.4); padding:36px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="font-size:28px; font-weight:800; color:#10B981; letter-spacing:1px;">
              Finura
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding-top:20px; text-align:center; font-size:24px; color:#FFFFFF; font-weight:600;">
              Password Reset Successful
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding-top:16px; text-align:center; font-size:16px; color:#94A3B8;">
              Hi <span style="color:#FFFFFF; font-weight:600;">${name}</span>,
              <br/>Your password has been successfully updated.
            </td>
          </tr>

          <!-- Description -->
          <tr>
            <td style="padding-top:18px; text-align:center; font-size:15px; color:#CBD5F5; line-height:1.6;">
              You can now log in securely to your Finura dashboard using your new password.
              <br/>Click the button below to continue.
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td align="center" style="padding-top:30px;">
              <a href="http://localhost:5173"
                style="display:inline-block; padding:14px 32px; background:#10B981; color:#FFFFFF;
                text-decoration:none; border-radius:10px; font-weight:600; letter-spacing:0.3px;
                box-shadow:0 0 20px rgba(16,185,129,0.45);">
                Go to Dashboard
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-top:30px;">
              <div style="height:1px; background:linear-gradient(90deg, transparent, #10B981, transparent);"></div>
            </td>
          </tr>

          <!-- Security Note -->
          <tr>
            <td style="padding-top:20px; text-align:center; font-size:13px; color:#94A3B8;">
              If this wasn’t you, please secure your account immediately by updating your password again.
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:26px; text-align:center; font-size:12px; color:#64748B;">
              © ${new Date().getFullYear()} Finura Inc.
              <br/>Built for speed, stability & smart finance.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;



  await transporter.sendMail({
    from: `Finura <${process.env.NODEMAILERMAIL}>`,
    to,
    subject,
    html,
  });
};

module.exports = {ForgotPasswordUpdateMail}