// Import models
const { User } = require('../models/user.model')
const { Task } = require('../models/task.model')

const createTask = async (req, res) => {
    try {
        const newTask = ({ userId, title, limitDate, startDate } = req.body)

        await Task.create(newTask)

        res.status(201).json({
            status: 'success',
            data: newTask,
        })
    } catch (err) {
        console.log(err)
    }
}

const readAllTasks = async (req, res) => {
    try {
        const taks = await Task.findAll({
            attributes: [
                'id',
                'title',
                'startDate',
                'finishDate',
                'limitDate',
                'status',
            ],
            include: {
                model: User,
                attributes: ['id', 'name', 'email', 'status'],
            },
        })

        res.status(200).json({
            status: 'success',
            data: taks,
        })
    } catch (err) {
        console.log(err)
    }
}

const readTaskByStatus = async (req, res) => {
    try {
        const { status } = req.params
        const tasks = await Task.findAll({
            where: { status },
            attributes: [
                'id',
                'title',
                'startDate',
                'finishDate',
                'limitDate',
                'status',
            ],
            include: {
                model: User,
                attributes: ['id', 'name', 'email', 'status'],
            },
        })

        res.status(200).json({
            status: 'success',
            data: tasks,
        })
    } catch (err) {
        console.log(err)
    }
}

// This method need a fix
const updateTaskById = async (req, res) => {
    try {
        const { task } = req

        const { finishDate } = req.body

        const finishDateObject = new Date(finishDate)

        const { limitDate } = task

        if (limitDate >= finishDateObject) {
            await task.update({ status: 'completed', finishDate })
            return res.status(200).json({
                status: 'success',
                data: task,
            })
        }
        await task.update({ status: 'late', finishDate })
        res.status(200).json({
            status: 'success',
            data: task,
        })
    } catch (err) {
        console.log(err)
    }
}

const deleteTaskById = async (req, res) => {
    try {
        const { task } = req

        await task.update({ status: 'cancelled' })

        res.status(204).json({ status: 'success' })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    createTask,
    readAllTasks,
    readTaskByStatus,
    updateTaskById,
    deleteTaskById,
}
