const bcrpyt = require("bcrypt");

function hashPassword(userPassword) {
  const saltRounds = 10;
  const salt = bcrpyt.genSaltSync(saltRounds);
  const hash = bcrpyt.hashSync(userPassword, salt);
  return hash;
}

function comparePassword(userPassword, hashedPassword) {
  return bcrpyt.compareSync(userPassword, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
