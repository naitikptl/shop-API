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

      const userId = await User.insertUser(name, email, hashedPassword);
      return res.json({
        massage: "user register",
        user: {
          id: userId,
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

async function userLogin(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(402).json({ massage: "email and password is empty " });
    }
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(402).json({ massage: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ massage: "user password id invaild " });
    } else {
      return res.json({
        massage: "user logged in successful",
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }
  } catch (error) {
    return res.status(500).json({
      massage: "internal error",
    });
  }
}
module.exports = {
  registerUser,
  userLogin,
  
};
