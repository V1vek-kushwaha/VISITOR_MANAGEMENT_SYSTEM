module.exports = (sequelize, DataTypes) => {
  const NfcCard = sequelize.define("nfc_cards", {
    card_uid: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    scan_data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    issued_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
  });

  NfcCard.associate = (models) => {
    NfcCard.belongsTo(models.Visitor, {
      foreignKey: "visitor_id",
      as: "visitor"
    });
  };

  return NfcCard;
};
