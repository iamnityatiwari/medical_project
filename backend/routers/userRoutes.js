const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Register new user
router.post("/register", userController.registerUser);

// Login user
router.post("/login", userController.loginUser);

// Get all users
router.get("/", userController.getAllUsers);

// Get user by ID
router.get("/:userId", userController.getUserById);
// Update user
router.put("/:userId", userController.updateUser);
//delete user
router.delete("/:userId", userController.deleteUser);


module.exports = router;
