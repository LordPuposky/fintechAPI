const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

// Database connection state
let _db;

// Initialize Mongoose connection
const initDb = (callback) => {
    if (_db) {
        console.log('Database is already initialized!');
        return callback(null, _db);
    }

    // Use the URI from .env file
    mongoose
        .connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            console.log('Connected to MongoDB via Mongoose');
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

// Return the database connection
const getDb = () => {
    if (!_db) {
        throw Error('Database not initialized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb
};