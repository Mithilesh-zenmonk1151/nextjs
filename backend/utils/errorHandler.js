  exports.handleError  = (res,error) => {
    if(error.name === 'CONFLICT') {
      return res.status(409).json({
        success: false,
        message: error.message
      })
    } else if (error.name === 'BAD_REQUEST') {
      return res.status(404).json({
        success: false,
        message: error.message
      })
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  