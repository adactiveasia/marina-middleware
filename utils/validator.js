// created by Yulianto
const { validationResult } = require("express-validator");
const _ = require("underscore");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const groupError = _.chain(errors.errors).groupBy("param");

  return res.status(422).json({
    errors: groupError,
  });
};

module.exports = validate;
