const express = require('express');
const { validateUserId, 
  validateUser,
   validatePost } = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
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
  // RETURN AN ARRAY WITH ALL THE USERS

router.get('/:id', validateUserId, (req, res, next) => {
  res.json(req.user)
    console.log(req.user)
  
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  console.log(req.user)
});

router.put('/:id', validateUserId, validateUser,(req, res) => {
  Users.update(req.params.id, req.body)
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId,  (req, res, next) => {
  Users.remove(req.params.id)
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId,validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user)
  console.log(req.text)
});
router.use((err, req, res, next)=>{ //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'Error error error',
    message:err.message,
  })
})
// do not forget to export the router
module.exports = router