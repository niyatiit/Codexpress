const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const JWT_SECRET = "my_secret_key"; // Change this to a secure secret

// ✅ Signup Function
exports.signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      phone,
      gender,
      address,
      pincode,
      state,
      city,
    } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      phone,
      gender,
      address,
      pincode,
      state,
      city,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error in Signup", error: error.message });
  }
};

// ✅ Login Function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      console.log("Password : "+password);
      console.log("User Password : "+user.password);
      return res.status(400).json({ message: "Invalid Credentials" });
}
    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error in Login", error: error.message });
  }
};
