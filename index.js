require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const {checkForAuthentication} = require('./middleware/auth.js')
const cookieParser = require('cookie-parser')
const Blog = require('./model/blog.model.js')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('MongoDB connected');
})

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())
app.use(checkForAuthentication('token'))

const userRoutes = require('./routes/user.routes.js')
const blogRoutes = require('./routes/blog.routes.js')
app.use('/user', userRoutes)
app.use('/blog', blogRoutes)

app.get('/', async (req, res) => {

  const allBlogs = await Blog.find({}).populate('createdBy')
  console.log(allBlogs)
  res.render('home', {
    user : req.user,
    blogs : allBlogs
  })
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})