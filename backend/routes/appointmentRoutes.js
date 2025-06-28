const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Book an appointment
router.post('/', async (req, res) => {
  try {
    const { patientEmail, doctorEmail, doctorName, reason } = req.body;
    const newAppointment = new Appointment({
      patientEmail,
      doctorEmail,
      doctorName,
      reason,
    });
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked' });
  } catch (err) {
    console.error('❌ Failed to book appointment:', err);
    res.status(500).json({ error: 'Booking failed' });
  }
});

// Get appointments by user
router.get('/user/:email', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientEmail: req.params.email });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user appointments' });
  }
});

// Get appointments for doctor
router.get('/doctor/:email', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorEmail: req.params.email });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctor appointments' });
  }
});

// Approve appointment
router.put('/:id/approve', async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, { status: 'Approved' });
    res.json({ message: 'Appointment approved' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve' });
  }
});

// Reject appointment
router.put('/:id/reject', async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
    res.json({ message: 'Appointment rejected' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject' });
  }
});

module.exports = router;
