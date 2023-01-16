const jwt = require("jsonwebtoken");
const usersRepository = require("../repositories/utils/userRepo.object");
const bcrypt = require("bcrypt");
const { isEmail } = require("./../validators/email.validator");
const { bodyValidator } = require("./../validators/body.validator");
const {
  MissingPropertyError,
  RegisterError,
  InvalidProperty,
} = require("./../errors/validation.errors");

exports.authController = {
  login: async (req, res) => {
    bodyValidator(req);
    if (!req.body.email) throw new MissingPropertyError("email");
    if (!req.body.password) throw new MissingPropertyError("password");
    const { email, password } = req.body;
    if (!isEmail(email)) throw new InvalidProperty("email");
    const existingUser = await usersRepository.retrieveByEmail(email);
    if (!existingUser) throw new RegisterError();

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) throw new RegisterError();
    const user = {
      id: existingUser._id,
      email: existingUser.email,
      fullName: existingUser.fullName,
    };
    const token = generateToken(user);
    res.status(200).json({ token });
  },

  getTokenInformation: async (req, res) => {
    bodyValidator(req);
    if (!req.body.token) throw new MissingPropertyError("token");
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ decoded });
  },
};

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user.id, fullName: user.fullName, email: user.email },
    process.env.JWT_SECRET
  );
  return token;
};
