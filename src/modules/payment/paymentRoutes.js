import express from 'express';
import { authenticateToken } from '../../middleware/auth.middleware.js';
import { createPayment, verifyPayment } from './phonepeService.js';

const router = express.Router();

/**
 * One-time payment
 */
router.post('/pay', authenticateToken, async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const userId = req.user.id;

    const payment = await createPayment({
      amount,
      orderId,
      userId,
      callbackUrl: `${process.env.FRONTEND_URL}/payment/callback`,
    });

    // Return checkout URL and order ID
    res.json({
      message: 'Payment created successfully',
      checkoutUrl: payment.checkoutPageUrl,
      orderId: payment.merchantOrderId,
    });
  } catch (err) {
    res.status(500).json({ message: 'Payment creation failed', error: err.message });
  }
});

/**
 * Verify payment status
 */
router.get('/verify/:orderId', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const status = await verifyPayment(orderId);

    res.json({
      message: 'Verification successful',
      status,
    });
  } catch (err) {
    res.status(500).json({ message: 'Payment verification failed', error: err.message });
  }
});

export default router;
