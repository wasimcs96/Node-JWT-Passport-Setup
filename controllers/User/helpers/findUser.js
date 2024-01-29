const { UserModel } = require('../../../models');
const { buildErrObject } = require('../../../utils');

exports.findUserDBService = async (userEmail) => {
    try{
        const user = {email : userEmail}
        const result = await UserModel.findOne(user);
        //if(result == null) throw buildErrObject(404, "INVALID_LOGIN");
        return result;
    }catch(err){
        return buildErrObject(err.code ?? 422, err.message)
    }
}
