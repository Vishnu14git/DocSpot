const User = require('../models/User');
const Appointment = require('../models/Appointment');

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all appointments with doctor & patient populated
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .populate('doctor')
      .populate('patient');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve a doctor account
exports.approveDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.approved = true;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.deleteOne();

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
