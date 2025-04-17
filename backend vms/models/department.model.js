module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define("department", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(100),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'departments',
    timestamps: false,
  });

  Department.afterSync(async () => {
    await sequelize.query("ALTER TABLE departments AUTO_INCREMENT = 10000;");
  });

  return Department;
};
