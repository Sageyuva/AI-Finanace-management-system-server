const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_SECRET);

const sendMail = async (to, name, verifyLink) => {
  const subject = "Verify Your Finura Account";

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Finura Account</title>
  </head>
  <body style="margin:0; padding:0; background:#020617; font-family: 'Inter', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="100%" max-width="520" cellpadding="0" cellspacing="0"
            style="max-width:520px; background:rgba(15,23,42,0.6); border-radius:20px;
            border:1px solid rgba(255,255,255,0.1); padding:36px;">
            <tr>
              <td align="center" style="font-size:28px; font-weight:800; color:#10B981;">
                Finura
              </td>
            </tr>
            <tr>
              <td style="padding-top:20px; text-align:center; font-size:24px; color:#FFFFFF;">
                Verify Your Account
              </td>
            </tr>
            <tr>
              <td style="padding-top:16px; text-align:center; font-size:16px; color:#94A3B8;">
                Hi <b>${name}</b>, please verify your email.
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:30px;">
                <a href="${verifyLink}"
                  style="padding:14px 32px; background:#10B981; color:#FFFFFF;
                  text-decoration:none; border-radius:10px; font-weight:600;">
                  Verify Now
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  await resend.emails.send({
    from: "Finura <aupport@yuvaraj.online>",
    to,
    subject,
    html,
  });
};

module.exports = { sendMail };
