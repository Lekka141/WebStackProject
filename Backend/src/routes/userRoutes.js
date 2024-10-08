const express = require('express');
const router = express.Router();
const { signInUser, signUpUser, signOutUser } = require('../controllers/authController');
const { getUserProfile, updateUserProfile, deleteUserAccount } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.post('/signout', signOutUser); // Sign out route

// Protected routes
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the protected dashboard', user: req.user });
});

router.get('/profile', authMiddleware, getUserProfile); // Get user profile
router.put('/profile', authMiddleware, updateUserProfile); // Update user profile
router.delete('/account', authMiddleware, deleteUserAccount); // Delete user account

module.exports = router;
