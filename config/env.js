require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  mongoURL: process.env.MONGO_URL,
};
