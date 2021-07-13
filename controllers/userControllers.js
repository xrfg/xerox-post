const UserModel = require("../models/userSchema");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postUser = async (req, res, next) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.send({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).select("-__v -password"); // select is a mongoose method that selects which properties you want, adding minus will hide it, without minus it selects it
    if (user) {
      return res.json({ success: true, data: user });
    } else {
      next(new createError.BadRequest("no such user found in our collection"));
    }
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    next(new createError.NotFound("no such user found in DB"));
  } else {
    const check = bcrypt.compareSync(req.body.password, user.password);
    if (!check) {
      next(new createError.NotFound("password doesnt match"));
    } else {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        "secretkeyfromxerox"
      );
      res.header("x-auth", token);
      res.send({ success: true, data: user });
    }
  }
};
