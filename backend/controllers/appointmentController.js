const Appointment = require('../models/Appointment');

// Update status of an appointment
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    if (!doctorId || !date) {
      return res.status(400).json({ error: 'doctorId and date are required' });
    }

    // Optional: handle file uploads if implemented
    const documents = req.files || [];

    const appointment = await Appointment.create({
      doctor: doctorId,
      patient: req.user.id,
      date,
      documents,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get appointments for a logged-in patient
exports.getAppointmentsByUser = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id }).populate('doctor');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get appointments for a logged-in doctor
exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user.id }).populate('patient');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Confirm an appointment
exports.confirmAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'scheduled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark an appointment as completed
exports.completeAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'completed' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
