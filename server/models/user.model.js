const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 Characters"],
  },
  quote: { type: String },
});

const User = mongoose.model("UserData", UserSchema);

module.exports = User;
