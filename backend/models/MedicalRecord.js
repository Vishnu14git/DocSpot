const MedicalRecordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: String,
  prescriptions: [String],
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);