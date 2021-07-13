const express = require("express");
const env = require("./config/env");
const port = env.port;
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
require("./mongooseConnection");
const app = express();

// cors middleware
app.use(cors({ origin: "*", exposedHeaders: "x-auth" }));

app.use(express.json());

app.use("/api/v1/users", userRoutes);
// http://localhost:5000/api/v1/login

// app.use("/posts", auth, postRoutes);

app.use((req, res, next) => {
  let err = createError(404, "pagenotfound");
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ success: false, message: err.message });
});

app.listen(port, () =>
  console.log(`express server is running on port: ${port}`)
);
