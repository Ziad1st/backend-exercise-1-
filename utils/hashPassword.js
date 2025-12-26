const bcrypt = require("bcrypt");

const hashPASS = async (password = "") => {
  return await bcrypt.hash(password, 10);
};

module.exports = hashPASS;
