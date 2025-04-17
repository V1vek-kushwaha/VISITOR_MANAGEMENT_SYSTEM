const db = require("../../models");
const Visitor = db.Visitor;

exports.deleteVisitor = async (req, res) => {
  try {
    const visitorId = req.params.id;
    const visitor = await Visitor.findByPk(visitorId);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    // ✅ Delete the visitor
    await visitor.destroy();

    res.status(200).json({
      success: true,
      message: "Visitor deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
