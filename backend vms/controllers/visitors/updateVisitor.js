const db = require("../../models");
const Visitor = db.Visitor;
const User = db.User;

exports.updateVisitor = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    console.log(req.body);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const visitorId = req.params.id;
    const visitor = await Visitor.findByPk(visitorId);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const updatedFields = {
      full_name: req.body.full_name || visitor.full_name,
      mobile_number: req.body.mobile_number || visitor.mobile_number,
      email: req.body.email || visitor.email,
      address: req.body.address || visitor.address,
      visitor_type: req.body.visitor_type || visitor.visitor_type,
      government_id_type: req.body.government_id_type || visitor.government_id_type,
      government_id_number: req.body.government_id_number || visitor.government_id_number,
    };

    // If new files are uploaded, update image URLs
    if (req.files?.profile_image) {
      const profileImageFilename = req.files.profile_image[0].filename;
      updatedFields.profile_image = `${baseUrl}/uploads/${profileImageFilename}`;
    }

    if (req.files?.signature_image) {
      const signatureImageFilename = req.files.signature_image[0].filename;
      updatedFields.signature_image = `${baseUrl}/uploads/${signatureImageFilename}`;
    }

    await visitor.update(updatedFields);

    res.status(200).json({
      success: true,
      message: "Visitor updated successfully",
      visitor: visitor.toJSON(),
    });

  } catch (err) {
    console.error("Error updating visitor:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
