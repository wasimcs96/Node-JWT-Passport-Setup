const { UserModel } = require('../../../models');
const { buildErrObject } = require('../../../utils');
const {v4 : uuidv4} = require('uuid')


exports.registerDBService = (userData = {}) => {
    return new Promise((resolve, reject)=>{
        try{
            const user = UserModel({
                name : userData.name,
                email : userData.email,
                password :userData.password,
                mobile:userData.mobile,
                verification:uuidv4(),
                role:userData.role
            })
            const result = user.save();
            if(result) resolve(result);
            resolve(false);
        }catch(err){
            reject(buildErrObject(422, err.message));
        }
    })
}

// exports.registerDBService = async (userData = {}) => {
//     try{
//         const user = UserModel({
//             name : userData.name,
//             email : userData.email,
//             password :userData.password,
//             mobile:userData.mobile,
//             verification:uuidv4(),
//             role:userData.role
//         })
//         const result = await user.save();
//         return result;
//     }catch(err){
//         console.log(err);
//         return buildErrObject(422, err.message)
//     }
// }
