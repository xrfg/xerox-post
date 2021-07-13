const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true, minlength: 4 },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.pre("save", function () {
  console.log("before storing user");
  // hash password
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});
// this methods (pre and post) are concerning mongoose .save() method in the controllers

/* UserSchema.post("save", function () {
  console.log("after storing user");
}); */

const UserModel = mongoose.model("users", UserSchema);

// console.log(User);

module.exports = UserModel;
