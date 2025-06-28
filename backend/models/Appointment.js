const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientEmail: { type: String, required: true },
  doctorEmail: { type: String, required: true },
  doctorName: { type: String, required: true },
  reason: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
