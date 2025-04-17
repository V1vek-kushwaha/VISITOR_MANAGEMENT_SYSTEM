require("dotenv").config();

// module.exports = {
//   HOST: process.env.DATABASE_URL,
//   USER: process.env.DATABASE_USER,
//   PASSWORD: process.env.DATABASE_PASSWORD,
//   DB: "defaultdb",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
