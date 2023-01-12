const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "keval khatri", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(decodedToken);

        next();
      }
    });
  } else {
    // res.status(404).json({ err: "Token not found" });
    console.log("Not Found");
  }
};

module.exports = requireAuth;
