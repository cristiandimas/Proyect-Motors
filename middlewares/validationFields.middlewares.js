const { validationResult } = require('express-validator');

exports.validationFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  console.log(errors);
  next();
};
