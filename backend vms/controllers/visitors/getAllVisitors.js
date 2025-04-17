const db = require("../../models");
const Visitor = db.Visitor;

exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.findAll();
    if (!visitors) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }
    res.status(200).json({
      success: true,
      message: 'All visitors',
      data: visitors,
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Something went wrong",
      error: err.message,
     });
  }
};

// module.exports = getAllVisitors;
