const {Router} = require('express')
const router = Router()
const Blog = require('../model/blog.model.js')
const upload = require('../config/multer.js')
const Comment = require('../model/comment.model.js')

router.get('/add-new', (req, res) => {
  console.log(req.user)
    res.render('addBlog', {
      user : req.user
    })
});
router.post('/add-new',upload.single('coverImageURL'),async (req, res) => {
   const {title,body} = req.body


   const blog = await Blog.create({
        title,
        body,
        coverImageURL : req.file.filename,
        createdBy : req.user._id
   })

    res.redirect('/blog/add-new')

});

router.get('/:blogId',async (req,res)=>{
    const blogId = req.params.blogId
    console.log(blogId)
    const blog = await Blog.findById(blogId).populate('createdBy')

    if(!blog){
        return res.status(404).render('404',{
            user : req.user
        })
    }
    const comments = await Comment.find().populate('createdBy').populate('blogId')
    console.log(comments)
    return res.render('blog',{
        blog,
        user : req.user,
        comments
    })
})

router.post('/comment/:blogId',async (req,res)=>{
    const blogId = req.params.blogId
    const {content} = req.body

    const comment = await Comment.create({
        content,
        blogId,
        createdBy: req.user ? req.user._id : null, // null if not logged in
    })

    return res.redirect(`/blog/${blogId}`)
})









module.exports = router