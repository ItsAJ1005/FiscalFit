const bcrypt = require("bcrypt");
const NaiveUser = require("../models/naiveUser");

const jwt = require('jsonwebtoken');
const ExpertUser = require("../models/expertUser");
const User = require("../models/User");

const SupremeUser = require("../models/supremeUser");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "Port-folio-hulala", {
    expiresIn: maxAge,
  });
};

const emailRegex = /^[^\s@]+@gmail\.com$/; 

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validation for required fields
    if (!email || !password || !username || !role) {
      return res.status(400).json({ message: "Username, email, password, and role are required" });
    }

    // Validation for email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format. Email should end with @gmail.com" });
    }

    // Validation for password length
    if (password.length < 8) {
      return res.status(400).json({ message: "Password should be at least 8 characters long" });
    }

    const existingEmailUser = await NaiveUser.findOne({ email });
    if (existingEmailUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const existingUsernameUser = await NaiveUser.findOne({ username });
    if (existingUsernameUser) {
      return res.status(400).json({ message: "User with this username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = "";
    if (req.body.role === 'supreme') {
      const newSupremeUser = new SupremeUser({ username, email, password: hashedPassword, role });
      newUser = newSupremeUser;
      await newSupremeUser.save();
    } else if (req.body.role === 'naive') {
      const newNaiveUser = new NaiveUser({ username, email, password: hashedPassword, role });
      newUser = newNaiveUser;
      await newNaiveUser.save();
    } else if (role === 'expert') {
      const newExpertUser = new ExpertUser({ username, email, password: hashedPassword, role });
      newUser = newExpertUser;
      await newExpertUser.save();
    } else {
      return res.status(400).json({ message: "Role can either be naive or expert" });
    }

    if (!newUser) {
      return res.status(400).json({ message: "User creation failed" });
    }

    const token = createToken(newUser._id);
    res.cookie("jwt", token, { httpOnly: true, secure: false, maxAge: maxAge * 1000 });
    res.status(201).json({ message: "User created successfully", user: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true,secure: false, maxAge: maxAge * 1000 });
    res.status(200).json({ message: "Login successful", user: user._id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    await res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error clearing cookie:", error);
    res.status(500).json({ message: "Error logging out" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both oldPassword and newPassword are required" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};