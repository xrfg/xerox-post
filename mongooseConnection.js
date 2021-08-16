const mongoose = require("mongoose");
const env = require("./config/env");
const mongoURL = env.mongoURL;

// create mongoose connection
mongoose
  .connect(mongoURL, {
    dbName: "blogData",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

/* // listening for mongoose connection
mongoose.connection.on("open", () => console.log("db connected"));

// listening for any error
mongoose.connection.on("error", (err) => console.log(err.message));

// listening for disconnection
mongoose.connection.on("disconnected", () =>
  console.log("db connection disconnected")
); */

// ctrl c
process.on("SIGINT", () => {
  mongoose.connection.close();
  process.exit();
});
