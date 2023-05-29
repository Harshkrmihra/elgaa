const express = require('express');
const { body } = require('express-validator');
const serviceController = require('../controllers/serviceController');
const auth = require('../middlewares/auth');
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router({ mergeParams: true }); // Enable access to params from parent routes

// Create a new service for a coach
router.post(
  '/',
  [
    auth,
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('duration').isNumeric().withMessage('Duration must be a number'),
    body('price').isNumeric().withMessage('Price must be a number'),
  ],
  asyncHandler(serviceController.createService)
);

// Update a service for a coach
router.put(
  '/:serviceId',
  [
    auth,
    body('title').notEmpty().optional().withMessage('Title is required'),
    body('description').notEmpty().optional().withMessage('Description is required'),
    body('duration').isNumeric().optional().withMessage('Duration must be a number'),
    body('price').isNumeric().optional().withMessage('Price must be a number'),
  ],
  asyncHandler(serviceController.updateService)
);
// Get a service for a coach
router.get('/:serviceId', auth, asyncHandler((req, res) => {
  req.body.coachId = req.params.coachId; // add this line
  serviceController.getService(req, res);
}));
// Delete a service for a coach
router.delete('/:serviceId', auth, asyncHandler(serviceController.deleteService));
//get all service
router.get('/all',asyncHandler(serviceController.getAllServices));
// Get all services for a coach
router.get('/', asyncHandler(serviceController.getServicesByCoach));


module.exports = router;
