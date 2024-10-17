const express = require('express')

const { registerUser, LoginUser,getUsers } = require('../Controller/controller')
const { userRegisterValidation, loginUser } = require('../utils/userValidation')
const { ensureAuth } = require('../utils/auth')
const routes = express.Router()

// db connection 

routes.post('/register',userRegisterValidation,registerUser)

routes.post('/login',loginUser,LoginUser)

routes.get('/users',ensureAuth,getUsers)

module.exports = routes;