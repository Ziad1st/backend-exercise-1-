const User = require("../models/User");
const generateTokens = require("../utils/generateTokens");
const hashPASS = require("../utils/hashPassword");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "All felids are required" });

  let user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (user)
    return res.status(400).json({ message: "Not valid email or username" });

  const hashedPassword = await hashPASS(password);

  user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  const { accessToken } = generateTokens(user);

  res.status(201).json({ accessToken });
};

const loginController = async (req, res) => {
  const { email, password, username } = req.body;
  if ((!email || !password, !username))
    return res.status(400).json({ message: "all feilds are required" });

  const user = await User.findOne({
    $and: [{ email }, { username }],
  });

  if (!user)
    return res
      .status(404)
      .json({ message: "worng credentials,check your account data" });

  if (!(await bcrypt.compare(password, user.password)))
    return res
      .status(404)
      .json({ message: "worng credentials,check your account data" });

  const { accessToken, refreshToken } = generateTokens(user);
  user.refreshToken = refreshToken;
  await user.save();
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * (1 * 1000 * 60 * 60),
  });
  res.status(200).json({ accessToken });
};

const refreshTokenController = async (req, res) => {
  const jwtCookie = req.cookies?.jwt;
  if (!jwtCookie)
    return res.status(401).json({ message: "Unathorized, Login and continue" });

  const user = await User.findOne({ refreshToken: jwtCookie });
  if (!user) return res.status(403).json({ message: "Forbidden" });

  const secretRefKey = process.env.REFRESH_THOKEN_SECRET;
  jwt.verify(jwtCookie, secretRefKey, (err, payload) => {
    if (err || user._id.toString() !== payload.UserInfo.id)
      return res.status(403).json(err.message ? err.message : "Forbidden");

    const accessToken = generateTokens(user).accessToken;
    res.status(201).json({ accessToken });
  });
};

const logoutController = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204).json({ message: "No content" });
  const refreshToken = cookies?.jwt;

  const user = await User.findOne({ refreshToken });
  if (!user) return res.status(403).json({ message: "Unauthorized" });
  user.refreshToken = "";
  user.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.status(200).json({ message: "logout successfully" });
};

module.exports = {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
};
