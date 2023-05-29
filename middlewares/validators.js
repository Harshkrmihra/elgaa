const { body } = require('express-validator');

exports.createCoachValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('expertise').notEmpty().withMessage('Expertise is required'),
    // Add more validation rules as needed
];

exports.updateCoachValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('expertise').notEmpty().withMessage('Expertise is required'),
    // Add more validation rules as needed
    body('gameId').if(body('gameId').exists()).custom((value, { req }) => {
        if (req.user.type !== 'Admin') {
            throw new Error('Not authorized to update gameId');
        }
        return true;
    }),
];
exports.registerUserValidator = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('type').custom((value, { req }) => {
        if (value === 'Admin' || value === 'Coach') {
            if (!req.user || req.user.type !== 'Admin') {
                throw new Error('Only admins can create new admin or coach accounts');
            }
        } else if (value !== 'Customer') {
            throw new Error('Invalid user type. User type can be Admin, Coach or Customer');
        }
        return true;
    })
];

exports.loginUserValidator = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
];

exports.updateUserProfileValidator = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').optional().isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
];