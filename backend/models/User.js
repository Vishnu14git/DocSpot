const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'doctor', 'admin'], // Ensure all lowercase and matches input
    default: 'user',
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
