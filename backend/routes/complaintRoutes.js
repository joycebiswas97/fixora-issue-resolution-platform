const express = require('express');
const { createComplaint, getComplaints, getMyComplaints, updateComplaintStatus } = require('../controllers/complaintController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route: GET /api/complaints (Anyone can view complaints)
router.get('/', getComplaints);

// Route: POST /api/complaints (Only logged-in users can create)
// Notice how we drop the 'protect' middleware right in the middle!
router.post('/', protect, createComplaint);

// Route: GET /api/complaints/me (Citizens checking their own history)
router.get('/me', protect, getMyComplaints);

// Route: PUT /api/complaints/:id/status (Admins updating tickets)
router.put('/:id/status', protect, authorize('Admin'), updateComplaintStatus);
module.exports = router;