const express = require('express');
const { signup, login } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const User = require('../models/user');
const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Profile route
router.get('/profile', protect, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        _id: user._id,
        email: user.email,
        name: user.name, // Assuming you have a name field
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
  });
  

module.exports = router;
