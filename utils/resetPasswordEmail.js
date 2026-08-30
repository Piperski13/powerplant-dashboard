const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendResetPasswordEmail = async (email, resetLink) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Reset Your Password",
    text: `You requested a password reset. Use the following link to set a new password: ${resetLink}`,
    html: ` 
    <div style="font-family: Arial, sans-serif; max-width: 500px;"> 
    <h1 style="color: #2c3e50;">Reset Your Password</h1> 
    <p>We received a request to reset the password for your account.</p>
    <p>Click the button below to choose a new password:</p> 
    <a href="${resetLink}" style=" display: inline-block; padding: 10px 20px; background: #0ea5e9; 
    color: white; text-decoration: none; font-weight: bold; border-radius: 5px; " > Reset Password </a>
    <p style="margin-top: 15px;"> This link will expire in 15 minutes. </p>
    <p> If you did not request a password reset, you can safely ignore this email. </p>
    <p> Best regards,<br> <strong>Support Team</strong> </p> 
    </div> `,
  });

  if (error) {
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }

  return data;
};

module.exports = sendResetPasswordEmail;
