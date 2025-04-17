const db = require("../../models");
const Visitor = db.Visitor;
const User = db.User;

exports.addVisitor = async (req, res) => {
  try {
    // req.user is coming from token middleware
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" ,
      });
    }
    if (!user.email || typeof user.email !== "string") {
      return res.status(400).json({ message: "Email already use" });
    }

    const newVisitor = await Visitor.create({
      full_name: req.body.full_name,
      mobile_number: req.body.mobile_number,
      email: req.body.email,
      emirates_id_number: req.body.emirates_id_number,
      emirates_id_expiry: req.body.emirates_id_expiry,
      nationality: req.body.nationality,
      photo_url: req.body.photo_url,
      id_document_url: req.body.id_document_url,
      blacklist_reason: req.body.blacklist_reason || "",
      is_blacklisted: req.body.is_blacklisted || false,
      emergency_contact_name: req.body.emergency_contact_name,
      emergency_contact_number: req.body.emergency_contact_number,
      created_at: new Date()
    });

    res.status(201).json({ 
      success: true,
      message: "Visitor added successfully", 
      visitor: newVisitor 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
