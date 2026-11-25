const User = require("../modele/user");
const db = require("../config/db");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const user = await User.getUserByEmail(email);

    if (user) {
      return res.status(401).json({ massage: "email already used " });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.insertUser(name, email, hashedPassword);
      return res.json({
        massage: "user register",
        user: {
          id: result.inserId,
          name: name,
          email: email,
        },
      });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  registerUser,
};
