const express = require('express');
const { validateUserId, 
  validateUser,
   validatePost } = require('../middleware/middleware')


const Users = require('./users-model')
const Post = require('../posts/posts-model')
const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get(req.query)
  .then(users =>{
  res.json(users)
  })
  .catch(next)
    });
  

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
    console.log(req.user)
  
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert({name: req.name})
  .then(newUser =>{
    res.status(201).json(newUser)
  })
  .catch(next)
 // console.log(req.user)
});

router.put('/:id', validateUserId, validateUser,(req, res, next) => {
  Users.update(req.params.id, {name: req.name})
  .then(()=>{
    return Users.getById(req.params.id)
  })
  .then(user=>{
    res.status(200).json(user)
  })
  .catch(next)
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  try{
    await  Users.remove(req.params.id)
    res.json(req.user)
  }
 catch(err){
  next(err)
 }
  //.then(user=>)
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try{
    const posts= await Users.getUserPosts(req.params.id)
    res.json(posts)
  }catch(err){
    next(err)
  }
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId,validatePost, async (req, res, next) => {
  try{
    const newPost= await Post.insert({ user_id: req.params.id, text: req.text})
    res.status(201).json(newPost)
  }catch(err){
    next(err)
  }
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user)
  console.log(req.text)
});
router.use((err, req, res, next)=>{ //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'Something went wrong in the post router',
    message:err.message,
  })
})
// do not forget to export the router
module.exports = router