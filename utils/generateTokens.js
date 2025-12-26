const jwt = require("jsonwebtoken");
//! شكل ال payload:
/**
UserInfo: { id, roles }
*/

const generateTokens = (user) => {
  const accessExpiresIn = String(process.env.TOKEN_EXPIRE_TIME);
  const accessKey = process.env.JWT_SECRET;
  const accessToken = jwt.sign(
    {
      UserInfo: { id: user._id, role: user.role },
    },
    accessKey,
    { expiresIn: accessExpiresIn }
  );

  const refreshExpiresIn = String(process.env.REFRESH_TOKEN_EXPIRE_TIME);
  const refreshKey = process.env.REFRESH_THOKEN_SECRET;
  const refreshToken = jwt.sign(
    {
      UserInfo: { id: user._id },
    },
    refreshKey,
    { expiresIn: refreshExpiresIn }
  );

  return { accessToken, refreshToken };
};

module.exports = generateTokens;
