const { check } = require('express-validator')
const { validateParams } = require('./validateParams')


const validateLogin = [
    check('email')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isEmail()
        .withMessage('EMAIL_IS_NOT_VALID'),//.custom(async (value, req) => await validateEmail(value, req)),
    check('password')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isLength({min: 5})
        .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
    (req, res, next) => {validateParams(req, res, next)}
]
module.exports = {validateLogin};