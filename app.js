const express = require("express");
const env = require("./config/env");
const port = env.port;
const cors = require("cors");

require("./mongooseConnection");
const app = express();

// cors middleware
app.use(cors({ origin: "*", exposedHeaders: "x-auth" }));

app.use(express.json());

// app.use("/users", userRoutes);

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
