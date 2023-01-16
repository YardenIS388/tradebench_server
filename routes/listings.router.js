const { Router } = require("express");
const { listingsController } = require("./../controllers/listings.controller");

const listingsRouter = new Router();

listingsRouter.get("/list", listingsController.getListings);
listingsRouter.get("/:id", listingsController.getListing);
listingsRouter.post("/", listingsController.createListing);
listingsRouter.put("/:id", listingsController.updateListing);
listingsRouter.delete("/:id", listingsController.removeListing);

module.exports = { listingsRouter };
