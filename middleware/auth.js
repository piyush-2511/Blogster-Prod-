const {generateToken, validateToken} = require('../service/auth.js')

function checkForAuthentication(cookieName){
  return (req, res, next) => {
    const token = req.cookies[cookieName]
    res.locals.user = null;
    if (!token) {
      return next()
    }

    try{
      const userPayload = validateToken(token)
      req.user = userPayload
      res.locals.user = userPayload  
    }catch(error){}
    next()
  }
}

module.exports = {
  checkForAuthentication
}