const listingsRepository = require("../repositories/utils/listingRepo.object");
const { isValidObjectId } = require("./../validators/mongoId.validator");
const registerValidator = require("./../validators/listing.validator");
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

exports.listingsController = {
    
  getListings: async (req, res) => {
    const data = await listingsRepository.find();
    if (!data) throw new EntityNotFound("Listings");
    res.status(200).json(data);
  },

  getListing: async (req, res) => {
    if (!req.params) throw new MissingPropertyError("ID");
    if (!isValidObjectId(req.params.id)) throw new InvalidProperty("ID");

    const { id } = req.params;
    const data = await listingsRepository.retrieve(id);
    if (!data) throw new EntityNotFound("Listing");
    res.status(200).json(data);
  },

  createListing: async (req, res) => {
    bodyValidator(req);

    const isValid = registerValidator(req.body);
    if (isValid[0]?.message) {
      throw new ValidationError(isValid[0].message);
    }

    let { body: Listing } = req;
//    const existlisting = await listingsRepository.retrieveByLoction(Listing.lat,Listing.lon);
//    if (existlisting) throw new PropertyExist("Location");

    Listing = { ...Listing};
    const data = await listingsRepository.create(Listing);
    res.status(201).json({ data });
  },

  updateListing: async (req, res) => {
    bodyValidator(req);
    if (!req.params.id) throw new MissingPropertyError("ID");
    if (!req.body.password) throw new MissingPropertyError("Password");
    if (!isValidObjectId(req.params.id)) throw new InvalidProperty("ID");

    let {
      body: Listing,
      params: { id },
    } = req;
    Listing = { ...Listing};
    const data = await listingsRepository.update(id, Listing);
    if (!data) throw new ServerUnableError("update");
    res.status(201).json(data);
  },

  removeListing: async (req, res) => {
    if (!req.params) throw new BodyNotSent();
    if (!req.params.id) throw new MissingPropertyError("ID");
    if (!isValidObjectId(req.params.id)) throw new InvalidProperty("ID");

    const { id } = req.params;
    const data = await listingsRepository.delete(id);
    if (!data) throw new ServerUnableError("delete");
    res.status(200).json(data);
  },
};
