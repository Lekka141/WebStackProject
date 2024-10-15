const mongoose = require('mongoose');
const config = require('../config'); /* Imports configuration for environment variables */
const logger = require('../utils/logger'); /* Imports the logger utility for logging connection status and errors */

/* Get MongoDB URI from configuration or use a default local URI */
const DB_URI = config.DB_URI || 'mongodb://localhost:27017/vaultconnect';

/**
 * Connects to the MongoDB database using Mongoose.
 */
const connectDB = async () => {
  try {
    /* Attempt to connect to MongoDB */
    await mongoose.connect(DB_URI);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    /* Log connection error and terminate the process */
    logger.error('MongoDB connection error:', error);
    process.exit(1); /* Exit the process with a failure code */
  }
};

/* Export the connectDB function for use in other parts of the application */
module.exports = connectDB;
