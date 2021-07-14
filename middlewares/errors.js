module.exports = (error, req, res, next) => {
  if (error.httpStateCode) {
    return res.status(error.httpStateCode || 500).json(error);
  }
};
