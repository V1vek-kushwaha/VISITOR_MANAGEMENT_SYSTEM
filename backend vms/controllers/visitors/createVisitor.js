const db = require("../../models");
const Visitor = db.Visitor;
const User = db.User;

exports.addVisitor = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate required files
    if (!req.files || !req.files['profile_image'] || !req.files['signature_image']) {
      return res.status(400).json({ success: false, message: "Profile and signature images are required" });
    }

    // Build base URL (e.g., http://localhost:5000)
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const profileImageFilename = req.files['profile_image'][0]?.filename;
    const signatureImageFilename = req.files['signature_image'][0]?.filename;


    const newVisitor = await Visitor.create({
      full_name: req.body.full_name,
      mobile_number: req.body.mobile_number,
      email: req.body.email,
      address: req.body.address,
      profile_image: `${baseUrl}/uploads/${profileImageFilename}`,
      signature_image: `${baseUrl}/uploads/${signatureImageFilename}`,
      visitor_type: req.body.visitor_type,
      government_id_type: req.body.government_id_type,
      government_id_number: req.body.government_id_number,
      created_at: new Date(),
      created_by: user.id
    });

    // Return JSON with full image URLs
    res.status(201).json({
      success: true,
      message: "Visitor added successfully",
      visitor: {
        ...newVisitor.toJSON()
      }
    });

  } catch (err) {
    console.error("Error adding visitor:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
