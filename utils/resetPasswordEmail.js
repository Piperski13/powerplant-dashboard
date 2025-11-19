const nodemailer = require("nodemailer");

const sendResetPasswordEmail = async (email, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Power Plant Password Reset",
    text: `Reset Link Inside`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px;">
        <img src="cid:logo" 
             alt="Powerplant Logo" 
             style="width: 150px; margin-bottom: 15px;">

        <h1 style="color: #2c3e50;">Password Reset</h1>

        <p>You requested to reset your password.</p>

        <p>Click the link below to set a new password:</p>

        <a href="${resetLink}"
           style="display:inline-block;
                  padding:10px 20px;
                  background:#0ea5e9;
                  color:white;
                  text-decoration:none;
                  font-weight:bold;
                  border-radius:5px;">
          Reset Password
        </a>

        <p style="margin-top:15px">
          If you didn’t request this, please ignore this email.
        </p>

        <p>Best regards,<br><strong>Powerplant Dashboard Team</strong></p>
      </div>
    `,
    attachments: [
      {
        filename: "logo.png",
        path: "./public/images/nodemailor/mailBanner.jpeg",
        cid: "logo",
      },
    ],
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendResetPasswordEmail;
