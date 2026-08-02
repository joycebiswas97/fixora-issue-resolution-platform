const express = require('express');
const { getAllCitizens } = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route: GET /api/users
// Protected: must be logged in AND must have the 'official' role
router.get('/', protect, authorize('official'), getAllCitizens);

module.exports = router;
