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
  HOST: "localhost",
  USER: "root",
  PASSWORD: "admin@123",
  DB: "vivek",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
