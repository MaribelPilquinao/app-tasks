const express = require('express')

// Routers

// Init our Express app
const app = express()

// Enable Express app to receive JSON data
app.use(express.json())

// Define endpoints

// Catch non-existing endpoints
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url} does not exists in our server`,
    })
})

module.exports = { app }
