const { body } = require('express-validator');

exports.submitMessageValidator = [
    body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max : 50 }),

    body('email')
    .trim()
    .isEmail().withMessage('valid eamil required'),

    body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max : 1000})
];