const db = require('../models');
const Visit = db.Visit;
const Visitor = db.Visitor;
const VisitorType = db.VisitorsType;
const User = db.User;
const Department = db.Department;

exports.createVisit = async (req, res) => {
  try {
    const newVisit = await Visit.create(req.body);
    res.status(201).json({
      message: "Visit created successfully",
      data: newVisit,
    });
  } catch (error) {
    console.error("Create Visit Error:", error);
    res.status(500).json({
      message: "Create failed",
      error: error.message,
    });
  }
};



exports.getAllVisits = async (req, res) => {
  try {
    const visits = await Visit.findAll();
    res.status(200).json({
      status: true,
      message: "All Visits Here!",
      data: visits
    });
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
};

exports.getVisitById = async (req, res) => {
  try {
    const visit = await Visit.findByPk(req.params.id);
    if (!visit) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({
      status: true,
      data: visit
    });
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
};

exports.updateVisit = async (req, res) => {
  try {
    const updated = await Visit.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated[0] === 0) return res.status(404).json({ message: 'Not found' });
    const updatedVisit = await Visit.findByPk(req.params.id);
    res.status(200).json({
      status: true,
      message: "Visit Updated successfully",
      data: updatedVisit
    });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

exports.deleteVisit = async (req, res) => {
  try {
    const deleted = await Visit.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ 
      status: true,
      message: "Visit deleted successfully",
      message: 'Deleted successfully' 
    });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};
