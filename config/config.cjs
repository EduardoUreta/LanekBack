require('dotenv').config();

const config = process.env.DATABASE_URL
  ? {
      url: process.env.DATABASE_URL, 
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      JWT_SECRET: process.env.JWT_SECRET
    }
  : {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
      JWT_SECRET: process.env.JWT_SECRET
    };

module.exports = config;



