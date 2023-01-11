const express = require("express");
const app = express();
const PORT = 4000 || process.env.PORT;
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./models/user.model.js");
const createToken = require("./utils/generateToken.js");
const handleErrors = require("./utils/handleError.js");

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/mern-stack-user");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });

    const token = createToken(user._id);
    console.log(token);

    res.cookie("jwt", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json({ user: user._id, token });
  } catch (error) {
    console.log(error.message, error.code);

    const errors = handleErrors(error);

    res.status(404).json({ errors: errors });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email, password);
    const user = await User.login(email, password);
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).json({});
  }
});

app.listen(PORT, () => {
  console.log(`Server Started. Listening on ${PORT}`);
});
