module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define("Visitors_Type", {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });

  return Type;
};
