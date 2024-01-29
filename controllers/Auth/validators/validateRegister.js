const { check } = require('express-validator')
const { UserModel } = require('../../../models');
const { validateParams } = require('./validateParams')

const validateRegister = [
    check('name').not().isEmpty().withMessage('First name is required'),
    check('email').optional({ checkFalsy: true, nullable: true }).isEmail().withMessage('Please enter valid email').custom(async (value, req) => await validateEmail(value, req)),
    check('mobile').optional({ checkFalsy: true }).isInt(),
    check('password').optional({ checkFalsy: true }).isInt(),
    (req, res, next) => {validateParams(req, res, next)}
    // check('last_name').not().isEmpty().withMessage('Last name is required'),
    // check('gender').not().isEmpty().withMessage('Gender is required').isIn(['M', 'F']),
    // check('date_of_birth').toDate().optional({ checkFalsy: true }),
    // check('address').optional({ checkFalsy: true, nullable: true }).isLength({ min: 10 }).withMessage('Please enter minimum 10 characters'),
]

async function validateEmail(value, req) {
    try {
        const user = await UserModel.findOne({email: value})
        if (user) {
            return Promise.reject('User is already exist.')
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {validateRegister};