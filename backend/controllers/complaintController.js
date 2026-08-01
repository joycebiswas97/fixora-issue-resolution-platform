const Complaint = require('../models/complaint');

// @desc    Create a new complaint
// @route   POST /api/complaints
// @access  Private (Citizens only)
exports.createComplaint = async (req, res) => {
  try {
    // 1. ADDED 'address' to the destructured req.body
    const { title, description, category, address, longitude, latitude } = req.body;

    // 2. Added 'address' to the validation check
    if (!title || !description || !category || !address || !longitude || !latitude) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const imageUrl = req.file ? req.file.path : 'https://via.placeholder.com/400x300?text=No+Image';

    // 3. Create the complaint in the database
    const complaint = await Complaint.create({
      title,
      description: description || 'No additional details provided.',
      category,
      address,
      location: { type: 'Point', coordinates: [longitude, latitude] },
      imageUrl, // Saving the real Cloudinary URL!
      reportedBy: req.user.id,
    });

    res.status(201).json({
      message: 'Complaint created successfully',
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Public (or Private if you prefer)
exports.getComplaints = async (req, res) => {
  try {
    // Fetch all complaints and also grab the user's name who reported it
    const complaints = await Complaint.find().populate('reportedBy', 'name');
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get logged-in user's complaints
// @route   GET /api/complaints/me
// @access  Private
exports.getMyComplaints = async (req, res) => {
  try {
    // req.user.id comes from the protect middleware
    const complaints = await Complaint.find({ reportedBy: req.user.id });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update complaint status (Admin only)
// @route   PUT /api/complaints/:id/status
// @access  Private (Admin)
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Ensure the status is valid based on our schema
    if (!['Pending', 'In Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id, // The ID from the URL
      { status },
      { new: true, runValidators: true } // Returns the updated document
    );

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json({
      message: 'Status updated successfully',
      complaint
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};