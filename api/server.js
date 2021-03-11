const express = require('express');
const usersRouter = require('./users/users-router')
const {logger, validateUserId, validateUser, validatePost} = require('./middleware/middleware')
const server = express();



server.use(express.json())
server.use(logger)


server.use('/api/users', usersRouter)
// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


// eslint-disable-next-line
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message, // DEV
    stack: err.stack, // DEV
    custom: 'something went wrong. not sure what. sorry :(', // PRODUCTION
  })
})


module.exports = server;
