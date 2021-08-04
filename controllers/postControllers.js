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

exports.edit = async (req, res, next) => {
  const { content, category, coverImage, title } = req.body;
  const { id } = req.params;
  const post = await PostModel.findById(id);
  if (req.user._id.toString() === post.userId.toString() || req.user.isAdmin) {
    if (content) post.content = content;
    if (category) post.category = category;
    if (coverImage) post.coverImage = coverImage;
    if (title) post.title = title;
    post.update = new Date();
    await post.save();
  }
  res.json(true);
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id).populate("userId", "-password");
    if (post.views) {
      post.views = post.views + 1;
    } else {
      post.views = 1;
    }
    await post.save();
    res.json(post);
  } catch (e) {
    console.log(e);
  }
};

exports.deleteOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    /* if (
      req.user._id.toString() === post.userId.toString() ||
      req.user.isAdmin
    ) { */
    const posts = await PostModel.findOneAndRemove({ _id: id });
    res.json(true);
  } catch (e) {
    console.log(e);
  }
};

exports.findUserPosts = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const posts = await PostModel.find({ userId: _id }).select("-content");
    res.json(posts);
  } catch (e) {
    console.log(e);
  }
};
