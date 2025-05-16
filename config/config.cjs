require('dotenv').config();

const config = 
  {
    url: process.env.DATABASE_URL, 
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    JWT_SECRET: process.env.JWT_SECRET
  };

module.exports = config;



