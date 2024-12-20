const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// POST route for bookings
router.post('/bookings', paymentController.processBooking);

// GET request to fetch a user's bookings (in-memory filtering)
router.get('/bookings/user/:userId', paymentController.getUserBookings);

module.exports = router;
