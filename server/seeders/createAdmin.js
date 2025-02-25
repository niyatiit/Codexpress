const mongoose = require("mongoose");
const User = require("../models/user.model");
require("dotenv").config();
const Role = require("../models/role.model");

async function createAdmin() {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    const adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) throw new Error("Admin role not found!");

    const adminUser = new User({
      username: "khushipal",
      first_name: "Khushi",
      last_name: "Pal",
      email: "khushipal1470@gmail.com",
      password: "khushi123",  // changing to admin123
      role: adminRole._id,
      phone: "7043121390",
      profile_picture: "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon.jpg",
      gender: "Female",
      dob: new Date("2005-03-29"),
      address: "Admin Street, India",
      pincode: "110001",
      state: new mongoose.Types.ObjectId("67b49b73d89365b3dbfdef24"),
      city: new mongoose.Types.ObjectId("67b49df4d89365b3dbfdef38"),
      nationality: "Indian",
      is_active: true,
      is_verified: true,
      last_login: new Date(),
      deletedAt: null,
    });

    await adminUser.save(); // ✅ Password will be hashed automatically
    console.log("✅ Admin user created successfully!");
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

createAdmin();
