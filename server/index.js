const express = require("express");
const app = express();
const PORT = 4000 || process.env.PORT;
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user.model.js");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mern-stack-user");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });

    res.send(user);
  } catch (error) {
    console.log(error);
  }

  console.log(req.body);
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
