const express = require("express");
const Route = express.Router();

/* const { userVS } = require("../middlewares/validation-sanitization.js"); */

const {
  postUser,
  getSingleUser,
  loginUser,
} = require("../controllers/userControllers");

// const { auth } = require("../middlewares/Auth");

Route.route("/register").post(postUser);
Route.post("/login", loginUser);

module.exports = Route;
