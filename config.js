const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 8000,
    DATABASE_PATH : process.env.DATABASE_PATH || "mongodb://localhost:27017",
    DATABASE_NAME:process.env.DATABASE_NAME || "baseUI",
    ORIGIN : process.env.ORIGIN || 'http://localhost:5200'
}