module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("role", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: "roles",
    timestamps: false,
  });

  // Set initial auto_increment to 10000
  Role.afterSync(async () => {
    await sequelize.query("ALTER TABLE roles AUTO_INCREMENT = 10000;");
  });

  return Role;
};
