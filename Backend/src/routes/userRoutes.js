// backend/src/routes/userRoute.js
const express = require('express');
const router = express.Router();
const { signInUser, signUpUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signUpUser);
router.post('/signin', signInUser);

// Protected route example
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the protected dashboard', user: req.user });
});

module.exports = router;
