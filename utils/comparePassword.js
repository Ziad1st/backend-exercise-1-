const bcrypt = require("bcrypt");

const comparePASS = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = comparePASS;
