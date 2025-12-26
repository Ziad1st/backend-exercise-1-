const verifyRoles = (...allowedRolesParams) => {
  const allowedRoles = [...allowedRolesParams];
  return (req, res, next) => {
    /**@type {Array} */
    const userRoles = req.user.role;
    console.log(`${userRoles} && ${allowedRoles}`);
    if (!userRoles)
      return res.status(401).json({ message: "Login to continue" });

    const userRolesChecker = String(allowedRoles.join("_")).includes(
      userRoles.join("_")
    );

    if (!userRolesChecker)
      return res
        .status(403)
        .json({ message: "you don't have access to go into this route" });

    next();
  };
};

module.exports = verifyRoles;
