const UserModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            "secretkeyfromxerox",
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
  const { email, password, username } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    /* next(new createError.NotFound("No such user found in DB!")
    ); */
    console.log("No such user found in DB!");
    res.json({ error: "No such user found in DB!" });
  } else {
    const check = bcrypt.compareSync(password, user.password);
    if (!check) {
      /* next(new createError.NotFound("Password doesn't match!")); */
      console.log("Password doesn't match!");
      res.json({ error: "Password doesn't match!" });
    } else {
      // IM HERE NOW
      const token = jwt.sign(
        { email, username, id: userData._id },
        "secretkeyfromxerox",
        { expiresIn: 2592000000 }
      );

      res.json({ token, userId: userData._id });
      console.log("User data ==> ", userData);
      console.log("User token ==> ", token);

      /* res.json({ token, userId: user._id });
      console.log(token, "token");
      console.log(user, "user");
      // res.header("x-auth", token);
      // res.json({ success: true, data: user });
      res.send({ success: true, data: user }); */
    }
  }
};
