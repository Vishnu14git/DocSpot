const express = require('express');
const cors = require('cors');

// Import all route handlers
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes'); // includes GET /api/doctors
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middlewares
app.use(cors());                // Enable CORS
app.use(express.json());       // Parse JSON requests

// API routes
app.use('/api/auth', authRoutes);            // login/register
app.use('/api/doctors', doctorRoutes);       // GET /api/doctors works here
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
