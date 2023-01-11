const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "keval khatri", {
    expiresIn: maxAge,
  });
};

module.exports = createToken;
