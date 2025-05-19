// require('dotenv').config();


if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL no está definida en GitHub Actions");
}

const config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
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



