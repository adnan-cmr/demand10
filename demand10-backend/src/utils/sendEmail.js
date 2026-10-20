// backend/src/utils/sendEmail.js
import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import logger from './logger.js';

const configured = Boolean(env.EMAIL.host && env.EMAIL.user && env.EMAIL.pass);

const transporter = configured
  ? nodemailer.createTransport({
      host: env.EMAIL.host,
      port: env.EMAIL.port,
      secure: env.EMAIL.port === 465,
      auth: { user: env.EMAIL.user, pass: env.EMAIL.pass },
    })
  : null;

export default async function sendEmail({ to, subject, text, html }) {
  if (!transporter) {
    logger.warn({ to, subject }, 'SMTP not configured; email not sent');
    return { success: false, error: new Error('SMTP not configured') };
  }
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
    logger.error({ err: error }, 'Email send failed');
    return { success: false, error };
  }
}