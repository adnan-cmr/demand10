// backend/helpers/send-email.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Print SMTP status at startup so failures are visible immediately
// transporter.verify((err) => {
//   if (err) {
//     console.error('❌ SMTP config invalid at startup');
//     console.error('   user:', process.env.EMAIL_USER);
//     console.error('   pass length:', process.env.EMAIL_APP_PASSWORD?.length);
//     console.error('   code:', err.code);
//     console.error('   message:', err.message);
//   } else {
//     console.log('✅ SMTP ready to send (user:', process.env.EMAIL_USER, ')');
//   }
// });

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Demand10 Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email send failed:', error.message);
    return { success: false, error: error.message, code: error.responseCode };
  }
};

export default sendEmail;