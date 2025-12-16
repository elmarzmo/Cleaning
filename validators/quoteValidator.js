const { body } = require('express-validator');

exports.submitQuoteValidator = [
    body('name')
    .trim()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),

    body('email')
    .trim()
    .isEmail()
    .withMessage('Email required'),

    body('phone')
    .trim()
    .isMobilePhone()
    .withMessage('Enter a valid phone number'),

    body('zip')
    .trim()
    .isPostalCode('US')
    .withMessage('Enter a valid ZipCode'),

    body('service')
    .isIn([
        'basic', 'commercial', 'deep', 'move', 'custom-cleaning', 'airbnb-cleaning'
    ])
    .withMessage('Invalid service type'),
    

    body('frequency')
    .isIn(['one-time', 'weekly', 'bi-weekly', 'monthly'])
    .withMessage('Invalid cleaning frequency'),


    body('notes')
    .optional()
    .trim()
    .isLength({ max : 1000})
    .withMessage('notes must be under 1000 characters'),

]