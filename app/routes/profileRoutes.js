const router = require('express').Router();
const auth = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/profileController');

// Get logged-in user's profile
router.get('/', auth(), getProfile);

// Update logged-in user's profile
router.patch('/', auth(), updateProfile);

module.exports = router;