import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import { env } from '../../config/env.js';

// Nodemailer setup (using SMTP)
// this is basic setup modify as per your requirements like OAuth2, etc.
// Ensure to set the environment variables in your .env file
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
// SendGrid setup requires SENDGRID_API_KEY in your .env file
// You can choose either Nodemailer or SendGrid based on your preference
const transporter = nodemailer.createTransport({
  host: env.email.host,
  port: env.email.port,
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.email.user,
    pass: env.email.pass,
  },
});

// SendGrid setup
sgMail.setApiKey(env.email.sendGridApiKey);

/**
 * Send email via Nodemailer or SendGrid
 * @param {Object} options - { to, subject, text, html, provider }
 */
export const sendMail = async ({
  to,
  subject,
  text,
  html,
  provider = 'nodemailer',
}) => {
  try {
    if (provider === 'sendgrid') {
      const msg = {
        to,
        from: process.env.SMTP_USER, // sender verified in SendGrid
        subject,
        text,
        html,
      };
      const response = await sgMail.send(msg);
      console.log('SendGrid mail sent:', response[0].statusCode);
      return { success: true, provider: 'sendgrid' };
    }

    // Default: Nodemailer
    const info = await transporter.sendMail({
      from: `"Your App Name" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log('Nodemailer mail sent:', info.messageId);
    return { success: true, provider: 'nodemailer', messageId: info.messageId };
  } catch (err) {
    console.error('Mail error:', err);
    throw err;
  }
};
