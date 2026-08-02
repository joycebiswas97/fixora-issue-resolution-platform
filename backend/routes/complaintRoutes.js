const express = require('express');
const {
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  updateComplaintStatus
} = require('../controllers/complaintController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../config/cloudinary');

const router = express.Router();

// IMPORTANT: /me must come BEFORE /:id to avoid Express treating 'me' as an ID param

// Route: GET /api/complaints/me  — user's own complaints (Private)
router.get('/me', protect, getMyComplaints);

// Route: GET /api/complaints     — community feed of all complaints (Private)
router.get('/', protect, getAllComplaints);

// Route: POST /api/complaints    — create a new complaint (Private)
router.post('/', protect, upload.single('image'), createComplaint);

// Route: PUT /api/complaints/:id/status — update status (Officials only)
router.put('/:id/status', protect, authorize('official'), updateComplaintStatus);

module.exports = router;