const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (e, req, res, next) => {
  e.message = e.message || "Internal server error";
  e.statusCode = e.statusCode || 500;

  if (e.name === "CastError") {
    const message = `Invalid ${e.path}`;
    e.message = message;
  }

  if (e.code === 1100) {
    const message = `Duplicate ${Object.keys(e.keyValue)}  value entered`;
    e.message = message;
  }

  res.status(e.statusCode).json({
    success: false,
    err: e.message,
  });
};
