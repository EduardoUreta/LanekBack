// require('dotenv').config();

const config = {
    url: process.env.DATABASE_URL, 
    JWT_SECRET: process.env.JWT_SECRET
  }; 

module.exports = config;



