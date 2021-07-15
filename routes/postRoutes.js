const express = require("express");
const Route = express.Router();

/* const { userVS } = require("../middlewares/validation-sanitization.js"); */

const { postPost } = require("../controllers/postControllers");
const auth = require("../middlewares/authenticator");

Route.post("/post", auth, postPost);

module.exports = Route;
