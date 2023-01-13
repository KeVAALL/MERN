const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.headers["x-access-token"];

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "keval khatri", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        // console.log(decodedToken);
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(404).json({ err: "Token not found" });
  }
};

module.exports = requireAuth;
