const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");

// auth routes

router.post("/register", userController.registerUser);

module.exports = router;
