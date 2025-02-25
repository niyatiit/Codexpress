const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    if (!password) throw new Error("Password is required!");
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
  } catch (error) {
    console.error("❌ Error hashing password:", error.message);
    throw error;
  }
};

module.exports = hashPassword;
