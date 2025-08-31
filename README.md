Backend Boilerplate
A robust Node.js backend boilerplate for building SaaS or e-commerce applications, featuring authentication (email/password and Google OAuth), email notifications (Nodemailer/SendGrid), task scheduling (cron), payment integration (Razorpay, with PhonePe placeholder), and Prisma ORM for database management.
Features

Authentication: Email/password signup/login and Google OAuth with JWT-based authorization.
Email System: Send emails using Nodemailer (SMTP) or SendGrid.
Task Scheduling: Cron-based task scheduling with node-cron.
Payments: Razorpay for one-time and subscription payments, with a PhonePe placeholder.
Database: Prisma ORM with PostgreSQL for efficient data management.
Middleware: JWT authentication and role-based authorization.
Modular Structure: Organized for scalability and maintainability.

Project Structure
/src
  /config
    auth.js          # Passport.js configuration for Google OAuth
    db.js            # Prisma Client initialization
    env.js           # Environment variable management
  /middleware
    auth.middleware.js  # JWT authentication and role-based authorization
  /modules
    /auth
      auth.controller.js  # Login, signup, and OAuth logic
      auth.routes.js      # Authentication routes
      auth.utils.js       # JWT and bcrypt utilities
    /email
      mailService.js      # Email sending with Nodemailer/SendGrid
    /payment
      razorPayPaymentRoutes.js  # Razorpay payment routes
      razorpayService.js       # Razorpay payment logic
      phonepeService.js        # PhonePe payment logic (placeholder)
    /scheduler
      scheduler.js             # Cron job scheduling (not provided, assumed)
  server.js                    # Express server setup

Prerequisites

Node.js: v16 or higher
PostgreSQL: Database server
Razorpay Account: For payment integration (test credentials for development)
SendGrid Account: Optional, for email notifications
Google Cloud Console: For OAuth credentials
PhonePe Account: Optional, for PhonePe integration

Setup

Clone the Repository:
git clone <repository-url>
cd backend-boilerplate


Install Dependencies:
npm install


Configure Environment Variables:Create a .env file in the root directory with the following:
# Server
PORT=4000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/db_name?schema=public"

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1h

# Email (SMTP)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_password
SENDGRID_API_KEY=your_sendgrid_api_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:4000/api/auth/google/callback

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx

# PhonePe (Optional)
PHONEPE_CLIENT_ID=your_phonepe_client_id
PHONEPE_CLIENT_SECRET=your_phonepe_client_secret
PHONEPE_ENV=SANDBOX


Set Up Database:

Ensure PostgreSQL is running.
Run Prisma migrations:npx prisma migrate dev




Start the Server:
npm start

The server will run on http://localhost:4000 (or the port specified in .env).


Usage
Authentication

Signup:
curl -X POST http://localhost:4000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"John Doe","email":"john@example.com","phone":"1234567890","password":"securepassword"}'


Login:
curl -X POST http://localhost:4000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"john@example.com","password":"securepassword"}'


Google OAuth:

Navigate to http://localhost:4000/api/auth/google to initiate Google login.
After authentication, the /api/auth/google/callback endpoint returns a JWT.


Protected Routes:Include the JWT in the Authorization: Bearer <token> header:
curl -H "Authorization: Bearer <jwt_token>" http://localhost:4000/protected



Payments

Create Razorpay Order:
curl -X POST http://localhost:4000/api/Rpayment/order \
-H "Content-Type: application/json" \
-d '{"amount":1000}'


Verify Payment:
curl -X POST http://localhost:4000/api/Rpayment/verify \
-H "Content-Type: application/json" \
-d '{"paymentId":"pay_XXXX"}'



Email
Send an email using Nodemailer or SendGrid:
import { sendMail } from './src/modules/email/mailService.js';

await sendMail({
  to: 'user@example.com',
  subject: 'Welcome!',
  text: 'Thanks for signing up!',
  html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
  provider: 'nodemailer' // or 'sendgrid'
});

Task Scheduling
Schedule tasks using the scheduler.js module (assumed):
import { scheduleTask } from './src/modules/scheduler/scheduler.js';

function task() {
  console.log('Task executed at', new Date());
}

// Schedule daily task at 08:30 AM
scheduleTask(task, { type: 'daily', time: '08:30' });

API Endpoints



Method
Endpoint
Description



POST
/api/auth/register
Register a new user


POST
/api/auth/login
Login and get JWT


GET
/api/auth/google
Initiate Google OAuth login


GET
/api/auth/google/callback
Google OAuth callback


POST
/api/Rpayment/order
Create a Razorpay order


POST
/api/Rpayment/subscription
Create a Razorpay subscription


POST
/api/Rpayment/verify
Verify a Razorpay payment


GET
/protected
Example protected route (JWT)


Testing

Use Postman or cURL for API testing.
For payments, use Razorpay test credentials (rzp_test_XXXX).
Test database connectivity with:npx prisma studio



Extensibility

Add Recurring Payments: Extend Razorpay for subscription plans.
Additional Email Providers: Integrate AWS SES, Mailgun, etc.
More Cron Jobs: Add tasks for notifications or cleanup.
Multitenancy: Modify the Prisma schema for tenant-specific data.
Additional Payment Gateways: Add Stripe or PayPal support.

Notes

Payments: Amounts are in paise (e.g., ₹10 = 1000 paise).
Security: Use HTTPS in production and secure .env file storage.
Environment Variables: Ensure all required variables are set to avoid errors.
Prisma: Run npx prisma generate after schema changes.

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/xyz).
Commit changes (git commit -m 'Add feature xyz').
Push to the branch (git push origin feature/xyz).
Open a pull request.

License
MIT License. See LICENSE for details.
