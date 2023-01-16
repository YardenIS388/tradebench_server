const Validator = require("fastest-validator");
const userValidator = new Validator();

const schema = {
  fullName: { type: "string", min: 4, max: 40 },
  password: { type: "string", min: 5 },
  email: { type: "string" },
  $$strict: true,
};

const checker = userValidator.compile(schema);
module.exports = checker;
