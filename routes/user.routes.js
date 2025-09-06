const {Router} = require('express');
const router = Router()
const User = require('../model/user.model') 
const path = require('path')
const upload = require('../config/multer.js')


router.get('/signup', (req, res) => {
    res.render('signup')
});

router.post('/signup',upload.single('profileImageURL'),async (req,res)=>{
  const {username, email, password} = req.body
  const existingUser = await User.findOne({email})
  if(existingUser){
    return res.status(400).json({message : 'User already exists'})
  }

  console.log(req.file)
  const user = await User.create({
    username,
    email,
    password,
    profileImageURL : req.file.filename
  })

  return res.redirect('/user/signin')
})



router.get('/signin', (req, res) => {
    res.render('signin')
});

router.post('/signin', async (req,res)=>{
  const {email, password} = req.body
  
  try{
    const token = await User.matchPasswordAndGenerateToken(email, password)
    console.log(token)
    res.cookie('token',token)
    return res.redirect('/')
  }catch(error){
    res.status(400).render('signin',{
      error : "Invalid Credentials"
    })
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.redirect('/')
});


module.exports = router