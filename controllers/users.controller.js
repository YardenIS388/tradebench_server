const usersRepository = require("../repositories/utils/userRepo.object");
const { isValidObjectId } = require("./../validators/mongoId.validator");
const registerValidator = require("./../validators/user.validator");
const bcrypt = require("bcrypt");
const { bodyValidator } = require("./../validators/body.validator");
const { PropertyExist, BodyNotSent } = require("../errors/BadRequest.errors");
const {
  MissingPropertyError,
  InvalidProperty,
  ValidationError,
} = require("../errors/validation.errors");
const {
  EntityNotFound,
  PropertyNotFound,
} = require("../errors/NotFound.errors");
const { ServerUnableError } = require("../errors/internal.errors");

exports.usersController = {
  getUsers: async (req, res) => {
    const data = await usersRepository.find();
    if (!data) throw new EntityNotFound("Users");
    res.status(200).json(data);
  },

  getUser: async (req, res) => {
    if (!req.params) throw new MissingPropertyError("ID");
    if (!isValidObjectId(req.params.id)) throw new InvalidProperty("ID");

    const { id } = req.params;
    const data = await usersRepository.retrieve(id);
    if (!data) throw new EntityNotFound("User");
    res.status(200).json(data);
  },

  createUser: async (req, res) => {
    console.log("creatwUser-server")
    bodyValidator(req);
    const isValid = registerValidator(req.body);
    if (isValid[0]?.message) {
      throw new ValidationError(isValid[0].message);
    }

    let { body: User } = req;
    const existuser = await usersRepository.retrieveByEmail(User.email);
    if (existuser) throw new PropertyExist("Email");

    const hashedPassword = await privateHashPassword(User.password);
    User = { ...User, password: hashedPassword };
    console.log(User)
    const data = await usersRepository.create(User);
    res.status(201).json({ data });
  },

  updateUser: async (req, res) => {
    bodyValidator(req);
    if (!req.params.id) throw new MissingPropertyError("ID");
    if (!req.body.password) throw new MissingPropertyError("Password");
    if (!isValidObjectId(req.params.id)) throw new InvalidProperty("ID");

    let {
      body: User,
      params: { id },
    } = req;
    User = { ...User, password: await privateHashPassword(User.password) };
    const data = await usersRepository.update(id, User);
    if (!data) throw new ServerUnableError("update");
    res.status(201).json(data);
  },

  removeUser: async (req, res) => {
    if (!req.params) throw new BodyNotSent();
    if (!req.params.id) throw new MissingPropertyError("ID");
    if (!isValidObjectId(req.params.id)) throw new InvalidProperty("ID");

    const { id } = req.params;
    const data = await usersRepository.delete(id);
    if (!data) throw new ServerUnableError("delete");
    res.status(200).json(data);
  },
};

const privateHashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};
