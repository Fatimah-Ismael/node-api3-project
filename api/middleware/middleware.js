const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString();
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp} ${method} ${url}]`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try{
    const user = await Users.getById(req.params.id)
    if(!user){
      res.status(404).json({
        message:'no such user'
      })
    } else {
      req.user = user
      next()
    }
  } catch(err){
    res.status(500).json({
      message: 'Error finding user'
    })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const {name}= req.body
  if(!name){
    res.status(400).json({
      message: 'missing required name field'
    })
  } else {
    next()
  }
  
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text }= req.body;
  if(!text){
    res.status(400).json({
      message: 'missing text required'
    })
  } else{
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger, 
  validatePost, 
  validateUser,
  validateUserId
}