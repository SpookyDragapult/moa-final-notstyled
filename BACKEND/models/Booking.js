const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    movieTitle: { type: String, required: false },
    schedule: { type: String, required: false },
    theater: { type: String, required: true },
    seat: { type: [String], required: true },
    ticketPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: false },
    eWallet: { type: String, required: false },
    creditCard: {
        cardholderName: { type: String },
        cardNumber: { type: String },
        expiryDate: { type: String },
        cvv: { type: String }
    },
    bank: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Assuming you're storing users in a separate User collection
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
