// auth.routes.js
import express from 'express';
import { register, login } from './auth.controller.js';
import passport from '../../config/auth.js';
import { signToken } from './auth.utils.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  (req, res) => {
    // Create payload
    const payload = {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    };

    // Sign JWT using your utility
    const token = signToken(payload); // uses default JWT_EXPIRY from your config

    res.json({ message: 'Google login successful', token, user: req.user });
  }
);
export default router;
