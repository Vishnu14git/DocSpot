const express = require('express');
const router = express.Router();
const { bookAppointment, cancelAppointment } = require('../controllers/patientController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.post('/book', authMiddleware, roleMiddleware(['patient']), bookAppointment);
router.put('/cancel/:id', authMiddleware, roleMiddleware(['patient']), cancelAppointment);

module.exports = router;