const jwt = require('jsonwebtoken');
const { buildErrObject,  handleError} = require('../utils');

exports.requireAuthorization = (roles) => async(req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return handleError(res, buildErrObject(403, "FORBIDDEN"));
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return handleError(res, buildErrObject(403, "INVALID_TOKEN")); 
        const userRole = decoded.data.role;
        if(!(userRole && roles.indexOf(userRole) != -1)) handleError(res, buildErrObject(422, "AUTHORIZATION_FAILED")); 
        next();
    });
}
    
