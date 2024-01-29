const { buildErrObject, buildSuccObject, handleError, handleSuccess } = require('../../utils');
const { loginDBService } = require('./helpers/loginUser');
const { matchedData } = require('express-validator');

const { UserModel } = require('../../models');
const { genrateJWTtoken } = require('./helpers/genrateJWTtoken');
const { checkHashPassword } = require('./helpers/checkHashPassword');
 
exports.login = async (req, res) => {
    try{
        let userReqData =  matchedData(req);
        const user = {email : userReqData.email}

        let result = await UserModel.findOne(user);
        if(!result) return handleError(res, buildErrObject(404, "INVALID_LOGIN"));

        let isPasswordMatched = await checkHashPassword(result, userReqData.password);
        if(!isPasswordMatched) return handleError(res, buildErrObject(404, "WRONG_PASSWORD"));
        
        result.token = genrateJWTtoken(result);
        return handleSuccess(res, buildSuccObject(201, "LOGIN_SUCCESS", result));
    }catch(err){
        return handleError(res, err)
    }
}