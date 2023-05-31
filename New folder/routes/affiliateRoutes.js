const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const affiliateController = require('../controllers/affiliateController');

// GET /api/affiliate/dashboard
router.get('/dashboard', authMiddleware, affiliateController.getAffiliateDashboard);

module.exports = router;
