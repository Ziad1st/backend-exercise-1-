const errorHandler = (err, req, res, next) => {
  if (err) return err;
  next();
};

module.exports = errorHandler;
