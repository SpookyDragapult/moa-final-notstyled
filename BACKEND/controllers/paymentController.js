const Booking = require('../models/Booking');
const mongoose = require('mongoose');

exports.processBooking = async (req, res) => {
    const {
        userId, movieTitle, theater, seat, totalPrice, paymentMethod,
        eWallet, creditCard, bank, schedule
    } = req.body;

    try {
        if (!seat || !totalPrice || !paymentMethod) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new booking record based on payment method
        const newBooking = new Booking({
            movieTitle,
            theater,
            schedule,
            seat,
            totalPrice,
            paymentMethod,
            eWallet,
            creditCard,
            bank,
            userId
        });

        // Save the booking to the database
        await newBooking.save();

        res.status(201).json({
            message: 'Booking successful',
            booking: newBooking
        });
    } catch (error) {
        console.error('Error processing booking:', error);
        res.status(500).json({ message: 'Error processing booking', error });
    }
};

// Controller to get bookings by userId (optimized query)
exports.getUserBookings = async (req, res) => {
    const { userId } = req.params;
    console.log('userId received in backend:', userId);

    // Validate the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
    }

    try {
        // Find bookings by userId (in MongoDB query)
        const bookings = await Booking.find({ userId: new mongoose.Types.ObjectId(userId) }).lean();

        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }

        // Send the bookings as a response
        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Error fetching user bookings', error });
    }
};
