const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // Impor fungsi koneksi MongoDB

// Import routes
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/paymentRoutes');
const movieRoutes = require('./routes/movieRoutes');



// Initialize the app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.json()); // For JSON payloads

// Connect to MongoDB
connectDB(); // Panggil fungsi koneksi

// Use routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/payments', paymentRoutes); // Payment routes
app.use('/api/movies', movieRoutes); // Movie routes



// Default route for health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
