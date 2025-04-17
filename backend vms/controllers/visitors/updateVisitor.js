const db = require("../../models");
const Visitor = db.Visitor;

exports.updateVisitor = async (req, res) => {
  const visitorId = req.params.id;

  // Extracting the fields that need to be updated
  const {
    full_name,
    mobile_number,
    email,
    emirates_id_number,
    emirates_id_expiry,
    nationality,
    photo_url,
    id_document_url,
    blacklist_reason,
    is_blacklisted,
    emergency_contact_name,
    emergency_contact_number,
  } = req.body;

  try {
    // Find the visitor by ID
    const visitor = await Visitor.findByPk(visitorId);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    // Update the visitor details
    visitor.full_name = full_name || visitor.full_name;
    visitor.mobile_number = mobile_number || visitor.mobile_number;
    visitor.email = email || visitor.email;
    visitor.emirates_id_number = emirates_id_number || visitor.emirates_id_number;
    visitor.emirates_id_expiry = emirates_id_expiry || visitor.emirates_id_expiry;
    visitor.nationality = nationality || visitor.nationality;
    visitor.photo_url = photo_url || visitor.photo_url;
    visitor.id_document_url = id_document_url || visitor.id_document_url;
    visitor.blacklist_reason = blacklist_reason || visitor.blacklist_reason;
    visitor.is_blacklisted = is_blacklisted !== undefined ? is_blacklisted : visitor.is_blacklisted;
    visitor.emergency_contact_name = emergency_contact_name || visitor.emergency_contact_name;
    visitor.emergency_contact_number = emergency_contact_number || visitor.emergency_contact_number;

    // Save the updated visitor
    await visitor.save();


    res.status(200).json({
      success: true,
      message: "Visitor updated successfully",
      data: visitor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
