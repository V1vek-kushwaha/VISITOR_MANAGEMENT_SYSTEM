const dbConfig = require("../config/Database/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  port: 26019,
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ Register Models
db.User = require("./user.model")(sequelize, Sequelize);
db.Visitor = require("./visitor.model")(sequelize, Sequelize);

// for role API
db.Role = require("./role.model")(sequelize, Sequelize);
// Define association (optional but useful)
db.Role.hasMany(db.User, { foreignKey: "role_id" });
db.User.belongsTo(db.Role, { foreignKey: "role_id" });


// For deparment 
db.Department = require("./department.model")(sequelize, Sequelize);
// Associate if needed
db.Department.hasMany(db.User, { foreignKey: "department_id" });
db.User.belongsTo(db.Department, { foreignKey: "department_id" });

db.VisitorsType = require("./visitors_type.model")(sequelize, Sequelize);


// nfc_cards )
db.nfc_cards = require("./nfc_cards.model")(sequelize, Sequelize.DataTypes);
db.Visit = require("./visites.model")(sequelize, Sequelize.DataTypes);

db.VisitorPass = require('./visitors_pass.model')(sequelize, Sequelize);





module.exports = db;
