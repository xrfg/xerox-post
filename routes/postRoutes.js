const express = require("express");
const Route = express.Router();

/* const { userVS } = require("../middlewares/validation-sanitization.js"); */

const {
  postPost,
  getPosts,
  edit,
  findOne,
  deleteOne,
  findUserPosts,
} = require("../controllers/postControllers");
const auth = require("../middlewares/authenticator");

Route.post("/post", auth, postPost);
Route.get("/", getPosts);
Route.post("/edit/:id", auth, edit);
Route.get("/user-posts", auth, findUserPosts);
Route.get("/:id", findOne);
Route.delete("/:id", auth, deleteOne);

module.exports = Route;
