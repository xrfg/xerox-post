const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true, minlength: 4 },
  isAdmin: { type: Boolean, default: false },
  date: {
    type: String,
    default: new Date(),
  },
  avatar: {
    type: String,
    default:
      "https://i.pinimg.com/originals/df/f4/b2/dff4b2754148fe29ab42b5ee36d3c68d.png",
  },
});

module.exports = User = mongoose.model("user", UserSchema);
