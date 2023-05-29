const express = require('express');
const reviewController = require('../controllers/reviewController');
const auth = require('../middlewares/auth'); // Import your authentication middleware

const router = express.Router();

// Get all reviews for a specific coach
router.get('/coach/:coachId', reviewController.getReviewsByCoachId);

// Get a specific review by ID
router.get('/:id', reviewController.getReview);

// Update a specific review by ID
router.put('/:id', auth, reviewController.updateReview);

// Get all reviews
router.get('/', reviewController.getReviews);

// Create a new review
router.post('/', auth, reviewController.createReview); // Apply the middleware here

module.exports = router;
