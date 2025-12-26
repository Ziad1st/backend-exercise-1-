const express = require("express");
const router = express.Router();
const verifyRoles = require("../middlewares/verifyRoles");
const {
  deleteAllUsersController,
  getAllUsers,
} = require("../controllers/usersController");

router.delete(
  "/deleteAllUsers",
  verifyRoles("Admin"),
  deleteAllUsersController
);

router.get("/getAllUsers", verifyRoles("Admin"), getAllUsers);

module.exports = router;
