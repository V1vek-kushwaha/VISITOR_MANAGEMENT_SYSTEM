const jwt = require("jsonwebtoken");
const db = require("../../models");
const User = db.User;

exports.verifyEmail = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).json({ message: "Token is missing" });
  }

  try {
    // Decode token and verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user from decoded ID
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If already verified
    if (user.is_verified) {
      return res.status(200).json({ message: "Email is already verified." });
    }

    // Set verified flag
    user.is_verified = true; // Make sure your column is named `is_verified` in model
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
