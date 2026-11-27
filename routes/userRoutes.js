const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");
const verifyToekn = require("../middleware/auth");

// auth routes

router.post("/register", userController.registerUser);
router.post("/login", userController.userLogin);

//user profile routes

router.get("/profile", verifyToekn, userController.getUserProfile);
router.post("/profile/update", verifyToekn, userController.updateUser);


module.exports = router;
