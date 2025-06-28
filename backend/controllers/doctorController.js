const Appointment = require('../models/Appointment');

// Get appointments for the logged-in doctor
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user.id,
    }).populate('patient');

    res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching appointments.' });
  }
};

// Confirm (schedule) an appointment
exports.confirmAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    appointment.status = 'scheduled';
    await appointment.save();

    res.status(200).json({
      message: 'Appointment confirmed.',
      appointment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while confirming appointment.' });
  }
};

// Mark an appointment as completed
exports.completeAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    appointment.status = 'completed';
    await appointment.save();

    res.status(200).json({
      message: 'Appointment marked as completed.',
      appointment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while completing appointment.' });
  }
};
