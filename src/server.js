import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import authRoutes from './modules/auth/auth.routes.js';
import RazorpayRoute from './modules/payment/razorPayPaymentRoutes.js';
import { authenticateToken } from './middleware/auth.middleware.js';
import { sendMail } from './modules/email/mailService.js';
import { scheduleTask } from './modules/scheduler/scheduler.js';

dotenv.config();

const app = express();
const PORT = env.port || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/Rpayment', RazorpayRoute);
// Example protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});



// Health check route
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//how to use send mail function
// await sendMail({
//   to: 'shantanugote82@gmail.com',
//   subject: 'Welcome to MyApp!',
//   text: 'Hello! Thanks for signing up.',
//   html: '<h1>Hello!</h1><p>Thanks for signing up.</p>',
// });

// Schedule a task (example: runs every minute)
// scheduleTask('*/1 * * * *', async () => {
//   console.log('Scheduled task running every minute');
//   // Add your task logic here
// });
// Note: The above sendMail and scheduleTask examples are commented out to prevent automatic execution. Uncomment and modify as needed.