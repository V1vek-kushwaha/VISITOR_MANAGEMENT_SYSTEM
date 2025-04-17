const db = require("../../models");
const Department = db.Department;

// Create a new department
exports.createDepartment = async (req, res) => {
  const { name, location } = req.body;

  try {
    const exists = await Department.findOne({ where: { name, is_deleted: false } });
    if (exists) return res.status(400).json({ message: "Department already exists" });

    const department = await Department.create({ name, location });
    res.status(201).json({ success: true, message: "Department created", data: department });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all departments (not deleted)
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({
      where: { is_deleted: false },
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({ success: true, data: departments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single department by ID
exports.getDepartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findOne({
      where: { id, is_deleted: false },
    });

    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }

    res.status(200).json({ success: true, data: department });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update department by ID
exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;

  try {
    const department = await Department.findOne({ where: { id, is_deleted: false } });

    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }

    await department.update({ name, location });

    res.status(200).json({ success: true, message: "Department updated", data: department });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Soft delete department
exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findOne({ where: { id, is_deleted: false } });

    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }

    await department.update({ is_deleted: true });

    res.status(200).json({ success: true, message: "Department deleted (soft)" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
