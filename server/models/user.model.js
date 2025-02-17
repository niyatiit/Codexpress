const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: { type: String, required: true },

    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },

    // Additional fields
    phone: {
      type: String,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
      default: null, // Not required at registration
    },

    profile_picture: { type: String, default: "" },
    
    gender: { type: String, enum: ["Male", "Female", "Other"], default: null },
    
    dob: { type: Date, default: null },
    
    address: { type: String, default: null },
    
    pincode: { type: String, default: null },

    state: { type: mongoose.Schema.Types.ObjectId, ref: "State", default: null },

    city: { type: mongoose.Schema.Types.ObjectId, ref: "City", default: null },

    nationality: { type: String, default: "Indian" },

    is_active: { type: Boolean, default: true },

    is_verified: { type: Boolean, default: false },

    last_login: { type: Date },
  },
  { timestamps: true }
);

// Create the User model
const User = mongoose.model("User", UserSchema);

// Export the model for use in controllers
module.exports = User;
