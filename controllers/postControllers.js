const PostModel = require("../models/postSchema");

exports.postPost = async (req, res, next) => {
  console.log(req.body);
  console.log("user auth", req.user);
  const { title, category, coverImage, content } = req.body;
  const { _id } = req.user;
  try {
    new PostModel({
      title,
      category,
      coverImage,
      content,
      userId: _id,
    }).save((err, postData) => {
      if (err) console.log(err);
      res.send(true);
      console.log("Post data ==> ", postData);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find()
      .select("-content")
      .populate("userId", "-password")
      .sort({ update: -1 });
    res.json(posts);
  } catch (e) {
    console.log(e);
  }
};
