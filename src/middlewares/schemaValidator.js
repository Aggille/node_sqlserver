const { Validator } = require("jsonschema");

const v = new Validator();

const schemaValidator = (schema) => {
  return (req, res, next) => {
    const validationResult = v.validate(req.body, schema);

    if (!validationResult.valid) {
      const errors = validationResult.errors.map((error) =>
        error.message.replace('"', "").replace('"', "")
      );
      return res.status(400).json({ errors });
    }
    next();
  };
};

module.exports = schemaValidator;
