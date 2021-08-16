const express = require("express");
const env = require("./config/env");
const port = env.port || 5000;
const cors = require("cors");
const core = require("./middlewares/security");
const errorsHandler = require("./middlewares/errors");
const path = require("path");
require("dotenv").config();

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
require("./mongooseConnection");
const app = express();
app.use(core);

// cors middleware
app.use(cors({ origin: "*", exposedHeaders: "x-auth" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
// http://localhost:5000/api/v1/login

// app.use("/posts", auth, postRoutes);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(errorsHandler);

app.listen(port, () =>
  console.log(`express server is running on port: ${port}`)
);
