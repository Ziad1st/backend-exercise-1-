const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
} = require("../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/refreshToken", refreshTokenController);

module.exports = router;
