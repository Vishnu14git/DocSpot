const User = require("../models/User");
const Appointment = require("../models/Appointment");

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor", approved: true });
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching doctors." });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    // Check doctor exists
    const doctor = await User.findOne({ _id: doctorId, role: "doctor", approved: true });
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found or not approved." });
    }

    const documents = (req.files || []).map(f => f.path);

    const appointment = await Appointment.create({
      doctor: doctorId,
      patient: req.user.id,
      date,
      documents,
    });

    res.status(201).json({
      message: "Appointment booked successfully.",
      appointment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while booking appointment." });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id,
    }).populate("doctor", "name specialization");

    res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching appointments." });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    if (String(appointment.patient) !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to cancel this appointment." });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({
      message: "Appointment cancelled successfully.",
      appointment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while cancelling appointment." });
  }
};
