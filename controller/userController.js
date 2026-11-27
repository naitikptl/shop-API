const User = require("../modele/user");
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utile/tokenGenerator");
const { json } = require("express");

async function registerUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const user = await User.getUserByEmail(email);

    if (user) {
      return res.status(401).json({ massage: "email already used " });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = await User.insertUser(name, email, hashedPassword);

      const token = await generateToken(userId);
      return res.json({
        massage: "user register",
        token: token,
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
      const token = await generateToken(user);

      return res.json({
        massage: "user logged in successful",
        token: token,
      });
    }
  } catch (error) {
    return res.status(500).json({
      massage: "internal error",
    });
  }
}

async function getUserProfile(req, res) {
  const userId = res.user.userId;

  try {
    const user = await User.getUserById(userId);
    if (!user) {
      return res.status(402).json({ massage: "user not found" });
    }
    return res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    return res.status(402).json({
      error: error,
      massage: "internal error",
    });
  }
}

async function updateUser(req, res) {
  const user = res.user.userId;
  const { name, email, phone } = req.body;

  try {
    const updatedData = User.upDateUser(name, email, phone, user);
    return res.json({
      massage: "user profile updated",
    });
  } catch (error) {
    return res.status(402).json({
      error: error,
      massage: "internal error ",
    });
  }
}

module.exports = {
  registerUser,
  userLogin,
  getUserProfile,
  updateUser,
};
