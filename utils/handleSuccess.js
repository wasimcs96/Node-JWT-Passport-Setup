const handleSuccess = (res, result = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.log("Handle Succ ->", result)
    }
    res.status(result.code).json(result);
  }
  
module.exports = { handleSuccess }