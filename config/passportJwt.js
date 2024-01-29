const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { buildErrObject,  handleError} = require('../utils');
const { findUserDBService } = require('./../controllers/User/helpers/findUser')

// exports.initialaizingPassportLocal = (passport) => {
//     passport.use(new LocalStrategy (authUser));
//     passport.serializeUser( (userObj, done) => {
//         done(null, userObj)
//     })
//     passport.deserializeUser(async (userObj, done) => {
//         let authenticated_user = await findUserDBService(userObj.email);
//         if(!authenticated_user) return done(null, false);
//         done (null, userObj )
//     })
// }

// authUser = async (user, password, done) => {
//     try{
//         let authenticated_user = await findUserDBService(user);
//         if(!authenticated_user) return done(null, false);
//         return done (null, authenticated_user )
//     }catch(err){
//         return done(err, false);
//     }
// }

exports.initialaizingPassportJWT = () => {
        passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken({failmessage: 'missing token'}),
            secretOrKey   : process.env.JWT_SECRET
            },
            async function (jwtPayload, done) {
                try{
                    let authenticated_user = await findUserDBService(jwtPayload.data.email);
                    if(authenticated_user)
                        return done (null, authenticated_user );
                    else
                        return done(err, false);
                }catch(err){
                    return done(err, false);
                }
            },
        ));
}
exports.requireAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            const err = {};
            err.code = 401;
            err.message = 'INVALID_TOKEN';
            return handleError(res, buildErrObject(err.code ?? 422, err.message));
        }
        return next(); 
    })(req, res, next); 
}





