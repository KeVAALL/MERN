const express = require("express");
const app = express();
const PORT = 4000 || process.env.PORT;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  console.log(`Name: ${name} 
    Email: ${email}
    Password: ${password}`);
});

app.listen(PORT, () => {
  console.log(`Server Started. Listening on ${PORT}`);
});
