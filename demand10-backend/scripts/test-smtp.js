// backend/scripts/test-smtp.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log('Host:', process.env.EMAIL_HOST);
console.log('Port:', process.env.EMAIL_PORT);
console.log('User:', process.env.EMAIL_USER);
console.log('Pass length:', process.env.EMAIL_APP_PASSWORD?.length);
console.log('Pass format:', /^[a-zA-Z0-9]{16}$/.test(process.env.EMAIL_APP_PASSWORD || '') ? 'valid (16 alphanum)' : 'INVALID â€” must be 16 chars, no spaces');

const t = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

try {
  await t.verify();
  console.log('âœ… SMTP login OK');

  const info = await t.sendMail({
    from: `"Test" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // send to yourself
    subject: 'RankB2B SMTP test',
    text: 'If you received this, SMTP is working.',
  });
  console.log('âœ… Email sent:', info.messageId);
} catch (err) {
  console.error('âŒ SMTP failed:', err.message);
  console.error('   Response code:', err.responseCode);
  console.error('   Response:', err.response);
}