// =================================Validator package=======================

const Validator = require("validator");
const isEmpty = require("is-empty");

const ErrorHandler = require("../../utils/errorHandler");

//todo: Other Validator .....
exports.registerValidator = function (req, res, next) {
  let { name, email, password } = req.body;

  name = !isEmpty(name) ? name : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

  if (Validator.isEmpty(name)) {
    next(new ErrorHandler("Name is required", 406));
  } else if (Validator.isEmpty(email) || !Validator.isEmail(email)) {
    next(new ErrorHandler("Email is required", 406));
  } else if (Validator.isEmpty(password)) {
    next(new ErrorHandler("Password is required", 406));
  } else {
    next();
  }
};

exports.loginValidator = function (req, res, next) {
  let { email, password } = req.body;

  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

  if (Validator.isEmpty(email)) {
    next(new ErrorHandler("Email field is required", 400));
  } else if (Validator.isEmpty(password)) {
    next(new ErrorHandler("Password field is required", 400));
  } else {
    next();
  }
};

// //! NOTE: Validator is not very specific, if you provide any other field, it will just ignore those extra fields provided
