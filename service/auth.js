const jwt = require('jsonwebtoken')

function generateToken(user){
  const payload = {
    _id : user._id,
    username : user.username,
    email : user.email,
    password : user.password,
    profileImageURL : user.profileImageURL,
    role : user.role
    }
  const token = jwt.sign(payload, process.env.JWT_SECRET,{
    expiresIn : '1h'
  })

  return token

}

function validateToken(token){
  try {
    const userPayload = jwt.verify(token, process.env.JWT_SECRET)
    return userPayload
  } catch (error) {
    return null
  }
}


module.exports = {
  generateToken,
  validateToken
}