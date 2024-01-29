const jwt = require('jsonwebtoken');
exports.genrateJWTtoken = (userData) => {
    return jwt.sign(
        {
            data: {email: userData.email, role:userData.role},
            exp: Math.floor(Date.now() / 1000) + 60 * process.env.JWT_EXPIRATION_IN_MINUTES
        },
        process.env.JWT_SECRET
    );
}
