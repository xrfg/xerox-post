const UserModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/env");

exports.postUser = async (req, res, next) => {
  console.log(req.body);
  const { email, password, confirmPassword, username } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      if (password === confirmPassword) {
        const hashPass = await bcrypt.hash(password, 10);
        console.log(hashPass);
        new UserModel({
          email,
          username,
          password: hashPass,
        }).save((err, userData) => {
          if (err) console.log(err);
          const token = jwt.sign(
            { email, username, id: userData._id },
            config.jwtKey,
            { expiresIn: 2592000000 }
          );

          res.json({ token, userId: userData._id });
          console.log("User data ==> ", userData);
          console.log("User token ==> ", token);
        });
      } else {
        console.log("Please confirm the password");
        res.json({ error: "Please confirm the password" });
      }
    } else {
      console.log(email + " already registered!");
      res.json({ error: email + " already registered!" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.loginUser = async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const check = bcrypt.compareSync(password, user.password);
      if (check) {
        const token = jwt.sign(
          { email: user.email, username: user.username, id: user._id },
          config.jwtKey,
          { expiresIn: 2592000000 }
        );

        res.json({ token, userId: user._id });
      } else {
        res.json({ error: "The password is not correct" });
      }
    } else {
      res.json({ error: email + " not found, please register" });
    }
  } catch (err) {
    console.log(error);
  }
};
