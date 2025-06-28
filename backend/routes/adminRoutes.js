const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure this path is correct

// ✅ Get all unapproved doctors
router.get('/pending-doctors', async (req, res) => {
  try {
    const pendingDoctors = await User.find({ role: 'doctor', approved: false });
    res.json(pendingDoctors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending doctors' });
  }
});
const { getAllUsers, getAllAppointments, approveDoctor, deleteUser } = require('../controllers/adminController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.use(authMiddleware, roleMiddleware(['admin']));

router.get('/users', getAllUsers);
router.get('/appointments', getAllAppointments);
router.put('/approve-doctor/:id', approveDoctor);
router.delete('/user/:id', deleteUser);

module.exports = router;
