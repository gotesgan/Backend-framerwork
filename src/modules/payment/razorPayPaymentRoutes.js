import express from 'express';
import { createOrder, createSubscription } from './razorpayService.js';

const router = express.Router();
// callback funtion can be chaneged as per your requirements
//makesure to handle errors and validate inputs properly
//this to get you started with razorpay integration
// Create one-time order
router.post('/order', async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await createOrder({ amount });
    res.json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Payment creation failed', error: err.message });
  }
});

// Create subscription
router.post('/subscription', async (req, res) => {
  try {
    const { plan_id } = req.body;
    const subscription = await createSubscription({ plan_id });
    res.json(subscription);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Subscription creation failed', error: err.message });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { paymentId } = req.body;
    if (!paymentId) {
      return res.status(400).json({ message: 'paymentId is required' });
    }

    const payment = await verifyPayment(paymentId);
    res.json({ success: true, payment });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Payment verification failed', error: err.message });
  }
});

export default router;
