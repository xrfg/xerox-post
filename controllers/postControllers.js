const PostModel = require("../models/postSchema");

exports.postPost = async (req, res, next) => {
  console.log(req.body);
  console.log("user auth", req.user);
  const { title, description, text } = req.body;
  try {
    new PostModel({
      title,
      description,
      text,
    }).save((err, postData) => {
      if (err) console.log(err);
      res.send(true);
      console.log("Post data ==> ", postData);
    });
  } catch (err) {
    console.log(err);
  }
};
