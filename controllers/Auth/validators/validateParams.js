const { validationResult } = require('express-validator');
const { buildErrObject } = require('../../../utils/buildErrObject');
const { handleError } = require('../../../utils/handleError');


const validateParams = (req, res, next) => {
    try {
        validationResult(req).throw()
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase()
        }
        return next()
    } catch (err) {
        const errorMessage = err.array().map(err => err.msg).join(', ');
        return handleError(res, buildErrObject(422, errorMessage));
    }
}
module.exports =  { validateParams }