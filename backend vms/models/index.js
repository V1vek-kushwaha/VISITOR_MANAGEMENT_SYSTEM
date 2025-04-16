const dbConfig = require("../config/Database/db.config");
console.log("db config:", dbConfig);

const Sequelize = require("sequelize");
// const { applyAssociations } = require("./applyAssociations");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  //   port: 14193, //actual server port
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectOptions: {
    // ssl: {
    //   require : false,
    //   rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
    // },
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// const modelDefiners = [
//   ...require("./user"),
//   ...require("./property"),
//   ...require("./alc"),
//   ...require("./leads"),
//   ...require("./payment"),
//   ...require("./brodcast"),
//   ...require("./reports"),
//   ...require("./cms"),

//   // Add more models here...
//   // require('./models/item'),
// ];
// We define all models according to their files.
// for (const modelDefiner of modelDefiners) {
//   modelDefiner(sequelize);
// }

// We execute any extra setup after the models are defined, such as adding associations.
// applyAssociations(sequelize);

module.exports = sequelize;
