const User = require('../models/user');

// @desc    Get all citizens
// @route   GET /api/users
// @access  Private (Officials only)
exports.getAllCitizens = async (req, res) => {
  try {
    const citizens = await User.find({ role: 'citizen' }).select('-password');
    res.status(200).json(citizens);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
