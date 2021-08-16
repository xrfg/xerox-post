const baseURL =
  process.env.REACT_APP_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://xerox-post.herokuapp.com/api/v1";

module.exports = baseURL;
