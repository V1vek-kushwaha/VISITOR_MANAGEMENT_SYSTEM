module.exports = (sequelize, DataTypes) => {
  const VisitorPass = sequelize.define("VisitorPass", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    visit_purpose: {
      type: DataTypes.STRING,
      allowNull: false
    },
    whom_to_visit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    visit_department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    visitor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    keey: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valid_until: {
      type: DataTypes.DATE,
      allowNull: false
    },
    zones_allow: {
      type: DataTypes.JSON,
      allowNull: false
    },
    zone_names: {  // Add this field for the zone names
      type: DataTypes.JSON,  // or DataTypes.STRING if you need it as a simple string
      allowNull: true         // It's allowed to be null or have default value
    },
    
    visitor: {
      type: DataTypes.JSON,
      allowNull: true         
    },
  });

  return VisitorPass;
};
