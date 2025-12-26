const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  deleteAllPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const verifyRoles = require("../middlewares/verifyRoles");

router.post("/createOne", verifyRoles("User", "Admin"), createPost);
router.get("/getAll", getAllPosts);
router.delete("/deleteAll", verifyRoles("Admin"), deleteAllPosts);
router.put("/update/:id", verifyRoles("Admin", "User"), updatePost);
router.delete("/delete/:id", verifyRoles("Admin", "User"), deletePost);

module.exports = router;
