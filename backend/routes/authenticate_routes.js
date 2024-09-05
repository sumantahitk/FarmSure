// routes/auth.js
import express from 'express';
import isAuthenticated from './middleware/isAuthenticated';

const router = express.Router();

// Protected route to check if user is authenticated
router.get('/auth/check', isAuthenticated, (req, res) => {
  res.status(200).json({
    message: 'User is authenticated',
    success: true,
    userId: req.id,  // User ID from the decoded JWT
  });
});

export default router;
