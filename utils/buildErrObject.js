const buildErrObject = (code = 403, error = 'SOMETHING_WENT_WRONG', result = {}) => {
    return {
        status: 'failed',
        code:code,
        succMessage: '',
        result : result,
        errMessage:error
      }
}
  
module.exports = { buildErrObject }