import dotenv from 'dotenv';
dotenv.config();
// this file loads environment variables from .env file
// and exports them in a structured format
// modify as per your requirements
//dont modify variable names as they are used in other files
// Ensure to set the environment variables in your .env file
// PORT, NODE_ENV, DATABASE_URL, JWT_SECRET
// EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, SENDGRID_API_KEY
// GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI
// PHONEPE_CLIENT_ID, PHONEPE_CLIENT_SECRET, PHONEPE_ENV
// RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
export const env = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  dbUrl: process.env.DATABASE_URL,

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'changeme',

  // Email
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    // SendGrid
    sendGridApiKey: process.env.SENDGRID_API_KEY,
  },

  // Google OAuth
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
  },

  // PhonePe
  phonepe: {
    clientId: process.env.PHONEPE_CLIENT_ID,
    clientSecret: process.env.PHONEPE_CLIENT_SECRET,
    env: process.env.PHONEPE_ENV || 'SANDBOX',
  },
  // Razorpay
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
  },
};

// Optional: Fail fast if critical vars are missing
if (!env.jwtSecret) {
  throw new Error('JWT_SECRET is missing in .env');
}
if (!env.dbUrl) {
  throw new Error('DATABASE_URL is missing in .env');
}
