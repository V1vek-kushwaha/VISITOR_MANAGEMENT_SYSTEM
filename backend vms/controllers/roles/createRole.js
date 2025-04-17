const db = require("../../models");
const Role = db.Role;

// Create Role
exports.createRole = async (req, res) => {
  const { name } = req.body;

  try {
    const exists = await Role.findOne({ where: { name, is_deleted: false } });
    if (exists) return res.status(400).json({ message: "Role already exists" });

    const role = await Role.create({ name });
    res.status(201).json({ success: true, message: "Role created", data: role });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get All Roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({ where: { is_deleted: false } });
    res.status(200).json({ success: true, data: roles });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get Role by ID
exports.getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findOne({ where: { id, is_deleted: false } });
    if (!role) return res.status(404).json({ message: "Role not found" });

    res.status(200).json({ success: true, data: role });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update Role
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const role = await Role.findOne({ where: { id, is_deleted: false } });
    if (!role) return res.status(404).json({ message: "Role not found" });

    await role.update({ name });
    res.status(200).json({ success: true, message: "Role updated", data: role });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Soft Delete Role
exports.deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findOne({ where: { id, is_deleted: false } });
    if (!role) return res.status(404).json({ message: "Role not found" });

    await role.update({ is_deleted: true });
    res.status(200).json({ success: true, message: "Role deleted (soft)" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
