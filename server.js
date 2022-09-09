// Import dotenv library
const dotenv = require('dotenv')

// Import app server
const { app } = require('./app')

// Import database instance
const { db } = require('./utils/database.util')

// Import models relations
const { initModels } = require('./models/initModels')

// Using Environment Variables
dotenv.config('.env')

// Function with the steps to turn on the server
const startServer = async () => {
    try {
        // Establish connection to database
        await db.authenticate()

        //Establish relations
        initModels()

        // Syncrhonize database
        await db.sync()

        const PORT = 4000

        // Set server to listen on localhost:4000
        app.listen(PORT, () => {
            console.log('Conection to database complete successfully')
            console.log('Synchronization to database complete successfully')
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

startServer()
