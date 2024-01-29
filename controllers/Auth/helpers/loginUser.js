const { UserModel } = require('../../../models');
const { buildErrObject,  buildSuccObject} = require('../../../utils');
const { genrateJWTtoken } = require('./genrateJWTtoken');
const { checkHashPassword } = require('./checkHashPassword');

exports.loginDBService = async (userData = {}) => {
    try{
        const user = {email : userData.email}
        let result = await UserModel.findOne(user);
        if(result == null) return false;
        let isPasswordMatched = await checkHashPassword(result, userData.password);
        if(!isPasswordMatched) return false;
        result.token = genrateJWTtoken(result);
        return buildSuccObject(201, "LOGIN_SUCCESS", result);
    }catch(err){
        console.log("Error from loginDBService: ", err);
        return buildErrObject(err.code ?? 422, err.message)
    }
}
