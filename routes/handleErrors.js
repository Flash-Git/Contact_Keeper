const { validationResult } = require("express-validator");

const handleErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errors.array().map(e => {
      res.status(400).send(e);
    });
  }
};

module.exports = handleErrors;
