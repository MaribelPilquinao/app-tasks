const { Task } = require('../models/task.model')

const taskExists = async (req, res, next) => {
    try {
        const { id } = req.params

        const task = await Task.findOne({ where: { id } })

        // If task doesn't exist, send error message
        if (!task) {
            return res.status(404).json({
                status: 'error',
                message: 'Task not found',
            })
        }

        req.task = task

        next()
    } catch (err) {
        console.log(err)
    }
}

const taskIsActive = async (req, res, next) => {
    try {
        const { id } = req.params
        const status = 'active'

        const task = await Task.findOne({ where: { id, status } })

        // If task doesn't exist, send error message
        if (!task) {
            return res.status(404).json({
                status: 'error',
                message: 'Task not is active',
            })
        }

        req.task = task

        next()
    } catch (err) {
        console.log(err)
    }
}

const checkStatusParam = (req, res, next) => {
    const statusValids = ['active', 'completed', 'late', 'cancelled']

    const { status } = req.params

    if (!statusValids.includes(status)) {
        res.status(400).json({
            status: 'error',
            message: 'Allowed params: active, completed, late, cancelled',
        })
    }
    next()
}

// const compareFinishDate = async (req, res, next) => {
//     const { task } = req

//     const { finishDate } = req.body

//     const { limitDate } = task

//     if (limitDate >= finishDate) {
//         await task.update({ status: 'completed', finishDate })
//         return next()
//     }
//     await task.update({ status: 'late', finishDate })
//     next()
// }

module.exports = {
    taskExists,
    taskIsActive,
    checkStatusParam,
    compareFinishDate,
}
