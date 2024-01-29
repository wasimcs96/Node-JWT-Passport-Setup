exports.checkHashPassword = (userModel, password) => {
    return new Promise((resolve, reject) => {
        userModel.comparePassword(password, (err, isMatch)=>{
            if(err) return reject(err);
            if(!isMatch)  resolve(false);
            resolve(true);
        });
    })
}