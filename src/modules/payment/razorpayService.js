import Razorpay from 'razorpay';
import { randomUUID } from 'crypto';
import { env } from '../../config/env.js'; // your env config
//this is basic razorpay integration example modify as per your requirements
// Ensure to set the environment variables in your .env file
// RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
// dont share your key secret in public repos
// adjust error handling as needed

// Initialize Razorpay client
export const razorpayClient = new Razorpay({
  key_id: env.razorpay.keyId,
  key_secret: env.razorpay.keySecret,
});
console.log(
  'Razorpay Client Initialized:',
  env.razorpay.keyId,
  env.razorpay.keySecret
);
/**
 * Create a one-time payment order
 */
export const createOrder = async ({ amount, currency = 'INR', receipt }) => {
  try {
    const options = {
      amount, // amount in paise
      currency,
      receipt: receipt || randomUUID(),
      payment_capture: 1, // auto capture
    };

    const order = await razorpayClient.orders.create(options);
    return order;
  } catch (err) {
    console.error('Razorpay createOrder error:', err);
    throw err;
  }
};

/**
 * Create a subscription (recurring payment)
 */
export const createSubscription = async ({ plan_id, customer_notify = 1 }) => {
  try {
    const subscription = await razorpayClient.subscriptions.create({
      plan_id,
      customer_notify,
    });
    return subscription;
  } catch (err) {
    console.error('Razorpay createSubscription error:', err);
    throw err;
  }
};

/**
 * Verify payment status
 */
export const verifyPayment = async (paymentId) => {
  try {
    const payment = await razorpayClient.payments.fetch(paymentId);
    return payment;
  } catch (err) {
    console.error('Razorpay verifyPayment error:', err);
    throw err;
  }
};
