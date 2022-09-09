const { body, validationResult } = require('express-validator')

const checkValidations = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg)

        const message = errorMessages.join('. ')

        return res.status(400).json({
            status: 'error',
            message,
        })
    }

    next()
}

const createTaskValidators = [
    body('userId')
        // Add a custom validator to check if userId exists
        .notEmpty()
        .withMessage('Must provide a User ID')
        .isNumeric()
        .withMessage('User ID must be a integer'),

    body('title')
        .isString()
        .withMessage('Title must be a string')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters'),

    body('limitDate')
        .notEmpty()
        .withMessage('Must provide a limit date')
        .isDate()
        .withMessage(
            'Limit date must be a date format (“YYYY-MM-DD HH:mm:ss”)'
        ),

    body('startDate')
        .notEmpty()
        .withMessage('Must provide a start date')
        .isDate()
        .withMessage(
            'Start date must be a date format (“YYYY-MM-DD HH:mm:ss”)'
        ),
    checkValidations,
]

const updateTaskValidators = [
    body('finishDate')
        .notEmpty()
        .withMessage('Must provide a finish date')
        .isDate()
        .withMessage(
            'Finish date must be a date format (“YYYY-MM-DD HH:mm:ss”)'
        ),
    checkValidations,
]

module.exports = { createTaskValidators, updateTaskValidators }
