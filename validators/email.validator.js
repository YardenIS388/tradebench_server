const { emailRegex } = require("./../validators/constants");

exports.isEmail = (email) => {
  var emailFormat = emailRegex;
  if (email !== "" && email.match(emailFormat)) {
    return true;
  }

  return false;
};
