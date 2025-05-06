const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = db.User;
const userRole = db.Role;
const Department = db.Department;

exports.signup = async (req, res) => {
  const {full_name, email, password, mobile_number, profile_photo_url} = req.body;
  try {
    // Check if required fields are present
    if (!full_name || !email || !password || !mobile_number) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if email already exists
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    // Default department_id if not provided
    // let departmentRecord;
    const deparmentId = await Department.findOne({
      where: {
        name: "HR",
      },
    }).then((data) => {
      console.log(data);
      return data.dataValues.id;
    });

    if (!deparmentId) {
      return res.status(400).json({ message: "Invalid department_id provided." });
    }

    // Default role_id if not provided
    const roleId = await userRole.findOne({
      where: {
        name: "employee",
      },
    }).then((data) => {
      console.log(data);
      return data.dataValues.id;
    });

    if (!roleId) {
      return res.status(400).json({ message: "Invalid role_id provided." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      full_name,
      email,
      password_hash: hashedPassword,
      mobile_number,
      department_id: deparmentId, // Use the validated or default department_id
      role_id: roleId, // Use the validated or default role_id
      profile_photo_url: profile_photo_url || null, // If no URL is provided, set as NULL
      created_at: new Date(),
      last_login: null, // Can be updated later on login
      is_active: true
    });

    // Generate verification token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Setup nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const verifyLink = `http://localhost:3000/api/auth/verify-email?token=${token}`;

    // Send email verification link
    if (!user.email || typeof user.email !== "string") {
      return res.status(400).json({ message: "Invalid user email, cannot send verification email." });
    }
    
    console.log("Sending verification email to:", user.email);
    
    await transporter.sendMail({
      from: '"VMS System" <no-reply@vms.com>',
      to: user.email,
      subject: "Email Verification - VMS",
      html: `<p>Hi ${user.full_name},</p>
             <p>Click the link below to verify your email address:</p>
             <a href="${verifyLink}">Verify Email</a>`,
    });
    

    res.status(201).json({ message: "Registered Successfully!" });
  } catch (err) {
    console.log("errors",err)
    res.status(500).json({ error: err.message });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};



exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    full_name,
    email,
    password,
    mobile_number,
    profile_photo_url
  } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updatedFields = {};

    if (full_name !== undefined) updatedFields.full_name = full_name;
    if (email !== undefined) updatedFields.email = email;
    if (mobile_number !== undefined) updatedFields.mobile_number = mobile_number;
    if (profile_photo_url !== undefined) updatedFields.profile_photo_url = profile_photo_url;

    if (password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password_hash = await bcrypt.hash(password, salt);
    }

    await user.update(updatedFields);

    res.status(200).json({
      success: true,
      message: "User updated",
      data: user
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
