const mongoose = require("mongoose");
const env = require("./config/env");
// const mongoURL = env.mongoURL;
require("dotenv").config();
const mongoURL = process.env.MONGO_URL;

// create mongoose connection
mongoose.connect(mongoURL, {
  dbName: "blogData",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// listening for mongoose connection
mongoose.connection.on("open", () => console.log("db connected"));

// listening for any error
mongoose.connection.on("error", (err) => console.log(err.message));

// listening for disconnection
mongoose.connection.on("disconnected", () =>
  console.log("db connection disconnected")
);

// ctrl c
process.on("SIGINT", () => {
  mongoose.connection.close();
  process.exit();
});
