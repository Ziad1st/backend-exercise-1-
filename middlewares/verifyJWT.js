const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  /**@type {string} */
  console.log("verifyJWT");
  const authorizationHaeder = req.headers.authorization;
  if (!authorizationHaeder?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Login to continue" });
  }

  const token = authorizationHaeder.split(" ")[1];
  const secretKey = process.env.JWT_SECRET;
  jwt.verify(token, secretKey, (error, payload) => {
    if (error) return res.status(403).json({ message: error.message });
    req.user = payload.UserInfo;
    next();
  });
};

module.exports = verifyJWT;
