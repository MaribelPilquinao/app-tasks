const { Sequelize, DataTypes } = require('sequelize')
const dotenv = require('dotenv')

// Using Environment Variables
dotenv.config('.env')

// Create a database instance
const db = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // port: process.env.DB_PORT,
    database: process.env.DB,
    logging: false, // false to clear console
    dialectOptions: {
        ssl: { rejectUnauthorized: true },
    },
})

module.exports = { db, DataTypes }
