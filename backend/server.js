require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const locationRoutes = require('./routes/locationRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware

const allowedOrigins = [
  'https://client-frontend-8d1s.onrender.com',   // Replace with your deployed client frontend URL
  'https://admin-frontend-nuo3.onrender.com',    // Replace with your deployed admin frontend URL
  'http://localhost:3001',                      // For local client frontend dev
  'http://localhost:3000',                      // For local admin frontend dev (if different port)
];



app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from origin ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,  // If you use cookies or authentication headers
}));


// app.use(cors({
//   origin: "http://localhost:3000", // your frontend URL
//   credentials: true
// }));
// app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test routes
app.get('/', (req, res) => {
  res.send('CMS Backend is running');
});


// Register API routes
app.use('/api/locations', locationRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
