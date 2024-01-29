const handleError = (res, err = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.log("Handle Error ->", err)
    }
    res.status(err.code).json(err);
  }
  
module.exports = { handleError }