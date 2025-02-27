const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    first_name: { type: String, trim: true, default: "" },
    last_name: { type: String, trim: true, default: "" },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Exclude password by default in queries
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    phone: {
      type: String,
      sparse: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
      default: null,
    },
    

    profile_picture: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\..+/.test(v); // Ensures it's a valid URL
        },
        message: "Invalid profile picture URL",
      },
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },

    dob: { type: Date, default: null },

    address: { type: String, default: "", trim: true },

    pincode: {
      type: String,
      match: [/^\d{6}$/, "Please enter a valid 6-digit pincode"],
      default: "",
    },

    state: { type: mongoose.Schema.Types.ObjectId, ref: "State", default: null },

    city: { type: mongoose.Schema.Types.ObjectId, ref: "City", default: null },

    nationality: { type: String, default: "Indian", trim: true },

    is_active: { type: Boolean, default: true },

    is_verified: { type: Boolean, default: false },

    last_login: { type: Date },

     resetPasswordToken: {
      type: String,
      select: false, // Hide from queries
    },
    resetPasswordExpires: {
      type: Date,
      select: false, // Hide from queries
    },
    deletedAt: { type: Date, default: null }, // Soft delete option
  },
  { timestamps: true }
);

// 🔹 Hash password before saving (only if modified)
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});
// Create & Export Model
const User = mongoose.model("User", userSchema);
module.exports = User;
