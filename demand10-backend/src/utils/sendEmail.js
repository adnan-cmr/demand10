// backend/src/utils/sendEmail.js
import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: env.EMAIL.host,
  port: env.EMAIL.port,
  secure: env.EMAIL.port === 465,
  auth: {
    user: env.EMAIL.user,
    pass: env.EMAIL.pass,
  },
});

export default async function sendEmail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"Demand10 Support" <${env.EMAIL.user}>`,
      to,
      subject,
      text,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email send failed:', error.message);
    return { success: false, error };
  }
}