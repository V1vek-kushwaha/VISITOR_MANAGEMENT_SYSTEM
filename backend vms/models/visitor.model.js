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
    emirates_id_number: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    emirates_id_expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.TEXT,
    },
    id_document_url: {
      type: DataTypes.TEXT,
    },
    blacklist_reason: {
      type: DataTypes.TEXT,
    },
    is_blacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    emergency_contact_name: {
      type: DataTypes.STRING(100),
    },
    emergency_contact_number: {
      type: DataTypes.STRING(20),
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
  });

  return Visitor;
};
