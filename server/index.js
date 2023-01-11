const express = require("express");
const app = express();
const PORT = 4000 || process.env.PORT;
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model.js");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mern-stack-user");

const handleErrors = (error) => {
  let errors = { email: "", password: "" };

  if (error.code === 11000) {
    errors.email = "Duplicate Email. Already in use";
    return errors;
  }

  if (error.message.includes("UserData validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "kcjbrQgPbsh2n4sqvH2tw5dMCG8y016/oZIzbcFrNDM=", {
    expiresIn: maxAge,
  });
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.json({ user: user._id });
  } catch (error) {
    console.log(error.message, error.code);

    const errors = handleErrors(error);

    res.status(404).json({ errors });

    // res.send({ error: error.errors, status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    return res.send({ status: "ok", user: "true" });
  } else {
    return res.send({ status: "not ok" });
  }

  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Server Started. Listening on ${PORT}`);
});
