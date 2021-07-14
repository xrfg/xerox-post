const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true, minlength: 4 },
  isAdmin: { type: Boolean, default: false },
  avatar: {
    type: String,
    default:
      "https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg",
  },
});

module.exports = User = mongoose.model("users", UserSchema);
