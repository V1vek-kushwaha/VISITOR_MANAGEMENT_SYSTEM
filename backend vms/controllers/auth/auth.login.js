const db = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = db.User;
const Role = db.Role;
const Department = db.Department;

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, as: "role", attributes: ['name'] }]
    });
    
    
    const validPass = await bcrypt.compare(password, user.password_hash);
    if (!validPass) {
      return res.status(401).json({ message: "Invalid password" });
    }
    
    // if (!user.is_verified) {
    //   return res.status(401).json({ message: "Please verify your email first." });
    // }
    
    const userRole = user.role?.name || "unknown";
    // const userDepartment =
    
    const token = jwt.sign(
      { id: user.id, role: userRole },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    
    await user.update({ last_login: new Date() });
    
    const roleMessage = userRole === "admin"
      ? "Admin logged in successfully!"
      : userRole === "employee"
      ? "Employee logged in successfully!"
      : "Logged in successfully!";
    
    res.status(200).json({
      success: true,
      status: '200',
      token,
      user: {
        name: user.full_name,
        email: user.email,
        role: userRole,
        phone: user.mobile_number,
        isActive: user.is_active
      },
      message: roleMessage,
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
