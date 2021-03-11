const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const date = new Date()
  
  req.date = date
  console.log('logger has been met')
  console.log(`${req.method} request at ${req.url} at ${req.date}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try{
    const user = await Users.getById(req.params.id)
    if(!user) {
      res.status(404).json({
        message:`user with id ${req.params.id} does not exist`
      })
    } else {
      req.user = user
      next()
    }
  } catch(err) {
    next(err)
  }
}

async function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try{
    if (!req.body.name){
      res.status(400).json({
        message:`missing user data`
      })
    } else if (!req.body) {
      res.status(400).json({
        message:`missing required name field`
      })
    } else {
      next()
    }
  } catch(err) {
    next(err)
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  try{
    if(!req.body){
      res.status(400).json({
        message:`missing post data`
      })
    } else {
      next()
    }
  } catch(err) {
    next(err)
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}
