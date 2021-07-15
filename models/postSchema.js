const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  text: { type: String, required: true, minlength: 4 },
});

module.exports = Post = mongoose.model("posts", PostSchema);
