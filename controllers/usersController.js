const User = require("../models/User");

const deleteAllUsersController = async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).json({ message: "deleted all users successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").exec();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = { deleteAllUsersController, getAllUsers };
