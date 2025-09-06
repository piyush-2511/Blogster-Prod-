const {Schema, model} = require('mongoose');

const {randomBytes, createHmac} = require('crypto')
const {generateToken, validateToken} = require('../service/auth.js')

const userSchema = new Schema({
  username : {
    type : String, 
    required : true,
    unique : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  createdAt : {
    type : Date,
    default : Date.now
  },
  salt : {
    type : String
  },
  profileImageURL : {
    type : String,
    default : 'default.jpg'
  },
  role : {
    type : String,
    enum : ['USER', 'ADMIN'],
    default : 'USER'
  }
}, {timestamps : true})

userSchema.pre('save', function(next){
  const user = this 

  if (!user.isModified('password')) return next()
  
  const salt = randomBytes(16).toString()
  const hashPassword = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex')

  user.password = hashPassword
  user.salt = salt

  next()
})

userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
  const user = await this.findOne({email})

  const salt = randomBytes(16).toString()
  const hashPassword = createHmac('sha256', user.salt)
    .update(password)
    .digest('hex')

  if (user.password !== hashPassword){
    throw new Error('Invalid credentials')
  }

  const token = generateToken(user)
  return token
})




module.exports = model('User', userSchema)