const { buildErrObject, buildSuccObject, handleError, handleSuccess } = require('../../utils');
const {registerDBService} = require('./helpers/registerUser');
 
exports.register = async (req, res) => {
    try{
        let userData = req.body;
        const response = await registerDBService(userData);
        return handleSuccess(res, buildSuccObject(201, "REGISTER_SUCCESS", response));
    }catch(err){
        handleError(res, err)
    }
}