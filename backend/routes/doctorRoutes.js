const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor'); // ✅ Doctor model
const { getAppointments, confirmAppointment, completeAppointment } = require('../controllers/doctorController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

// ✅ Fetch all doctors (no auth required)
router.get('/all', async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Fetch from MongoDB
    res.json(doctors); // Send JSON to frontend
  } catch (err) {
    console.error('❌ Error fetching doctors:', err);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});
// ✅ Get all appointments for a doctor
router.get('/doctor/:email', async (req, res) => {
  try {
    const doctorEmail = req.params.email;
    const appointments = await Appointment.find({ doctorEmail });
    res.json(appointments);
  } catch (error) {
    console.error('❌ Error fetching doctor appointments:', error);
    res.status(500).json({ error: 'Failed to fetch doctor appointments' });
  }
});


// 🔒 Doctor-only routes (protected)
router.get('/appointments', authMiddleware, roleMiddleware(['doctor']), getAppointments);
router.put('/appointments/confirm/:id', authMiddleware, roleMiddleware(['doctor']), confirmAppointment);
router.put('/appointments/complete/:id', authMiddleware, roleMiddleware(['doctor']), completeAppointment);

module.exports = router;
