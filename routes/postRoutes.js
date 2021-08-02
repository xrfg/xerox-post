const express = require("express");
const Route = express.Router();

/* const { userVS } = require("../middlewares/validation-sanitization.js"); */

const { postPost, getPosts } = require("../controllers/postControllers");
const auth = require("../middlewares/authenticator");

Route.post("/post", auth, postPost);
Route.get("/", getPosts);

module.exports = Route;
