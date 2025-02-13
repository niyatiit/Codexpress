const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    profile_picture: { type: String, default: "" },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dob: { type: Date },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
    nationality: { type: String, default: "Indian" },
    is_active: { type: Boolean, default: true },
    is_verified: { type: Boolean, default: false },
    last_login: { type: Date },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
