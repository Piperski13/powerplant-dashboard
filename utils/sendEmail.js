const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (email, otp) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is ${otp}. This code will expire in 5 minutes.`,
    html: ` <div style="font-family: Arial, sans-serif; max-width: 500px;"> 
    <h1 style="color: #2c3e50;">Verify Your Account</h1> 
    <p>Thank you for creating an account.</p> <p>Use the verification code below to complete your registration:</p>
    <p style=" font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #0ea5e9; "> ${otp} </p> 
    <p>This code will expire in 5 minutes.</p> 
    <p>If you did not request this code, you can safely ignore this email.</p>
    <p> Best regards,<br> <strong>Support Team</strong> </p> </div> `,
  });

  if (error) {
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }

  return data;
};

module.exports = sendOTPEmail;
