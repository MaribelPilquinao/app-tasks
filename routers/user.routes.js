const express = require('express')

// Controllers
const { getAllUsers, createUsers, updateUser, deleteUser} = require('../controllers/user.controller')

// Middlewares
const { userExists } = require('../middlewares/user.middlewares')

// Routers

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post('/', createUsers);

usersRouter.patch('/:id', userExists, updateUser);

usersRouter.delete('/:id', userExists, deleteUser);

module.exports= { usersRouter }