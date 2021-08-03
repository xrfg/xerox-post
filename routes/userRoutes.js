const express = require("express");
const Route = express.Router();

/* const { userVS } = require("../middlewares/validation-sanitization.js"); */

const {
  postUser,
  loginUser,
  getUser,
  getAllUsers,
  editUser,
} = require("../controllers/userControllers");
const auth = require("../middlewares/authenticator");

Route.post("/register", postUser);
Route.post("/login", loginUser);
Route.get("/all-users", auth, getAllUsers);

Route.get("/:id", getUser);
Route.post("/edit", auth, editUser);

module.exports = Route;
