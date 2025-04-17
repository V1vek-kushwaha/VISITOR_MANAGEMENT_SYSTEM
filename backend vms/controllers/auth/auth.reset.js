// controllers/auth.reset.js
const jwt = require("jsonwebtoken");
const db = require("../../models");
const User = db.User;
const bcrypt = require("bcrypt");

exports.requestResetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create reset token
    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Optional: Save token/expiry in DB
    // await user.update({ resetToken, resetTokenExpiry: new Date(Date.now() + 15 * 60000) });

    // Mock: Send token in email (in real apps, send via nodemailer)
    console.log(`Reset Password Link: http://localhost:3000/reset-password?token=${resetToken}`);

    return res.json({ message: "Reset link sent! Check your email." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// controllers/auth/auth.reset.js

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password_hash = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

