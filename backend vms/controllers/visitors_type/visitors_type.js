const db = require("../../models");
const Type = db.VisitorsType;

// Create Type
exports.createType = async (req, res) => {
  const { name } = req.body;

  try {
    const exists = await Type.findOne({ where: { name, is_deleted: false } });
    if (exists) return res.status(400).json({ message: "Visitors Type already exists" });

    const type = await Type.create({ name });
    res.status(201).json({ success: true, message: "Visiters Type created", data: type });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get All Types
exports.getTypes = async (req, res) => {
  try {
    const types = await Type.findAll({ where: { is_deleted: false } });
    res.status(200).json({ success: true, data: types });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get Type by ID
exports.getTypeById = async (req, res) => {
  const { id } = req.params;

  try {
    const type = await Type.findOne({ where: { id, is_deleted: false } });
    if (!type) return res.status(404).json({ message: "Visitors Type not found" });

    res.status(200).json({ success: true, data: type });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update Type
exports.updateType = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const type = await Type.findOne({ where: { id, is_deleted: false } });
    if (!type) return res.status(404).json({ message: "Visitors Type not found" });

    await type.update({ name });
    res.status(200).json({ success: true, message: "Visitors Type updated", data: type });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete Type (Soft Delete)
exports.deleteType = async (req, res) => {
  const { id } = req.params;

  try {
    const type = await Type.findOne({ where: { id, is_deleted: false } });
    if (!type) return res.status(404).json({ message: "Visitors Type not found" });

    await type.update({ is_deleted: true });
    res.status(200).json({ success: true, message: "Visitors Type deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
