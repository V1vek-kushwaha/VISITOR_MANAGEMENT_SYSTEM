module.exports = (sequelize, DataTypes) => {
  const Visit = sequelize.define("Visit", {
    visitor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    visitor_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    host_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    check_in_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    check_out_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    purpose_category: {
      type: DataTypes.ENUM("Official", "Personal", "Interview", "Delivery"),
      allowNull: false,
    },
    visit_status: {
      type: DataTypes.ENUM("Pending", "CheckedIn", "CheckedOut", "Cancelled"),
      allowNull: false,
    },
    is_signed_out: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    badge_printed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    pre_approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return Visit;
};
