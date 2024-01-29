const buildSuccObject = (code = 201, message = 'OK', result = {}) => {
    return {
      status: 'success',
      code:code,
      succMessage: message,
      result : result,
      errMessage:''
    };
}
    
module.exports = { buildSuccObject }