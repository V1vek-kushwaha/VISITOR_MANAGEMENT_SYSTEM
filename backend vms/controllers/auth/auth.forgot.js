const db = require("../../models");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = db.User;

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate token valid for 15 minutes
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // your email
        pass: process.env.MAIL_PASS, // app password from Gmail
      },
    });

    await transporter.sendMail({
      from: `"Your App Name" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
