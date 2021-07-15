const express = require("express");
const Route = express.Router();

/* const { userVS } = require("../middlewares/validation-sanitization.js"); */

const { postUser, loginUser } = require("../controllers/userControllers");

// const { auth } = require("../middlewares/Auth");

Route.post("/register", postUser);
Route.post("/login", loginUser);

module.exports = Route;
