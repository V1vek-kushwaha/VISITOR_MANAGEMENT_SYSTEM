module.exports = (sequelize, DataTypes) => {
  const Visitor = sequelize.define("Visitor", {
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    signature_image: {
      type: DataTypes.TEXT,
    },
    profile_image: {
      type: DataTypes.TEXT,
    },
    // 🔽 New fields added
    visitor_type: {
      type: DataTypes.STRING(50),
    },
    government_id_type: {
      type: DataTypes.STRING(50),
    },
    government_id_number: {
      type: DataTypes.STRING(50),
    },
    
  });
  // Set initial auto_increment to 10000
  Visitor.afterSync(async () => {
    await sequelize.query("ALTER TABLE roles AUTO_INCREMENT = 200400;");
  }, {
    tableName: 'Visitors',
    timestamps: false,
  });

  return Visitor;
};
