/**
 * Service to dispatch OTP to recipient email address
 * @param {string} email 
 * @param {string} otp 
 */
export const sendOtpEmail = async (email, otp) => {
  const isSmtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER;

  if (isSmtpConfigured) {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Auth Verification" <no-reply@auth.com>',
        to: email,
        subject: "Your Authentication OTP Verification Code",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2>OTP Verification Request</h2>
            <p>Your one-time passcode for authentication is:</p>
            <h1 style="background: #f0fdf4; color: #166534; padding: 12px 24px; display: inline-block; letter-spacing: 4px; border-radius: 8px; border: 1px solid #bbf7d0;">${otp}</h1>
            <p>This code will expire in 10 minutes. If you did not request this OTP, please ignore this email.</p>
          </div>
        `,
      });
      console.log(`[EmailService] OTP email sent successfully to ${email}`);
    } catch (error) {
      console.error(`[EmailService] Failed to send email via SMTP:`, error.message);
    }
  }

  // Development & Testing Log output
  console.log(`\n========================================`);
  console.log(`[EMAIL DISPATCH SIMULATION]`);
  console.log(`To: ${email}`);
  console.log(`Subject: Your Verification OTP Code`);
  console.log(`OTP Code: >>> ${otp} <<<`);
  console.log(`Expires in: 10 minutes`);
  console.log(`========================================\n`);

  return true;
};
