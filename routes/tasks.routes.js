const express = require('express')

// Controllers
const {
    createTask,
    readAllTasks,
    readTaskByStatus,
    updateTaskById,
    deleteTaskById,
} = require('../controllers/tasks.controllers')

// Middlewares
const {
    taskExists,
    taskIsActive,
    checkStatusParam,
} = require('../middlewares/tasks.middlewares')

// Validators
const {
    createTaskValidators,
    updateTaskValidators,
} = require('../middlewares/validators.middlewares')

// Create tasksRouter

const tasksRouter = express.Router()

//Define endpoints

tasksRouter.post('/', createTaskValidators, createTask)
tasksRouter.get('/', readAllTasks)
tasksRouter.get('/:status', checkStatusParam, readTaskByStatus)
tasksRouter.patch('/:id', taskIsActive, updateTaskValidators, updateTaskById)
tasksRouter.delete('/:id', taskIsActive, deleteTaskById)

module.exports = { tasksRouter }
